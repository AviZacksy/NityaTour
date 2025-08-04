"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCarSide } from "react-icons/fa";
import { useState } from "react";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Cars", href: "#our-cars" },
  { label: "All Cars Gallery", href: "/all-cars" },
  { label: "Our Hotel Facilities", href: "#hotel-nitya" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Foren Trip", href: "/foren-trip", cta: true },
  { label: "Contact", href: "#contact", contact: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showContact, setShowContact] = useState(false);

  // Custom handler for anchor links
  const handleNavClick = (e, href, contact) => {
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
        const id = href.replace('#', '');
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
        <div className="backdrop-blur-xl bg-white/70 border-b border-indigo-100 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-2 h-14">
            <div className="flex items-center gap-3 select-none pr-4">
              <FaCarSide className="text-xl text-indigo-600 drop-shadow" />
              <span className="text-lg font-extrabold text-indigo-700 tracking-wide">Nitya Tour & Travels</span>
            </div>
            <div className="h-8 w-px bg-indigo-200 mx-2 hidden lg:block" />
            <ul className="flex gap-2 lg:gap-3 xl:gap-4 items-center">
              {navLinks.map(link => (
                <li key={link.label} className="relative flex items-center">
                  <Link
                    href={link.href}
                    className={
                      link.cta
                        ? `py-1.5 px-4 rounded-full font-bold bg-gradient-to-r from-yellow-400 to-indigo-500 text-white shadow-lg hover:from-indigo-500 hover:to-yellow-400 transition-all duration-200 border-2 border-transparent hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm tracking-wide hover:scale-105 active:scale-100 ${pathname === link.href ? "scale-105" : ""}`
                        : `py-1.5 px-2 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 tracking-wide ${
                            pathname === link.href || (link.href === "/" && pathname === "/")
                              ? "bg-indigo-100 text-indigo-700 font-bold shadow"
                              : "text-gray-700 hover:text-indigo-800"
                          } group`
                    }
                    scroll={false}
                    onClick={link.contact ? (e) => handleNavClick(e, link.href, true) : link.href.startsWith('#') ? (e) => handleNavClick(e, link.href, false) : undefined}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {!link.cta && (
                      <span className="absolute left-1/2 -bottom-1 w-0 group-hover:w-3/4 group-focus:w-3/4 h-1 rounded-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-all duration-300 -translate-x-1/2" />
                    )}
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