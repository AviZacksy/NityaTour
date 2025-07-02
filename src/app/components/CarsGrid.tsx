"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { FaUserFriends, FaGasPump, FaSnowflake, FaRupeeSign, FaCheckCircle, FaCamera } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
import CarNameList from "./CarNameList";

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
    <section id="our-cars" className="max-w-7xl mx-auto px-4 mb-20">
      <RevealOnScroll>
        <SectionHeading>Our Cars</SectionHeading>
        <p className="text-xl md:text-2xl text-yellow-700 font-semibold mt-4 mb-8 text-center max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up">
          Discover our premium fleet of well-maintained, sanitized, and stylish vehicles—perfect for every journey. Whether you need comfort, luxury, or space, we have the right car for you. Book now and experience the best ride in town!
        </p>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        {cars.map((car: Car, idx: number) => (
          <RevealOnScroll key={idx}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-100 flex flex-col group hover:shadow-yellow-200 hover:scale-[1.03] transition-all duration-300 overflow-hidden">
              <div className="relative w-full h-64 md:h-64 rounded-t-3xl overflow-hidden">
                <CarImageSlider images={car.images} folder={car.folder} alt={car.model} />
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h4 className="text-2xl font-extrabold text-indigo-900 mb-2 group-hover:text-yellow-600 transition">{car.model}</h4>
                <div className="flex items-center gap-4 text-gray-600 text-base mb-3">
                  <span className="flex items-center gap-2"><FaUserFriends className="text-indigo-400" /> {car.seating || "-"} Seats</span>
                  <span className="flex items-center gap-2"><FaGasPump className="text-yellow-500" /> {car.fuel}</span>
                  {car.rate?.ac && <span className="flex items-center gap-2"><FaSnowflake className="text-blue-400" /> AC</span>}
                </div>
                <div className="flex flex-wrap gap-3 text-yellow-700 font-bold text-lg mb-2">
                  {car.rate?.ac && <span className="flex items-center gap-1"><FaRupeeSign />AC: {car.rate.ac}/km</span>}
                  {car.rate?.non_ac && <span className="flex items-center gap-1"><FaRupeeSign />Non-AC: {car.rate.non_ac}/km</span>}
                </div>
                <span className="text-sm text-gray-500 mb-4">Per day charge: <span className="font-semibold text-indigo-700">₹{car.per_day_charge}</span></span>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-2 text-green-600 text-sm"><FaCheckCircle /> Clean & Sanitized</span>
                  <span className="flex items-center gap-2 text-green-600 text-sm"><FaCheckCircle /> Verified Driver</span>
                  <span className="flex items-center gap-2 text-green-600 text-sm"><FaCheckCircle /> GPS Enabled</span>
                </div>
                <div className="mt-auto w-full flex flex-col items-center">
                  <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center bg-gradient-to-r from-yellow-100 via-white to-yellow-50 rounded-2xl shadow-lg p-4 mb-2 border border-yellow-200">
                    <a
                      href={`https://wa.me/${company?.contact?.whatsapp || "8269058399"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 whitespace-nowrap text-center bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-lg hover:from-pink-600 hover:to-yellow-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-200"
                      style={{ minWidth: '160px' }}
                    >
                      Book Now
                    </a>
                    <a
                      href={`/all-cars#${encodeURIComponent(car.folder)}`}
                      className="flex-1 whitespace-nowrap inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-200 border-0 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      style={{ minWidth: '180px' }}
                    >
                      <FaCamera className="text-xl" />
                      View All Images
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <CarNameList cars={cars} />
      <div className="flex justify-center mt-10">
        <a
          href="/all-cars"
          className="inline-flex items-center gap-4 px-12 py-7 rounded-2xl text-2xl font-extrabold bg-white/30 backdrop-blur-md border-2 border-yellow-400 shadow-2xl text-indigo-900 hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 hover:bg-yellow-100/60 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        >
          <FaCamera className="text-3xl text-yellow-500 drop-shadow" />
          View All Car Images
        </a>
      </div>
    </section>
  );
} 