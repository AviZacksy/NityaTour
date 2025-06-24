"use client";
import React from "react";
import SectionHeading from "./SectionHeading";

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

interface AllCarsProps {
  cars: Car[];
  company: Company;
  CarImageSlider: React.ComponentType<{ images: string[]; folder: string; alt: string }>;
}

export default function AllCars({ cars, company, CarImageSlider }: AllCarsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <SectionHeading>All Cars</SectionHeading>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {cars.map((car: Car, idx: number) => (
          <div key={idx} className="break-inside-avoid bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-4 flex flex-col items-center border border-indigo-50 group hover:shadow-2xl hover:scale-[1.03] transition-transform cursor-pointer relative">
            <CarImageSlider images={car.images} folder={car.folder} alt={car.model} />
            <h4 className="text-xl font-bold mb-1 mt-3 text-indigo-900 group-hover:text-yellow-600 transition">{car.model}</h4>
            <div className="flex gap-2 text-gray-500 text-xs mb-1">
              <span>Year: {car.year}</span>
              <span>|</span>
              <span>Fuel: {car.fuel}</span>
            </div>
            <div className="flex gap-2 text-yellow-700 font-bold text-sm mt-1">
              {car.rate?.ac && <span>AC: ₹{car.rate.ac}/km</span>}
              {car.rate?.non_ac && <span>Non-AC: ₹{car.rate.non_ac}/km</span>}
            </div>
            <span className="text-xs text-gray-400 mt-1">Per day charge: ₹{car.per_day_charge}</span>
            <a
              href={`https://wa.me/${company?.contact?.whatsapp || "8269058399"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 px-5 py-2 rounded-full font-bold shadow hover:scale-110 hover:from-yellow-500 hover:to-yellow-700 transition-all text-sm group-hover:shadow-yellow-300"
            >
              Book
            </a>
          </div>
        ))}
      </div>
    </section>
  );
} 