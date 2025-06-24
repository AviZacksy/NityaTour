"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function HeroSection() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setCompany(data as Company));
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background luxury car image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/WhatsApp%20Image%202025-06-24%20at%2019.24.51_69645de4.jpg"
          alt="Luxury Car"
          fill
          priority
          className="object-cover w-full h-full opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-yellow-900/60" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 max-w-2xl mx-auto">
        <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 font-bold px-4 py-1 rounded-full mb-4 shadow-lg animate-bounce">
          Trusted by 10,000+ Customers
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-white to-yellow-600 bg-clip-text text-transparent drop-shadow-lg mb-2 animate-fade-in-up">
          {company?.company_name || "Premium Car Rentals"}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-2 animate-fade-in-up delay-100">
          {company?.location || "Your City, India"}
        </p>
        <p className="text-base md:text-lg text-yellow-200 font-semibold mb-8 animate-fade-in-up delay-200">
          {company?.service_area ? `Serving: ${company.service_area}` : "All India Service"}
        </p>
        <a
          href="#our-cars"
          className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 font-bold px-8 py-4 rounded-full shadow-xl text-lg md:text-xl hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 animate-pulse"
        >
          Book Your Ride
        </a>
      </div>
      {/* Decorative sparkles or light streaks */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#paint0_linear)" fillOpacity="0.3" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#facc15" />
              <stop offset="1" stopColor="#f59e42" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
} 