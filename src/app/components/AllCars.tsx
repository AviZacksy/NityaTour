"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { FaWhatsapp, FaCalendarAlt, FaGasPump } from "react-icons/fa";

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
    <>
      <section className="max-w-7xl mx-auto px-4 mb-20 py-12 rounded-3xl bg-white shadow-xl">
        <SectionHeading>All Cars</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {cars.map((car: Car, idx: number) => (
            <div
              key={idx}
              className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-indigo-100 flex flex-col items-center p-5 group hover:shadow-yellow-300 hover:scale-[1.04] transition-all duration-300 cursor-pointer overflow-hidden animate-fadeIn"
            >
              <div className="w-full flex justify-center">
                <CarImageSlider images={car.images} folder={car.folder} alt={car.model} />
              </div>
              <h4 className="text-xl font-extrabold mb-2 mt-4 text-indigo-900 group-hover:text-yellow-600 transition">{car.model}</h4>
              <div className="flex gap-2 mb-2 flex-wrap justify-center">
                {car.year && (
                  <span className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                    <FaCalendarAlt className="text-indigo-400" /> {car.year}
                  </span>
                )}
                {car.fuel && (
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                    <FaGasPump className="text-yellow-400" /> {car.fuel}
                  </span>
                )}
              </div>
              <div className="flex gap-2 text-yellow-700 font-bold text-sm mt-1 mb-2 flex-wrap justify-center">
                {car.rate?.ac && <span className="bg-yellow-50 px-2 py-1 rounded-full">AC: ₹{car.rate.ac}/km</span>}
                {car.rate?.non_ac && <span className="bg-indigo-50 px-2 py-1 rounded-full">Non-AC: ₹{car.rate.non_ac}/km</span>}
              </div>
              <span className="text-xs text-gray-500 mb-3">Per day charge: ₹{car.per_day_charge}</span>
              <a
                href={`https://wa.me/${company?.contact?.whatsapp || "8269058399"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-110 hover:from-green-500 hover:to-green-700 transition-all text-base group-hover:shadow-green-300 flex items-center gap-2 border-2 border-white"
                style={{ minWidth: 110 }}
              >
                <FaWhatsapp className="text-xl" /> Book
              </a>
            </div>
          ))}
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 pb-8 -mt-8">
        <div className="text-xs text-gray-500 text-center bg-yellow-50 border border-yellow-200 rounded-xl py-3 mt-4">
          Insurance Claim (insurance charges will be extra)
        </div>
      </div>
    </>
  );
} 