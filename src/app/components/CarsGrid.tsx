"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { FaUserFriends, FaGasPump, FaSnowflake, FaRupeeSign, FaCheckCircle, FaCamera, FaWhatsapp } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
import CarNameList from "./CarNameList";
import type { SiteContent } from "@/lib/companyTypes";





interface Car {
  images: string[];
  folder: string;
  model: string;
  year?: string;
  seating?: string;
  fuel?: string;
  rate?: {
    ac?: number;
    non_ac?: number;
  };
  per_day_charge?: number;
}

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

interface CarsGridProps {
  cars: Car[];
  company: Company;
  fleetSection?: SiteContent["fleet_section"];
  CarImageSlider: React.ComponentType<{
    images: string[];
    folder: string;
    alt: string;
    overlayLabel?: string;
  }>;
}

export default function CarsGrid({ cars, company, fleetSection, CarImageSlider }: CarsGridProps) {
  const fleetHeading = fleetSection?.heading || "Our Luxury Fleet";
  const fleetLead =
    fleetSection?.lead ||
    "Sanitised, well-maintained vehicles for city rides and outstation journeys. Travel in ultimate comfort and style.";

  return (
    <section id="our-cars" className={`relative bg-[#FDFDF9] px-4 py-24 lg:px-6 lg:py-32 `}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-stone-100/50 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-stone-900 border border-stone-700 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#E5D5C5] shadow-lg">
              The Collection
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight drop-shadow-sm`}>
              {fleetHeading}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg font-medium">
              {fleetLead}
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car: Car, idx: number) => (
            <RevealOnScroll key={idx}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white text-stone-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:border-stone-200">
                <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <CarImageSlider
                    images={car.images}
                    folder={car.folder}
                    alt={car.model}
                  />
                  <div className="absolute bottom-4 left-6 z-20">
                    <h3 className={`text-3xl font-bold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`}>
                      {car.model}
                    </h3>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-6 pt-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-bold text-stone-500 uppercase tracking-widest mb-6 border-b border-stone-100 pb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <FaUserFriends className="text-[#F5A623]" size={14} aria-hidden />
                      {car.seating ? `${car.seating}+1` : "—"}
                    </span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span className="inline-flex items-center gap-1.5">
                      <FaGasPump className="text-[#F5A623]" size={14} aria-hidden />
                      {car.fuel || "—"}
                    </span>
                    {car.rate?.ac && (
                      <>
                        <span className="w-1 h-1 bg-stone-300 rounded-full" />
                        <span className="inline-flex items-center gap-1.5">
                          <FaSnowflake className="text-[#F5A623]" size={14} aria-hidden />
                          AC
                        </span>
                      </>
                    )}
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-5 mb-6 border border-stone-100/80">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500">Rate per km</span>
                      <div className="flex gap-4 text-sm font-bold text-stone-800">
                        {car.rate?.ac && <span className="bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-sm">AC: ₹{car.rate.ac}</span>}
                        {car.rate?.non_ac && <span className="bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-sm">Non-AC: ₹{car.rate.non_ac}</span>}
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-stone-200 pt-3 mt-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500">Per day (250km)</span>
                      <span className="text-xl font-bold text-[#F5A623]">₹{car.per_day_charge}</span>
                    </div>
                  </div>

                  <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-semibold text-stone-600">
                    <li className="inline-flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                        <FaCheckCircle className="text-[#F5A623]" size={10} aria-hidden />
                      </div>
                      Sanitised
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                        <FaCheckCircle className="text-[#F5A623]" size={10} aria-hidden />
                      </div>
                      Verified driver
                    </li>
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <a
                      href={`https://wa.me/${company?.contact?.whatsapp || "8435067145"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3.5 text-center text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                    >
                      <FaWhatsapp size={18} />
                      Book Now
                    </a>
                    <a
                      href={`/all-cars#${encodeURIComponent(car.folder)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-white px-5 py-3.5 text-sm font-bold text-stone-700 transition-all hover:bg-stone-50 hover:border-stone-300"
                    >
                      <FaCamera size={16} />
                      Gallery
                    </a>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
        
        <CarNameList cars={cars} />
        
        <div className="mt-16 flex justify-center">
          <a
            href="/all-cars"
            className="inline-flex items-center gap-3 rounded-full bg-white border-2 border-stone-200 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-800 transition-all hover:border-[#F5A623] hover:text-[#F5A623] hover:shadow-[0_10px_30px_rgba(214,93,69,0.1)] hover:-translate-y-1"
          >
            <FaCamera size={16} aria-hidden />
            View Full Fleet Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
