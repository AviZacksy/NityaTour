import { createHmac, timingSafeEqual } from "crypto";

/** HttpOnly cookie — session is signed; server never trusts client-stored passwords. */
export const ADMIN_SESSION_COOKIE = "nitya_admin_session";

function getSessionSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_TOKEN;
  if (!s) throw new Error("Set ADMIN_SESSION_SECRET (or legacy ADMIN_TOKEN) for signing sessions");
  return s;
}

function getCookieFromRequest(request: Request, name: string): string | undefined {
  const raw = request.headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return undefined;
}

export function signAdminSession(email: string): string {
  const secret = getSessionSecret();
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ email, exp }), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionFromRequest(request: Request): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? "";
  if (!adminEmail) return false;
  let secret: string;
  try {
    secret = getSessionSecret();
  } catch {
    return false;
  }
  const raw = getCookieFromRequest(request, ADMIN_SESSION_COOKIE);
  if (!raw) return false;
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    if (expected.length !== sig.length) return false;
    if (!timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(sig, "utf8"))) return false;
  } catch {
    return false;
  }
  let data: { email?: string; exp?: number };
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; exp?: number };
  } catch {
    return false;
  }
  if (data.email !== adminEmail) return false;
  if (typeof data.exp !== "number" || Date.now() > data.exp) return false;
  return true;
}

export function requireAdmin(request: Request): boolean {
  return verifyAdminSessionFromRequest(request);
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminEmail || !adminPassword) return false;
  const e = email.trim();
  try {
    if (e.length !== adminEmail.length || password.length !== adminPassword.length) return false;
    const okEmail = timingSafeEqual(Buffer.from(e, "utf8"), Buffer.from(adminEmail, "utf8"));
    const okPass = timingSafeEqual(Buffer.from(password, "utf8"), Buffer.from(adminPassword, "utf8"));
    return okEmail && okPass;
  } catch {
    return false;
  }
}
