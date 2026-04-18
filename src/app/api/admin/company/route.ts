import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/adminAuth";
import { readCompany, writeCompany } from "@/lib/server/companyStore";

export async function GET() {
  const company = await readCompany();
  return NextResponse.json(company);
}

export async function PUT(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  try {
    const updated = await writeCompany(body);
    return NextResponse.json(updated);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

