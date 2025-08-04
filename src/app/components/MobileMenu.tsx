"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Our Cars", href: "#our-cars" },
  { label: "All Cars Gallery", href: "/all-cars" },
  { label: "Our Hotel Facilities", href: "#hotel-nitya" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Foren Trip", href: "/foren-trip" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "8269058399";
const WHATSAPP = "8269058399";

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Top Bar with Hamburger and Title */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white/95 shadow-md px-4 h-14 md:hidden">
        <button
          className="p-2 rounded-full bg-white/90 shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars className="text-2xl text-indigo-900" />
        </button>
        <span className="flex-1 text-center text-lg font-bold text-indigo-900 tracking-wide select-none">
          Nitya Tour & Travels
        </span>
        {/* Empty space to balance the flex layout */}
        <span className="w-10" />
      </div>

      {/* Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-900">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <FaTimes className="text-2xl text-indigo-900" />
          </button>
        </div>
        <ul className="flex-1 flex flex-col gap-2 p-4">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="block py-3 px-4 rounded-lg text-lg font-semibold text-indigo-900 hover:bg-indigo-50 transition"
                onClick={e => {
                  e.preventDefault();
                  setOpen(false);
                  if (link.label === "Contact") {
                    setTimeout(() => setShowContact(true), 300);
                  } else if (link.href.startsWith("#")) {
                    if (pathname !== "/") {
                      router.push(`/${link.href}`);
                    } else {
                      const id = link.href.replace('#', '');
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
      {/* Spacer for fixed top bar */}
      <div className="h-14 md:hidden" />

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 min-w-[260px]">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Contact Us</h3>
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition-all text-base"
              onClick={() => window.open(`tel:${PHONE}`, '_self')}
            >
              📞 Call: {PHONE}
            </button>
            <button
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition-all text-base"
              onClick={() => window.open(`https://wa.me/${WHATSAPP}`, '_blank')}
            >
              💬 WhatsApp: {WHATSAPP}
            </button>
            <button
              className="mt-2 text-gray-500 hover:text-indigo-700 text-sm underline"
              onClick={() => setShowContact(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;