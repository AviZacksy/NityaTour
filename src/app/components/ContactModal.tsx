"use client";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  phone?: string;
  whatsapp?: string;
}

export default function ContactModal({ open, onClose, phone = "8269058399", whatsapp = "8269058399" }: ContactModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 min-w-[260px]">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Contact Us</h3>
        <button
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition-all text-base"
          onClick={() => window.open(`tel:${phone}`, '_self')}
        >
          📞 Call: {phone}
        </button>
        <button
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition-all text-base"
          onClick={() => window.open(`https://wa.me/${whatsapp}`, '_blank')}
        >
          💬 WhatsApp: {whatsapp}
        </button>
        <button
          className="mt-2 text-gray-500 hover:text-indigo-700 text-sm underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}