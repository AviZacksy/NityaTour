import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, signAdminSession, verifyAdminCredentials } from "@/lib/server/adminAuth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_EMAIL?.trim() || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Server misconfigured: set ADMIN_EMAIL and ADMIN_PASSWORD" },
      { status: 500 }
    );
  }
  try {
    if (!process.env.ADMIN_SESSION_SECRET && !process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Server misconfigured: set ADMIN_SESSION_SECRET (or ADMIN_TOKEN) for signing" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const b = body as { email?: string; password?: string };
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const password = typeof b.password === "string" ? b.password : "";

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = signAdminSession(process.env.ADMIN_EMAIL.trim());
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
