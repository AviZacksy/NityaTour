"use client";
import { useState } from "react";
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
                  </div>
                  
                  <p className="text-[14px] text-gray-500 line-clamp-2 leading-relaxed">
                    Explore the beautiful destinations of {pkg.dest} with our premium tour packages. Perfect for families, couples, and group adventures.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-[#f5a623] border border-[#f5a623] text-white hover:bg-[#e0941d] font-bold text-[13px] tracking-widest uppercase shadow-sm rounded-none transition-colors"
            >
              {showAll ? "Show Less" : "View All Packages"}
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

