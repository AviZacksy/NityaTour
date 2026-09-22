"use client";
import React, { useState, useMemo } from "react";
import { FaBars, FaTimes, FaChevronRight, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePublicCompany } from "@/lib/usePublicCompany";
import ContactModal from "./ContactModal";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Tours & Packages", href: "#tour-packages" },
  { label: "Hotels", href: "#hotel-nitya" },
  { label: "Car Rental", href: "#our-cars" },
  { label: "Spiritual Tours", href: "#spiritual-tours" },
  { label: "Corporate", href: "#corporate" },
  { label: "Contact Us", href: "#contact" },
];

const PHONE = "8435067145";
const PHONE_ALT = "7692972297";
const WHATSAPP = "8435067145";
const WHATSAPP_ALT = "7692972297";
const PHONE_THIRD = "8269058399";
const WHATSAPP_THIRD = "8269058399";

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const company = usePublicCompany();
  const brand = useMemo(
    () => company?.site?.navbar_brand?.trim() || company?.company_name || "Nitya Tour & Travels",
    [company]
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-4 md:hidden">
        <button
          type="button"
          className="p-3 text-[#ef4056] relative z-50 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
        </button>
        <div className="flex flex-1 items-center justify-center">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image src="/logo/logo2.png" alt={brand} width={120} height={46} className="object-contain max-h-[46px] w-auto" priority />
          </Link>
        </div>
        
        {/* Right Side: CTA */}
        <button 
          onClick={() => setShowContact(true)}
          className="bg-[#d32f2f] text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-md shrink-0"
        >
          Book Now
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`fixed left-0 top-20 z-40 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden md:hidden ${
          open ? "max-h-[80vh] opacity-100 border-b border-gray-200" : "max-h-0 opacity-0"
        }`}
      >
        <nav>
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center justify-between px-6 py-4 text-[14px] font-medium text-gray-500 hover:text-black border-b border-gray-100 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    if (link.label === "Contact Us") {
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
                  <FaChevronRight className="text-[10px] text-gray-400" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="h-20 md:hidden" />

      {/* Backdrop for open menu */}
      {open && (
        <div 
          className="fixed inset-0 top-20 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {showContact && <ContactModal open={showContact} onClose={() => setShowContact(false)} phone={PHONE} whatsapp={WHATSAPP} phoneAlt={PHONE_ALT} whatsappAlt={WHATSAPP_ALT} phoneThird={PHONE_THIRD} whatsappThird={WHATSAPP_THIRD} />}

      {/* Floating Action Buttons (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 md:hidden">
        <a 
          href={`tel:${PHONE}`}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1f73b7] text-white shadow-lg shadow-[#1f73b7]/40 transition-transform active:scale-95"
          aria-label="Call us"
        >
          <FaPhoneAlt className="text-xl" />
        </a>
        <a 
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform active:scale-95"
          aria-label="WhatsApp us"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
    </>
  );
};

export default MobileMenu;

