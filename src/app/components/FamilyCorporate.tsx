"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaUsers, FaBriefcase } from "react-icons/fa";

export default function FamilyCorporate() {
  const handleContactClick = () => {
    const contactBtn = document.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    if (contactBtn) contactBtn.click();
  };

  return (
    <section id="family-corporate" className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Family Holidays Block */}
            <div className="relative rounded-none overflow-hidden group h-[400px]">
              <img 
                src="/service/family-trip.jpg" 
                alt="Family Holidays" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-white border border-white/30">
                  <FaUsers size={20} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Family Holidays</h3>
                <p className="text-white/80 text-lg mb-8 max-w-sm">Plan memorable vacations for your entire family with safe transport and kid-friendly stays.</p>
                <button onClick={handleContactClick} className="bg-[#d32f2f] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                  Plan Family Trip
                </button>
              </div>
            </div>

            {/* Corporate Travel Block */}
            <div className="relative rounded-none overflow-hidden group h-[400px]">
              <img 
                src="/service/corporate.jpg" 
                alt="Corporate Travel" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-white border border-white/30">
                  <FaBriefcase size={20} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Corporate Travel</h3>
                <p className="text-white/80 text-lg mb-8 max-w-sm">Complete business travel solutions for your team. Conferences, offsites, and daily commute.</p>
                <button onClick={handleContactClick} className="bg-[#1f73b7] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                  Corporate Enquiry
                </button>
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

