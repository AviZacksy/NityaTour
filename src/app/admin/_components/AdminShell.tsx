"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav: { href: string; label: string; hint: string }[] = [
  { href: "/admin", label: "Dashboard", hint: "Overview" },
  { href: "/admin/company", label: "Company & hero", hint: "Name, contact, hero" },
  { href: "/admin/content", label: "Pages & text", hint: "Fleet, hotels, why us, footer" },
  { href: "/admin/fleet", label: "Fleet (cars)", hint: "Models, rates, photos" },
  { href: "/admin/hotels", label: "Hotels", hint: "Gallery list" },
  { href: "/admin/foren-trip", label: "Foreign trip", hint: "/foren-trip page" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-0 lg:flex-row lg:gap-0">
        <aside className="sticky top-0 z-30 shrink-0 overflow-x-hidden border-b border-stone-800/60 bg-stone-950 text-stone-100 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:overflow-y-hidden">
          <div className="shrink-0 px-4 py-4 lg:px-5 lg:py-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Control panel
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-white">Nitya Tour</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-400">Website content editor</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1 px-2 pb-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:flex-nowrap lg:overflow-y-auto lg:px-3 lg:pb-6">
            {nav.map((item) => {
              const active =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:whitespace-normal ${
                    active
                      ? "bg-white/10 text-white ring-1 ring-white/15"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="block">{item.label}</span>
                  <span className="hidden text-[11px] font-normal text-stone-500 lg:block">
                    {item.hint}
                  </span>
                </Link>
              );
            })}
            <div className="mx-1 hidden h-px bg-stone-800 lg:block" />
            <Link
              href="/"
              className="mt-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-stone-400 hover:bg-white/5 hover:text-white lg:whitespace-normal"
            >
              View website
            </Link>
            <button
              type="button"
              className="mt-1 w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium text-stone-400 hover:bg-white/5 hover:text-white lg:whitespace-normal"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
                window.location.href = "/admin";
              }}
            >
              Log out
            </button>
          </nav>
        </aside>
        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
