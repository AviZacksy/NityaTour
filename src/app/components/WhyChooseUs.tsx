"use client";
import { FaTag, FaHotel, FaBoxOpen, FaHeadset, FaUsers, FaLock } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";

const reasons = [
  { icon: <FaTag className="text-3xl text-[#1f73b7]" />, title: "Best Price", desc: "We offer the most competitive rates in the market without compromising on quality." },
  { icon: <FaHotel className="text-3xl text-[#1f73b7]" />, title: "Trusted Hotels & Transport", desc: "Handpicked stays and well-maintained vehicles for your comfort and safety." },
  { icon: <FaBoxOpen className="text-3xl text-[#1f73b7]" />, title: "Customized Packages", desc: "Tailor-made itineraries designed specifically to match your travel style." },
  { icon: <FaHeadset className="text-3xl text-[#1f73b7]" />, title: "24×7 Travel Support", desc: "Our dedicated team is always available to assist you during your journey." },
  { icon: <FaUsers className="text-3xl text-[#1f73b7]" />, title: "Experienced Travel Team", desc: "Years of expertise in planning flawless domestic and international trips." },
  { icon: <FaLock className="text-3xl text-[#1f73b7]" />, title: "Easy & Secure Booking", desc: "Hassle-free booking process with secure payment options." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-[#1f73b7] font-bold tracking-widest text-xs uppercase mb-2 block">Our Value</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Nitya Tour</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Your trusted travel partner dedicated to making every journey memorable, safe, and perfectly planned.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, idx) => (
              <div key={idx} className="bg-gray-50 rounded-none p-8 border border-gray-100 hover:shadow-lg transition-all group text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

