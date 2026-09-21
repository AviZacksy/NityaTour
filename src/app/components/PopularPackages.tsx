"use client";
import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

const domesticPackages = [
  { dest: "Kashmir", duration: "5N/6D", price: "₹18,500", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop" },
  { dest: "Himachal", duration: "6N/7D", price: "₹15,000", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
  { dest: "Goa", duration: "4N/5D", price: "₹12,500", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" },
  { dest: "Rajasthan", duration: "7N/8D", price: "₹22,000", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop" },
  { dest: "Kerala", duration: "5N/6D", price: "₹16,500", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop" },
  { dest: "Northeast", duration: "7N/8D", price: "₹24,000", img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=800&auto=format&fit=crop" },
  { dest: "Andaman", duration: "6N/7D", price: "₹28,000", img: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?q=80&w=800&auto=format&fit=crop" },
];

const internationalPackages = [
  { dest: "Dubai", duration: "4N/5D", price: "₹35,000", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
  { dest: "Thailand", duration: "5N/6D", price: "₹28,500", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
  { dest: "Bali", duration: "6N/7D", price: "₹42,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" },
  { dest: "Singapore", duration: "4N/5D", price: "₹45,000", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop" },
  { dest: "Malaysia", duration: "5N/6D", price: "₹32,000", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop" },
  { dest: "Europe", duration: "10N/11D", price: "₹1,25,000", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop" },
  { dest: "Maldives", duration: "4N/5D", price: "₹65,000", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop" },
];

export default function PopularPackages() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");
  const [showAll, setShowAll] = useState(false);

  const packages = activeTab === "domestic" ? domesticPackages : internationalPackages;

  // Reset showAll when tab changes
  const handleTabChange = (tab: "domestic" | "international") => {
    setActiveTab(tab);
    setShowAll(false);
  };

  return (
    <section id="tour-packages" className="pt-10 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Tour Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our carefully crafted itineraries covering the best destinations in India and around the globe.</p>
          </div>

          <div className="flex justify-center mb-12 gap-8 border-b border-gray-100 pb-4">
            <button 
              onClick={() => handleTabChange("domestic")}
              className={`text-[12px] sm:text-[13px] font-bold tracking-wider uppercase transition-colors ${activeTab === "domestic" ? "text-[#ef4056]" : "text-gray-400 hover:text-gray-800"}`}
            >
              Domestic Tours
            </button>
            <button 
              onClick={() => handleTabChange("international")}
              className={`text-[12px] sm:text-[13px] font-bold tracking-wider uppercase transition-colors ${activeTab === "international" ? "text-[#ef4056]" : "text-gray-400 hover:text-gray-800"}`}
            >
              International Tours
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`bg-white border border-gray-200 rounded-none overflow-hidden group hover:shadow-2xl transition-all duration-300 ${!showAll && idx >= 3 ? 'hidden md:block' : 'block'}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <img 
                    src={pkg.img} 
                    alt={pkg.dest}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Red Ribbon */}
                  {idx % 3 === 0 && (
                    <div className="absolute top-4 -right-8 bg-[#ef4056] text-white text-[11px] font-bold px-10 py-1.5 rotate-45 shadow-sm">
                      Special Offer
                    </div>
                  )}
                  {idx % 3 === 1 && (
                    <div className="absolute top-4 -right-8 bg-[#ef4056] text-white text-[11px] font-bold px-10 py-1.5 rotate-45 shadow-sm">
                      Last Minute
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[22px] text-gray-900">{pkg.dest} Tour</h3>
                    <div className="text-[20px] font-bold text-[#3db1a4]">{pkg.price}</div>
                  </div>
                  
                  <div className="flex items-center text-[13px] text-gray-500 mb-5 gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>9.3 Superb</span>
                  </div>
                  
                  <p className="text-[14px] text-gray-500 mb-8 line-clamp-2 leading-relaxed">
                    Explore the beautiful destinations of {pkg.dest} with our premium tour packages. Perfect for families, couples, and group adventures.
                  </p>
                  
                  <div className="border-t border-gray-200 pt-5 flex items-center justify-start gap-8 text-[13px] text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      12+
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-white border border-stone-300 text-stone-800 font-bold text-[13px] tracking-widest uppercase shadow-sm active:bg-stone-100 rounded-none"
            >
              {showAll ? "Show Less" : "View All Packages"}
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

