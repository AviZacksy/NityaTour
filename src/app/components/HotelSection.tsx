"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import Image from "next/image";
import type { SiteContent } from "@/lib/companyTypes";





interface Hotel {
  name: string;
  image: string;
}

type Props = {
  copy?: SiteContent["hotel_section"];
};

const HotelSection: React.FC<Props> = ({ copy }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    fetch("/Hotel/data.json")
      .then((res) => res.json())
      .then((data) => setHotels(data.hotels || []));
  }, []);

  const heading = copy?.heading || "Luxury Stay & Hospitality";
  const subtitle =
    copy?.subtitle ||
    "Curated hotel accommodations tailored to your travel package. Experience comfort and world-class service.";
  const showLabel = copy?.show_photos || "View Hotel Gallery";
  const hideLabel = copy?.hide_photos || "Hide Gallery";

  return (
    <section id="hotel-nitya" className={`bg-stone-900 py-24 lg:py-32 text-white `}>
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-[#E5D5C5]">
              Accommodations
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white`}>
              {heading}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-400 md:text-lg font-medium">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`rounded-full border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                showImages
                  ? "border-[#F5A623] bg-[#F5A623] text-white hover:bg-[#D97706]"
                  : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white"
              }`}
              onClick={() => setShowImages((v) => !v)}
            >
              {showImages ? hideLabel : showLabel}
            </button>
          </div>
        </RevealOnScroll>

        {showImages && (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {hotels.map((hotel, idx) => (
              <RevealOnScroll key={idx}>
                <figure className="group overflow-hidden rounded-none bg-[#1c1c1c] border border-stone-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-stone-600">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <Image
                      src={`/Hotel/${hotel.image}`}
                      alt={hotel.name || "Hotel"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                    />
                  </div>
                  <figcaption className="px-6 py-5">
                    <h3 className={`text-xl font-semibold text-white tracking-wide`}>
                      {hotel.name || "Premium Property"}
                    </h3>
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelSection;

