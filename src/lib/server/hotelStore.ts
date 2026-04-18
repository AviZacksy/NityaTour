import { promises as fs } from "fs";
import path from "path";
import type { HotelEntry, HotelsFile } from "@/lib/companyTypes";

const HOTEL_FILE = path.join(process.cwd(), "public", "Hotel", "data.json");

function sanitizeHotels(input: unknown): HotelsFile {
  if (!input || typeof input !== "object") throw new Error("Invalid payload");
  const h = (input as { hotels?: unknown }).hotels;
  if (!Array.isArray(h)) throw new Error("hotels array required");

  const hotels: HotelEntry[] = h
    .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
    .map((row) => ({
      name: typeof row.name === "string" ? row.name : "",
      image: typeof row.image === "string" ? row.image : "",
    }))
    .filter((row) => row.image.trim().length > 0)
    .slice(0, 50);

  return { hotels };
}

export async function readHotels(): Promise<HotelsFile> {
  const raw = await fs.readFile(HOTEL_FILE, "utf8");
  return JSON.parse(raw) as HotelsFile;
}

export async function writeHotels(input: unknown): Promise<HotelsFile> {
  const next = sanitizeHotels(input);
  const json = JSON.stringify(next, null, 2) + "\n";
  await fs.writeFile(HOTEL_FILE, json, "utf8");
  return next;
}
