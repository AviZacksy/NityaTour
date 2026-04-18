import { NextResponse } from "next/server";
import { verifyAdminSessionFromRequest } from "@/lib/server/adminAuth";

export async function GET(request: Request) {
  const ok = verifyAdminSessionFromRequest(request);
  return NextResponse.json({ ok });
}
