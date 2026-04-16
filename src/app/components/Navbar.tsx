"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "#our-cars" },
  { label: "Gallery", href: "/all-cars" },
  { label: "Hotels", href: "#hotel-nitya" },
  { label: "Why us", href: "#why-choose-us" },
  { label: "Foreign trip", href: "/foren-trip", cta: true },
  { label: "Contact", href: "#contact", contact: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showContact, setShowContact] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    contact?: boolean
  ) => {
    if (contact) {
      e.preventDefault();
      setShowContact(true);
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = href;
        }
      }
    }
  };

  return (
    <>
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50">
        <div className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 lg:px-6">
            <Link
              href="/"
              className="flex select-none items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image src="/logo/logo.png" alt="Nitya Tour & Travels" width={44} height={44} />
              <span className="text-[15px] font-semibold tracking-tight text-stone-900">
                Nitya Tour & Travels
              </span>
            </Link>
            <ul className="flex flex-wrap items-center justify-end gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    scroll={false}
                    className={
                      link.cta
                        ? `ml-1 rounded-md bg-stone-900 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-stone-800 lg:text-[13px] ${
                            pathname === link.href ? "ring-2 ring-stone-400/40" : ""
                          }`
                        : `rounded-md px-2.5 py-2 text-[13px] font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 lg:px-3 ${
                            pathname === link.href ||
                            (link.href === "/" && pathname === "/")
                              ? "bg-stone-100 text-stone-900"
                              : ""
                          }`
                    }
                    onClick={
                      link.contact
                        ? (e) => handleNavClick(e, link.href, true)
                        : link.href.startsWith("#")
                          ? (e) => handleNavClick(e, link.href, false)
                          : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
