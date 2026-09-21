"use client";
import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import Image from "next/image";

const services = [
  {
    title: "Rent a Car",
    desc: "Self-drive / chauffeur / local & outstation",
    image: "/service/rent-car.jpg",
    href: "#our-cars"
  },
  {
    title: "Hotel Booking",
    desc: "Hotels, resorts, stays",
    image: "/service/hotel-booking.jpg",
    href: "#hotel-nitya"
  },
  {
    title: "Family Trips",
    desc: "Family holiday packages",
    image: "/service/family-trip.jpg",
    href: "#family-trips"
  },
  {
    title: "Corporate Booking",
    desc: "Business trips, conferences, employee travel",
    image: "/service/corporate.jpg",
    href: "#corporate"
  },
  {
    title: "Tour Packages",
    desc: "Domestic + International",
    image: "/service/tourpackage.jpg",
    href: "#tour-packages"
  },
  {
    title: "Outing & Getaways",
    desc: "One-day outing, weekend trips",
    image: "/service/outing.jpg",
    href: "#weekend-getaways"
  },
  {
    title: "Char Dham Yatra",
    desc: "Kedarnath, Badrinath, Yamunotri, Gangotri",
    image: "/service/chardham.jpg",
    href: "#spiritual-tours"
  },
  {
    title: "Spiritual Tours",
    desc: "Ayodhya, Varanasi, Mathura, Ujjain, etc.",
    image: "/service/sprituial.jpg",
    href: "#spiritual-tours"
  }
];

export default function QuickServices() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="pt-12 pb-6 bg-gray-50 mt-8 relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-block py-1.5 px-5 bg-[#1a1a1a] text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#f5a623] shadow-md mb-4">
              Explore Services
            </span>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
              Our Quick Services
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-gray-500">
              Discover our wide range of services including car rentals, hotel bookings, corporate trips, and curated tour packages for a memorable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <a 
                key={idx}
                href={service.href}
                className={`relative bg-stone-900 group flex-col overflow-hidden rounded-none aspect-[4/3] hover:shadow-xl transition-all duration-300 ${!showAll && idx >= 3 ? 'hidden md:flex' : 'flex'}`}
              >
                {/* Background Image */}
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                
                {/* Content Overlay */}
                <div className="relative z-20 mt-auto p-5 sm:p-6 flex flex-col w-full text-white">
                  {/* Small top text */}
                  <div className="flex items-center gap-2 text-sm text-stone-200 mb-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                    <span className="line-clamp-1">{service.desc}</span>
                  </div>
                  
                  {/* Title Area */}
                  <div className="flex justify-between items-end w-full">
                    <h3 className="font-bold text-lg md:text-xl text-white tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <span className="font-bold text-base whitespace-nowrap ml-2 text-white/90">
                      Explore
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-white border border-stone-300 text-stone-800 font-bold text-[13px] tracking-widest uppercase shadow-sm active:bg-stone-100 rounded-none"
            >
              {showAll ? "Show Less" : "View All Services"}
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
