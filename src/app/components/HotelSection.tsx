"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import Image from 'next/image';

interface Hotel {
  name: string;
  image: string;
}

const HotelSection: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    fetch("/Hotel/data.json")
      .then((res) => res.json())
      .then((data) => setHotels(data.hotels || []));
  }, []);

  return (
    <section id="hotel-nitya" className="max-w-7xl mx-auto px-4 mb-20">
      <RevealOnScroll>
        <SectionHeading>Our Hotel Facilities</SectionHeading>
        <div className="flex justify-center mt-6">
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg shadow transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${showImages ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-white text-yellow-700 border border-yellow-400 hover:bg-yellow-100'}`}
            onClick={() => setShowImages((v) => !v)}
          >
            {showImages ? 'Hide Images' : 'Show Images'}
          </button>
        </div>
      </RevealOnScroll>
      {showImages && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {hotels.map((hotel, idx) => (
            <RevealOnScroll key={idx}>
              <div className="bg-white/80 rounded-3xl shadow-xl border border-indigo-100 flex flex-col group hover:shadow-yellow-200 hover:scale-[1.03] transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-64 md:h-72 rounded-t-3xl overflow-hidden">
                  <Image
                    src={`/Hotel/${hotel.image}`}
                    alt={hotel.name}
                    width={400}
                    height={288}
                    className="object-cover w-full h-full rounded-t-3xl"
                    // Only use 'priority' for the first image, otherwise use 'loading="lazy"'
                    {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      )}
    </section>
  );
};

export default HotelSection;