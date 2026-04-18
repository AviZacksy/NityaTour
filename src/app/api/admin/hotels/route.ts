import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { readHotels, writeHotels } from "@/lib/server/hotelStore";

export async function GET() {
  const data = await readHotels();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  try {
    const updated = await writeHotels(body);
    return NextResponse.json(updated);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
