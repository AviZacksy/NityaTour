"use client";

import { FaArrowLeft, FaWhatsapp, FaCarSide } from "react-icons/fa";
import Image from 'next/image';

const carFolders = [
  "Ertiga model 2024",
  "Hyundai aura model 2025",
  "Innova-7plus1",
  "innova Crysta 2019",
  "Tavera Model 2014",
  "Tempo"
];

const carImages: { [key: string]: string[] } = {
  "Ertiga model 2024": [
    "WhatsApp Image 2025-06-24 at 15.07.25_430e5d48.jpg",
    "WhatsApp Image 2025-06-24 at 15.07.27_a217b9c5.jpg"
  ],
  "Hyundai aura model 2025": [
    "WhatsApp Image 2025-06-24 at 15.09.16_2e13421c.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.13_c8e54a77.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.16_4d49f737.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_8b7a1274.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_33f7d750.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.14_4226d3d3.jpg"
  ],
  "Innova-7plus1": [
    "travel-agents.png",
    "WhatsApp Image 2025-06-24 at 14.56.13_548bda35.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.14_d3113ba1.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.15_073c41f9.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.16_47da2324.jpg"
  ],
  "innova Crysta 2019": [
    "WhatsApp Image 2025-06-24 at 15.00.08_c5fa1fb6.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.07_edc740c8.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_89d13109.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.06_3b62cf8a.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.05_afea44f1.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_a4f79e70.jpg"
  ],
  "Tavera Model 2014": [
    "WhatsApp Image 2025-06-24 at 15.02.20_03174d4f.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.24_c4158462.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.21_d3cd18fe.jpg"
  ],
  "Tempo": [
    "WhatsApp Image 2025-06-24 at 14.53.29_b00b9700.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_e7228dc2.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_08cfcb37.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.31_040105aa.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_a9ad4ec3.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_ecefb8ac.jpg"
  ]
};

const whatsapp = "8269058399";

export default function AllCarsGallery() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 rounded-3xl bg-gradient-to-br from-indigo-50 via-yellow-50 to-blue-50 shadow-xl">
      <div className="mb-8 flex justify-start">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }
          }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur border-2 border-indigo-200 shadow text-indigo-900 font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-200"
        >
          <FaArrowLeft className="text-xl" />
          Back
        </button>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 via-yellow-500 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
        <FaCarSide className="text-yellow-500 drop-shadow" /> All Cars Gallery
      </h1>
      {carFolders.map((folder) => (
        <section key={folder} id={folder} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-8 text-center flex items-center justify-center gap-2">
            <FaCarSide className="text-indigo-400" /> {folder}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {carImages[folder].map((img, idx) => (
              <div key={img} className="relative overflow-hidden rounded-2xl shadow-2xl bg-white border-2 border-indigo-100 group hover:shadow-yellow-300 hover:scale-[1.04] transition-all duration-300 animate-fadeIn">
                <Image
                  src={`/${folder}/${img}`}
                  alt={`${folder} ${idx+1}`}
                  width={400}
                  height={288}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
                  {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                />
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-110 hover:from-green-500 hover:to-green-700 transition-all text-base flex items-center gap-2 border-2 border-white"
                >
                  <FaWhatsapp className="text-lg" /> Book
                </a>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
} 