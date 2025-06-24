"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { FaUserFriends, FaGasPump, FaSnowflake } from "react-icons/fa";

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
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
}

interface CarsGridProps {
  cars: Car[];
  company: Company;
  CarImageSlider: React.ComponentType<{ images: string[]; folder: string; alt: string }>;
}

export default function CarsGrid({ cars, company, CarImageSlider }: CarsGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <SectionHeading>Our Cars</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {cars.map((car: Car, idx: number) => (
          <div key={idx} className="relative bg-white/60 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col group hover:shadow-yellow-200 transition-all duration-300">
            <div className="p-4 pb-0">
              <CarImageSlider images={car.images} folder={car.folder} alt={car.model} />
            </div>
            <div className="flex-1 flex flex-col p-4 pt-2">
              <h4 className="text-2xl font-extrabold text-indigo-900 mb-1 group-hover:text-yellow-600 transition">{car.model}</h4>
              <div className="flex items-center gap-3 text-gray-600 text-sm mb-2">
                <span className="flex items-center gap-1"><FaUserFriends className="text-indigo-400" /> {car.seating || "-"}</span>
                <span className="flex items-center gap-1"><FaGasPump className="text-yellow-500" /> {car.fuel}</span>
                {car.rate?.ac && <span className="flex items-center gap-1"><FaSnowflake className="text-blue-400" /> AC</span>}
              </div>
              <div className="flex flex-wrap gap-2 text-yellow-700 font-bold text-lg mb-1">
                {car.rate?.ac && <span>AC: ₹{car.rate.ac}/km</span>}
                {car.rate?.non_ac && <span>Non-AC: ₹{car.rate.non_ac}/km</span>}
              </div>
              <span className="text-xs text-gray-400 mb-2">Per day charge: <span className="font-semibold text-indigo-700">₹{car.per_day_charge}</span></span>
              <div className="mt-auto flex justify-center">
                <a
                  href={`https://wa.me/${company?.contact?.whatsapp || "8269058399"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 px-5 py-2 rounded-full font-bold shadow hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all text-base group-hover:shadow-yellow-300 text-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 