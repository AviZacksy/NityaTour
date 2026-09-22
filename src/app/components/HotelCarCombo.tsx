"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaHotel, FaCar, FaMapMarkedAlt, FaPlus } from "react-icons/fa";

export default function HotelCarCombo() {
  const handleContactClick = () => {
    window.dispatchEvent(new Event("openContact"));
  };

  return (
    <section className="py-16 bg-[#1f73b7] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-none p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Complete Your Trip</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#1f73b7] flex items-center justify-center shadow-lg mb-3">
                  <FaHotel size={28} />
                </div>
                <span className="text-white font-semibold">Hotel Booking</span>
              </div>
              
              <FaPlus className="text-white/50 text-2xl hidden md:block" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#1f73b7] flex items-center justify-center shadow-lg mb-3">
                  <FaCar size={28} />
                </div>
                <span className="text-white font-semibold">Car Rental</span>
              </div>

              <FaPlus className="text-white/50 text-2xl hidden md:block" />

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#1f73b7] flex items-center justify-center shadow-lg mb-3">
                  <FaMapMarkedAlt size={28} />
                </div>
                <span className="text-white font-semibold">Tour Package</span>
              </div>
            </div>

            <button onClick={handleContactClick} className="bg-[#FFD400] hover:bg-yellow-500 text-black font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Plan My Trip
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
