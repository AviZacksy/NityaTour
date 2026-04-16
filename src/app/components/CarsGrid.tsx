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
    <section id="our-cars" className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-20">
      <RevealOnScroll>
        <SectionHeading>Our fleet</SectionHeading>
        <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-stone-600 md:text-lg">
          Sanitised, well‑maintained cars for city rides and outstation—pick what fits your group and
          route.
        </p>
      </RevealOnScroll>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {cars.map((car: Car, idx: number) => (
          <RevealOnScroll key={idx}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-[var(--surface)] shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-56 w-full border-b border-stone-100 bg-stone-50 md:h-60">
                <CarImageSlider images={car.images} folder={car.folder} alt={car.model} />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-stone-900">{car.model}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-600">
                  <span className="inline-flex items-center gap-2">
                    <FaUserFriends className="text-stone-400" aria-hidden />
                    {car.seating ? `${car.seating}+1` : "—"} seats
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaGasPump className="text-stone-400" aria-hidden />
                    {car.fuel || "—"}
                  </span>
                  {car.rate?.ac && (
                    <span className="inline-flex items-center gap-2">
                      <FaSnowflake className="text-stone-400" aria-hidden />
                      AC
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-stone-800">
                  {car.rate?.ac && (
                    <span className="inline-flex items-center gap-1">
                      <FaRupeeSign className="opacity-60" aria-hidden />
                      AC: {car.rate.ac}/km
                    </span>
                  )}
                  {car.rate?.non_ac && (
                    <span className="inline-flex items-center gap-1">
                      <FaRupeeSign className="opacity-60" aria-hidden />
                      Non‑AC: {car.rate.non_ac}/km
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  Per day (250 km):{" "}
                  <span className="font-medium text-stone-800">₹{car.per_day_charge}</span>
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600">
                  <li className="inline-flex items-center gap-1.5">
                    <FaCheckCircle className="text-teal-700" aria-hidden />
                    Clean & sanitised
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <FaCheckCircle className="text-teal-700" aria-hidden />
                    Verified driver
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <FaCheckCircle className="text-teal-700" aria-hidden />
                    GPS
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <a
                    href={`https://wa.me/${company?.contact?.whatsapp || "8269058399"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-md bg-teal-800 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-teal-900"
                  >
                    Book on WhatsApp
                  </a>
                  <a
                    href={`/all-cars#${encodeURIComponent(car.folder)}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-stone-300 bg-transparent px-4 py-3 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50"
                  >
                    <FaCamera aria-hidden />
                    Gallery
                  </a>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
      <CarNameList cars={cars} />
      <div className="mt-12 flex justify-center">
        <a
          href="/all-cars"
          className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-[var(--surface)] px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50"
        >
          <FaCamera className="text-stone-500" aria-hidden />
          Open full gallery
        </a>
      </div>
    </section>
  );
}
