"use client";

import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const carFolders = [
  "Ertiga model 2024",
  "Hyundai aura model 2025",
  "Innova-7plus1",
  "innova Crysta 2019",
  "Tavera Model 2014",
  "Tempo",
];

const carImages: { [key: string]: string[] } = {
  "Ertiga model 2024": [
    "WhatsApp Image 2025-06-24 at 15.07.25_430e5d48.jpg",
    "WhatsApp Image 2025-06-24 at 15.07.27_a217b9c5.jpg",
  ],
  "Hyundai aura model 2025": [
    "WhatsApp Image 2025-06-24 at 15.09.16_2e13421c.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.13_c8e54a77.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.16_4d49f737.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_8b7a1274.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_33f7d750.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.14_4226d3d3.jpg",
  ],
  "Innova-7plus1": [
    "travel-agents.png",
    "WhatsApp Image 2025-06-24 at 14.56.14_d3113ba1.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.15_073c41f9.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.16_47da2324.jpg",
  ],
  "innova Crysta 2019": [
    "WhatsApp Image 2025-06-24 at 15.00.08_c5fa1fb6.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.07_edc740c8.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_89d13109.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.06_3b62cf8a.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.05_afea44f1.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_a4f79e70.jpg",
  ],
  "Tavera Model 2014": [
    "WhatsApp Image 2025-06-24 at 15.02.20_03174d4f.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.24_c4158462.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.21_d3cd18fe.jpg",
  ],
  "Tempo": [
    "WhatsApp Image 2025-06-24 at 14.53.29_b00b9700.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_e7228dc2.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_08cfcb37.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.31_040105aa.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_a9ad4ec3.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_ecefb8ac.jpg",
  ],
};

const whatsapp = "8435067145";

export default function AllCarsGallery() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/";
                }
              }
            }}
            className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-[var(--surface)] px-4 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
          >
            <FaArrowLeft aria-hidden />
            Back
          </button>
        </div>
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            Fleet gallery
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600 md:text-base">
            Browse full photo sets by model. WhatsApp us from any image to check availability.
          </p>
        </header>
        {carFolders.map((folder) => (
          <section key={folder} id={folder} className="mb-16 scroll-mt-24">
            <h2 className="mb-6 border-b border-stone-200 pb-3 text-lg font-semibold text-stone-900 md:text-xl">
              {folder}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {carImages[folder].map((img, idx) => (
                <div
                  key={img}
                  className="group relative overflow-hidden rounded-xl border border-stone-200 bg-[var(--surface)] shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-100">
                    <Image
                      src={`/${folder}/${img}`}
                      alt={`${folder} ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 border-t border-stone-200/60 bg-white/85 backdrop-blur-sm" />
                    <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-md border border-white/30 bg-stone-900/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                      {folder}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-teal-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-teal-900"
                  >
                    <FaWhatsapp aria-hidden />
                    Book
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
