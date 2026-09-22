"use client";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
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
}

export default function CarsGrid({ cars, company, fleetSection }: CarsGridProps) {
  const fleetLead =
    fleetSection?.lead ||
    "Sanitised, well-maintained vehicles for city rides and outstation journeys. Travel in ultimate comfort and style.";

  return (
    <section id="our-cars" className="relative bg-[#f8f9fa] px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <RevealOnScroll>
          <div className="text-center mb-16 flex flex-col items-center">

            <h2 className="text-4xl md:text-[42px] font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
              Car Rental
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-gray-500 md:text-[16px]">
              {fleetLead}
            </p>
          </div>
        </RevealOnScroll>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cars.map((car: Car, idx: number) => {
            const folderLower = car.folder.toLowerCase();
            let rateDisplay = "";
            let unitDisplay = "per km";

            if (folderLower.includes("ertiga")) rateDisplay = "₹14";
            else if (folderLower.includes("crysta")) rateDisplay = "₹19";
            else if (folderLower.includes("innova") || folderLower.includes("hycross")) rateDisplay = "₹16";
            else if (folderLower.includes("tavera")) rateDisplay = "₹16";
            else if (folderLower.includes("tempo")) {
              rateDisplay = "₹26 non-ac / ₹28 ac";
            }
            else if (folderLower.includes("aura") || folderLower.includes("sedan")) rateDisplay = "₹12";
            else {
              rateDisplay = `₹${car.per_day_charge || "12"}`;
            }
            return (
              <RevealOnScroll key={idx}>
                <a
                  href={`https://wa.me/${company?.contact?.whatsapp || "8435067145"}?text=Hi, I want to book ${car.model}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-none bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex justify-between items-start mb-6">
                    {/* Left Info */}
                    <div className="flex flex-col z-10 w-1/2">
                      <h3 className="text-[18px] font-bold text-gray-800 mb-1 leading-tight">
                        {car.model}
                      </h3>
                    </div>

                    {/* Right Image */}
                    <div className="w-1/2 h-[100px] relative -mt-2 -mr-2">
                      {/* We use the CarImageSlider but restrict it so it acts like a static image if possible, 
                          or we just display the first image to match the clean design */}
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={`/${car.folder}/${car.images[0]}`}
                          alt={car.model}
                          className="w-full h-full object-contain object-right"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 rounded-none"></div>
                      )}
                    </div>
                  </div>

                  {/* Features Row */}
                  <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                      {car.fuel || "Diesel"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Manual
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUserFriends className="text-gray-400" size={14} />
                      {car.seating ? `${car.seating} seats` : "7 seats"}
                    </span>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-baseline gap-1.5 flex-wrap max-w-[60%]">
                      <span className="text-[18px] font-bold text-[#0d2a45]">
                        {rateDisplay}
                      </span>
                      <span className="text-[13px] text-gray-500 whitespace-nowrap">
                        {unitDisplay}
                      </span>
                    </div>
                    <span className="text-[12px] font-bold text-white bg-[#f5a623] px-4 py-2 hover:bg-[#e0941d] transition-colors shadow-sm">
                      Book Now
                    </span>
                  </div>
                </a>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}

