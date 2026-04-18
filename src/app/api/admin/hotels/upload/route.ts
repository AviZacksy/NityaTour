import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAdmin } from "@/lib/server/adminAuth";

const HOTEL_DIR = path.join(process.cwd(), "public", "Hotel");
const HOTEL_DATA = path.join(HOTEL_DIR, "data.json");
const MAX_BYTES = 15 * 1024 * 1024;
const MAX_FILES = 25;

function sanitizeBaseName(raw: string): string {
  const base = path.basename(String(raw).replace(/\\/g, "/"));
  if (!base || base === "." || base === "..") return "photo.jpg";
  const cleaned = base.replace(/[\x00-\x1f]/g, "").trim();
  return cleaned.slice(0, 200) || "photo.jpg";
}

async function uniqueFileName(dir: string, base: string): Promise<string> {
  let name = sanitizeBaseName(base);
  const ext = path.extname(name);
  const stem = ext ? name.slice(0, -ext.length) : name;
  let n = 0;
  while (true) {
    const full = path.join(dir, name);
    try {
      await fs.access(full);
      n += 1;
      name = ext ? `${stem}_${n}${ext}` : `${stem}_${n}`;
    } catch {
      return name;
    }
  }
}

export async function POST(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await fs.access(HOTEL_DATA);
  } catch {
    return NextResponse.json({ error: "Hotel folder not ready" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const entries = formData.getAll("files");
  const files: File[] = [];
  for (const e of entries) {
    if (e instanceof File && e.size > 0) files.push(e);
  }
  if (files.length === 0) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Max ${MAX_FILES} files per upload` }, { status: 400 });
  }

  const saved: string[] = [];
  for (const file of files) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES / 1024 / 1024}MB): ${file.name}` },
        { status: 400 }
      );
    }
    const unique = await uniqueFileName(HOTEL_DIR, file.name);
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(HOTEL_DIR, unique), buf);
    saved.push(unique);
  }

  return NextResponse.json({ ok: true, filenames: saved });
}
