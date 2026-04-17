"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Fleet", href: "#our-cars" },
  { label: "Gallery", href: "/all-cars" },
  { label: "Hotels", href: "#hotel-nitya" },
  { label: "Why us", href: "#why-choose-us" },
  { label: "Foreign trip", href: "/foren-trip" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "8435067145";
const PHONE_ALT = "8269058399";
const WHATSAPP = "8435067145";
const WHATSAPP_ALT = "8269058399";

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b border-stone-200/80 bg-white/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          className="rounded-md border border-stone-200 p-2 text-stone-800 transition-colors hover:bg-stone-50"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars className="text-xl" />
        </button>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image src="/logo/logo.png" alt="Nitya Tour & Travels" width={40} height={40} />
          <span className="select-none text-sm font-semibold tracking-tight text-stone-900">
            Nitya Tour
          </span>
        </div>
        <span className="w-10" aria-hidden />
      </div>

      <div
        className={`fixed inset-0 z-40 bg-stone-900/40 transition-opacity duration-200 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <nav
        className={`fixed left-0 top-0 z-50 flex h-full w-[min(20rem,88vw)] flex-col border-r border-stone-200 bg-[var(--surface)] shadow-lg transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
          <span className="text-sm font-semibold text-stone-900">Menu</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            <FaTimes className="text-xl text-stone-700" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-1 p-3">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="block rounded-md px-4 py-3 text-[15px] font-medium text-stone-800 transition-colors hover:bg-stone-100"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  if (link.label === "Contact") {
                    setTimeout(() => setShowContact(true), 200);
                  } else if (link.href.startsWith("#")) {
                    if (pathname !== "/") {
                      router.push(`/${link.href}`);
                    } else {
                      const id = link.href.replace("#", "");
                      const el = document.getElementById(id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.hash = link.href;
                      }
                    }
                  } else if (link.href.startsWith("/")) {
                    router.push(link.href);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-14 md:hidden" />

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4">
          <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <Image src="/logo/logo.png" alt="Nitya Tour & Travels" width={56} height={56} />
              <h3 className="text-lg font-semibold text-stone-900">Contact</h3>
              <button
                type="button"
                className="w-full rounded-md bg-stone-900 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
                onClick={() => window.open(`tel:${PHONE}`, "_self")}
              >
                Call {PHONE}
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-stone-300 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
                onClick={() => window.open(`tel:${PHONE_ALT}`, "_self")}
              >
                Call {PHONE_ALT}
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-stone-300 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
                onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")}
              >
                WhatsApp {WHATSAPP}
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-stone-300 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_ALT}`, "_blank")}
              >
                WhatsApp {WHATSAPP_ALT}
              </button>
              <button
                type="button"
                className="text-sm text-stone-500 underline-offset-4 hover:text-stone-800 hover:underline"
                onClick={() => setShowContact(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
