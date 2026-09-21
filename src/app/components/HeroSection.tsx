"use client";
import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { FaGlobe, FaRocket } from "react-icons/fa";

export default function HeroSection() {

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const contactBtn = document.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    if (contactBtn) contactBtn.click();
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] flex flex-col justify-center bg-stone-900">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2000&auto=format&fit=crop"
          alt="Majestic Travel Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Hero Text (Centered) */}
      <div className="relative z-10 w-full px-4 sm:px-6 flex flex-col items-center text-center">
        <RevealOnScroll>
          <div className="text-white">
            <span className="block text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4 text-white/90 drop-shadow-md">
              Your Trusted Travel Partner
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-tight font-medium tracking-tight drop-shadow-lg">
              Incredible Journey
            </h1>
          </div>
        </RevealOnScroll>
      </div>

      {/* Voyage Style Search Bar */}
      <div className="relative z-30 w-full px-4 md:px-8 mt-8 md:mt-12">
        <div className="max-w-[1400px] mx-auto bg-white shadow-2xl flex flex-col lg:flex-row rounded-none overflow-hidden lg:rounded-none lg:overflow-visible">
          
          {/* Left Text Block */}
          <div className="hidden lg:flex flex-col justify-center px-8 py-6 border-r border-stone-100 min-w-[220px]">
            <span className="text-[15px] text-stone-500 leading-tight">Find Your</span>
            <span className="text-[22px] font-bold text-stone-900 leading-tight">Destination</span>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSearch} className="flex-1 flex flex-col lg:flex-row w-full p-4 lg:p-0">
            
            {/* When */}
            <div className="flex-1 flex items-center px-4 py-4 lg:py-0 border-b lg:border-b-0 lg:border-r border-stone-100">
              <label className="text-[15px] text-stone-900 mr-4 w-12 font-medium">When</label>
              <div className="relative flex-1">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#f7f7f7] text-stone-600 text-sm p-3 outline-none focus:bg-[#f0f0f0] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Where */}
            <div className="flex-1 flex items-center px-4 py-4 lg:py-0 border-b lg:border-b-0 lg:border-r border-stone-100">
              <label className="text-[15px] text-stone-900 mr-4 w-14 font-medium">Where</label>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#f7f7f7] text-stone-600 text-sm p-3 pr-10 outline-none focus:bg-[#f0f0f0] transition-colors"
                  required
                />
                <FaGlobe className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              </div>
            </div>

            {/* What */}
            <div className="flex-1 flex items-center px-4 py-4 lg:py-0">
              <label className="text-[15px] text-stone-900 mr-4 w-10 font-medium">What</label>
              <div className="relative flex-1">
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#f7f7f7] text-stone-600 text-sm p-3 pr-10 outline-none focus:bg-[#f0f0f0] transition-colors appearance-none"
                  required
                >
                  <option value="" disabled hidden>Type</option>
                  <option value="Tour">Tour Package</option>
                  <option value="Hotel">Hotel Booking</option>
                  <option value="Car">Car Rental</option>
                  <option value="Spiritual">Spiritual Yatra</option>
                </select>
                <FaRocket className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full lg:w-[160px] bg-[#ef4056] hover:bg-[#d83549] text-white text-[13px] font-bold tracking-widest uppercase transition-colors py-5 lg:py-0 mt-4 lg:mt-0 shrink-0"
            >
              Search
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
