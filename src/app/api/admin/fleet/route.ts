import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { applyFleetPut, readFleetBundle } from "@/lib/server/fleetStore";

export async function GET() {
  const bundle = await readFleetBundle();
  return NextResponse.json(bundle);
}

export async function PUT(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  try {
    const bundle = await applyFleetPut(body ?? {});
    return NextResponse.json(bundle);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
