"use client";
import Image from "next/image";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  phone?: string;
  whatsapp?: string;
}

export default function ContactModal({
  open,
  onClose,
  phone = "8269058399",
  whatsapp = "8269058399",
}: ContactModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/40 p-4">
      <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <Image src="/logo/logo.png" alt="Nitya Tour & Travels" width={56} height={56} />
          <h3 className="text-lg font-semibold text-stone-900">Contact</h3>
          <button
            type="button"
            className="w-full rounded-md bg-stone-900 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            onClick={() => window.open(`tel:${phone}`, "_self")}
          >
            Call {phone}
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-stone-300 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
            onClick={() => window.open(`https://wa.me/${whatsapp}`, "_blank")}
          >
            WhatsApp {whatsapp}
          </button>
          <button
            type="button"
            className="text-sm text-stone-500 underline-offset-4 hover:text-stone-800 hover:underline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
