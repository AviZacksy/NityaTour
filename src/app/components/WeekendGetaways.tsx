"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaTree, FaCampground, FaBus, FaUsers, FaGraduationCap, FaBuilding } from "react-icons/fa";

const getaways = [
  { icon: <FaTree size={24} />, title: "One Day Outing" },
  { icon: <FaCampground size={24} />, title: "Weekend Getaway" },
  { icon: <FaUsers size={24} />, title: "Picnic" },
  { icon: <FaBus size={24} />, title: "Group Trip" },
  { icon: <FaGraduationCap size={24} />, title: "School/College Trips" },
  { icon: <FaBuilding size={24} />, title: "Office Outing" },
];

export default function WeekendGetaways() {
  return (
    <section id="weekend-getaways" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-[#1f73b7] font-bold tracking-widest text-xs uppercase mb-2 block">Quick Break</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Outing & Weekend Getaways</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Need a quick break from the city? Discover our handpicked short-trip options perfect for a quick refresh.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getaways.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-none p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg hover:border-[#1f73b7]/30 transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white text-[#1f73b7] shadow-sm flex items-center justify-center mb-4 group-hover:bg-[#1f73b7] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

