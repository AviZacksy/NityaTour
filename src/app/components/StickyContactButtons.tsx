"use client";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

interface Company {
  company_name: string;
  location: string;
  service_area: string;
  contact: {
    phone: string;
    whatsapp: string;
    phone_alt?: string;
    whatsapp_alt?: string;
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
}

interface StickyContactButtonsProps {
  company?: Company;
}

export default function StickyContactButtons({ company }: StickyContactButtonsProps) {
  const whatsapp = company?.contact?.whatsapp || "8435067145";
  const phone = company?.contact?.phone || "8435067145";
  
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]"
      >
        <FaWhatsapp size={20} />
        WhatsApp
      </a>
      <a
        href={`tel:${phone}`}
        className="pointer-events-auto flex items-center justify-center gap-2.5 rounded-full border border-stone-700 bg-[#1c1c1c] px-5 py-3 text-sm font-bold tracking-wide text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-black hover:border-stone-500"
      >
        <FaPhone size={16} />
        Call Us
      </a>
    </div>
  );
}
