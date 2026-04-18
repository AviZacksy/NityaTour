"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Phase = "checking" | "guest" | "authed";

export default function AdminAuthGate({ children }: Props) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const refreshSession = useCallback(async () => {
    setPhase("checking");
    try {
      const res = await fetch("/api/admin/session", { credentials: "include" });
      const data = (await res.json()) as { ok?: boolean };
      setPhase(data.ok ? "authed" : "guest");
    } catch {
      setPhase("guest");
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.removeItem("admin_token");
    } catch {
      /* ignore */
    }
    refreshSession();
  }, [refreshSession]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoginError(typeof data.error === "string" ? data.error : "Login failed");
        return;
      }
      setPassword("");
      await refreshSession();
    } catch {
      setLoginError("Network error");
    }
  }

  if (phase === "checking") {
    return (
      <div className="mx-auto max-w-xl py-12 text-center text-sm text-stone-500">Checking session…</div>
    );
  }

  if (phase === "guest") {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Admin login</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Apna <strong>email</strong> aur <strong>password</strong> daaliye — yeh server par{" "}
          <code className="rounded bg-stone-100 px-1">ADMIN_EMAIL</code> aur{" "}
          <code className="rounded bg-stone-100 px-1">ADMIN_PASSWORD</code> se match hona chahiye.
        </p>
        <form onSubmit={onLogin} className="mt-6 space-y-4 rounded-xl border border-stone-200 bg-white p-4">
          {loginError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {loginError}
            </div>
          )}
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-teal-600/40 focus:ring-2 focus:ring-teal-700/15"
              required
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-teal-600/40 focus:ring-2 focus:ring-teal-700/15"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-900"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
