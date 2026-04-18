import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_FLEET_FOLDERS } from "@/lib/fleetConfig";
import type { FleetCarJson } from "@/lib/fleetTypes";
import { readCompany, writeCompany } from "@/lib/server/companyStore";

export function isSafeFolderName(name: string): boolean {
  if (!name || name.includes("..") || name.includes("/") || name.includes("\\")) return false;
  if (name.length > 120) return false;
  return true;
}

function carJsonPath(folder: string): string {
  return path.join(process.cwd(), "public", folder, "data.json");
}

function coerceFiniteNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function sanitizeCarJson(input: unknown): FleetCarJson {
  if (!input || typeof input !== "object") throw new Error("Invalid car payload");
  const c = input as Record<string, unknown>;
  const out: FleetCarJson = { model: "" };

  if (typeof c.model === "string") out.model = c.model;
  if (typeof c.year === "string" || typeof c.year === "number") out.year = c.year as string | number;
  if (typeof c.seating === "string") out.seating = c.seating;
  if (typeof c.fuel === "string") out.fuel = c.fuel;

  if (c.rate && typeof c.rate === "object" && !Array.isArray(c.rate)) {
    const r = c.rate as Record<string, unknown>;
    const rate: FleetCarJson["rate"] = {};
    const ac = coerceFiniteNumber(r.ac);
    const nonAc = coerceFiniteNumber(r.non_ac);
    if (ac !== undefined) rate.ac = ac;
    if (nonAc !== undefined) rate.non_ac = nonAc;
    if (Object.keys(rate).length > 0) out.rate = rate;
  }

  const perDay = coerceFiniteNumber(c.per_day_charge);
  if (perDay !== undefined) out.per_day_charge = perDay;

  if (Array.isArray(c.images)) {
    out.images = c.images
      .filter((x) => typeof x === "string" && x.length > 0 && !String(x).includes(".."))
      .slice(0, 80) as string[];
  }

  if (!out.model || typeof out.model !== "string" || !out.model.trim()) {
    throw new Error("Car model is required");
  }

  return out;
}

export async function readCarFile(folder: string): Promise<FleetCarJson> {
  if (!isSafeFolderName(folder)) throw new Error("Invalid folder");
  const raw = await fs.readFile(carJsonPath(folder), "utf8");
  return JSON.parse(raw) as FleetCarJson;
}

export async function writeCarFile(folder: string, input: unknown): Promise<FleetCarJson> {
  if (!isSafeFolderName(folder)) throw new Error("Invalid folder");
  const next = sanitizeCarJson(input);
  const json = JSON.stringify(next, null, 2) + "\n";
  await fs.writeFile(carJsonPath(folder), json, "utf8");
  return next;
}

/** Folders that exist on disk with a `data.json`. */
export async function discoverFleetFoldersOnDisk(): Promise<string[]> {
  const publicDir = path.join(process.cwd(), "public");
  const entries = await fs.readdir(publicDir, { withFileTypes: true });
  const found: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const name = e.name;
    if (!isSafeFolderName(name)) continue;
    try {
      await fs.access(carJsonPath(name));
      found.push(name);
    } catch {
      /* skip */
    }
  }
  const order = new Map([...DEFAULT_FLEET_FOLDERS.map((f, i) => [f, i] as const)]);
  found.sort((a, b) => {
    const ia = order.has(a) ? (order.get(a) as number) : 999;
    const ib = order.has(b) ? (order.get(b) as number) : 999;
    if (ia !== ib) return ia - ib;
    return a.localeCompare(b);
  });
  return found;
}

export type FleetBundle = {
  folders: string[];
  cars: { folder: string; data: FleetCarJson }[];
};

export async function readFleetBundle(): Promise<FleetBundle> {
  const company = await readCompany();
  const disk = await discoverFleetFoldersOnDisk();
  const diskSet = new Set(disk);
  const fromConfig = (company.fleet?.folders ?? []).filter((f) => diskSet.has(f));
  const defaultOrdered = [...DEFAULT_FLEET_FOLDERS].filter((f) => diskSet.has(f));
  const folders =
    fromConfig.length > 0
      ? fromConfig.filter((f, i, a) => a.indexOf(f) === i)
      : defaultOrdered;

  const cars: { folder: string; data: FleetCarJson }[] = [];
  for (const folder of folders) {
    try {
      const data = await readCarFile(folder);
      cars.push({ folder, data });
    } catch {
      /* skip broken */
    }
  }
  return { folders, cars };
}

export type FleetPutBody = {
  folders?: string[];
  cars?: Record<string, unknown>;
};

export async function applyFleetPut(body: FleetPutBody): Promise<FleetBundle> {
  const disk = new Set(await discoverFleetFoldersOnDisk());

  if (body.folders !== undefined) {
    if (!Array.isArray(body.folders)) throw new Error("folders must be an array");
    const nextFolders = body.folders.filter(
      (f): f is string => typeof f === "string" && isSafeFolderName(f) && disk.has(f)
    );
    const company = await readCompany();
    await writeCompany({
      ...company,
      fleet: { folders: nextFolders },
    });
  }

  if (body.cars !== undefined) {
    if (!body.cars || typeof body.cars !== "object") throw new Error("cars must be an object");
    for (const [folder, payload] of Object.entries(body.cars)) {
      if (!isSafeFolderName(folder) || !disk.has(folder)) {
        throw new Error(`Unknown fleet folder: ${folder}`);
      }
      await writeCarFile(folder, payload);
    }
  }

  return readFleetBundle();
}
