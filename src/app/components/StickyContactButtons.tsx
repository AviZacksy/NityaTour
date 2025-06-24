"use client";

interface Company {
  company_name: string;
  location: string;
  service_area: string;
  contact: {
    phone: string;
    whatsapp: string;
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
  const whatsapp = company?.contact?.whatsapp || "8269058399";
  const phone = company?.contact?.phone || "8269058399";
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center gap-2 text-lg font-bold animate-bounce"
        style={{ boxShadow: "0 4px 24px 0 rgba(34,197,94,0.3)" }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.1 4.02a1 1 0 0 0 1.22 1.22l4.02-1.1A12 12 0 0 0 20.52 3.48Zm-8.52 17a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm4.29-7.71-2.54-1.09a1 1 0 0 0-1.13.21l-.54.54a7.07 7.07 0 0 1-3.29-3.29l.54-.54a1 1 0 0 0 .21-1.13l-1.09-2.54a1 1 0 0 0-1.13-.58A8.06 8.06 0 0 0 6 12a8 8 0 0 0 8 8 8.06 8.06 0 0 0 3.42-.71 1 1 0 0 0-.58-1.13Z"/></svg>
        WhatsApp
      </a>
      <a
        href={`tel:${phone}`}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center gap-2 text-lg font-bold animate-bounce"
        style={{ boxShadow: "0 4px 24px 0 rgba(251,191,36,0.3)" }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>
        Call
      </a>
    </div>
  );
} 