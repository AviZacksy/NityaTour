"use client";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  phone?: string;
  whatsapp?: string;
  phoneAlt?: string;
  whatsappAlt?: string;
  phoneThird?: string;
  whatsappThird?: string;
}

export default function ContactModal({
  open,
  onClose,
  phone = "8435067145",
  whatsapp = "8435067145",
  phoneAlt = "7692972297",
  whatsappAlt = "7692972297",
  phoneThird = "8269058399",
  whatsappThird = "8269058399",
}: ContactModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-none bg-white p-8 shadow-2xl relative border-t-4 border-[#d32f2f]">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 pb-4 border-b border-stone-100 w-full flex justify-center">
            <Image src="/logo/logo2.png" alt="Nitya Tour & Travels" width={160} height={60} className="object-contain" />
          </div>
          
          <h3 className="text-xl font-bold text-stone-900 mb-6 uppercase tracking-wider">Get in Touch</h3>
          
          <div className="w-full space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-none bg-[#1f73b7] py-3.5 px-4 text-[15px] font-bold text-white transition-all hover:bg-blue-800 hover:shadow-md"
              onClick={() => window.open(`tel:${phone}`, "_self")}
            >
              <FaPhoneAlt size={16} />
              Call {phone}
            </button>
            
            {!!phoneAlt && (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-none bg-stone-100 border border-stone-200 py-3.5 px-4 text-[15px] font-bold text-stone-800 transition-all hover:bg-stone-200"
                onClick={() => window.open(`tel:${phoneAlt}`, "_self")}
              >
                <FaPhoneAlt size={14} className="text-stone-500" />
                Call {phoneAlt}
              </button>
            )}

            {!!phoneThird && (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-none bg-stone-100 border border-stone-200 py-3.5 px-4 text-[15px] font-bold text-stone-800 transition-all hover:bg-stone-200"
                onClick={() => window.open(`tel:${phoneThird}`, "_self")}
              >
                <FaPhoneAlt size={14} className="text-stone-500" />
                Call {phoneThird}
              </button>
            )}

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-none bg-[#25D366] py-3.5 px-4 text-[15px] font-bold text-white transition-all hover:bg-[#1ebe57] hover:shadow-md mt-4"
              onClick={() => window.open(`https://wa.me/${whatsapp}`, "_blank")}
            >
              <FaWhatsapp size={18} />
              WhatsApp {whatsapp}
            </button>

            {!!whatsappAlt && (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-none bg-stone-100 border border-stone-200 py-3.5 px-4 text-[15px] font-bold text-stone-800 transition-all hover:bg-stone-200"
                onClick={() => window.open(`https://wa.me/${whatsappAlt}`, "_blank")}
              >
                <FaWhatsapp size={16} className="text-[#25D366]" />
                WhatsApp {whatsappAlt}
              </button>
            )}

            {!!whatsappThird && (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-none bg-stone-100 border border-stone-200 py-3.5 px-4 text-[15px] font-bold text-stone-800 transition-all hover:bg-stone-200"
                onClick={() => window.open(`https://wa.me/${whatsappThird}`, "_blank")}
              >
                <FaWhatsapp size={16} className="text-[#25D366]" />
                WhatsApp {whatsappThird}
              </button>
            )}
          </div>
          
          <p className="mt-8 text-xs text-stone-400 font-medium">We are available 24/7 for your support.</p>
        </div>
      </div>
    </div>
  );
}
