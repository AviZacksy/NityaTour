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

  const heading = copy?.heading || "Hotel & stay";
  const subtitle =
    copy?.subtitle ||
    "Tour packages with comfortable stay options—tap below to preview property photos.";
  const showLabel = copy?.show_photos || "Show photos";
  const hideLabel = copy?.hide_photos || "Hide photos";

  return (
    <section id="hotel-nitya" className="border-t border-stone-200/80 bg-[var(--surface)] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealOnScroll>
          <SectionHeading>{heading}</SectionHeading>
          <p className="mx-auto -mt-4 mb-8 max-w-2xl text-center text-base text-stone-600">{subtitle}</p>
          <div className="flex justify-center">
            <button
              type="button"
              className={`rounded-md border px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 ${
                showImages
                  ? "border-stone-900 bg-stone-900 text-white hover:bg-stone-800"
                  : "border-stone-300 bg-transparent text-stone-800 hover:bg-stone-50"
              }`}
              onClick={() => setShowImages((v) => !v)}
            >
              {showImages ? hideLabel : showLabel}
            </button>
          </div>
        </RevealOnScroll>
        {showImages && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {hotels.map((hotel, idx) => (
              <RevealOnScroll key={idx}>
                <figure className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50 shadow-sm">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={`/Hotel/${hotel.image}`}
                      alt={hotel.name || "Hotel"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                    />
                  </div>
                  <figcaption className="border-t border-stone-100 px-4 py-3 text-sm font-medium text-stone-800">
                    {hotel.name || "Property"}
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
