"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Verma",
    role: "Family Trip to Kashmir",
    text: "Nitya Tour planned our Kashmir trip perfectly. The hotels were excellent, and the driver was very polite and professional. Highly recommended!",
    rating: 5,
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Priya Sharma",
    role: "Corporate Outing",
    text: "We booked a tempo traveller for our office outing. The vehicle was clean, arrived on time, and the entire process was smooth. Great service.",
    rating: 5,
    img: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Amit Patel",
    role: "Char Dham Yatra",
    text: "Our Char Dham Yatra was made incredibly easy by the team. They handled everything from accommodations to safe transport in hilly terrains.",
    rating: 5,
    img: "https://i.pravatar.cc/150?img=15"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-[#1f73b7] font-bold tracking-widest text-xs uppercase mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don&apos;t just take our word for it. Read about the experiences of our happy travelers.</p>
          </div>

          {/* Added custom scrollbar hiding class via arbitrary variants or style */}
          <div 
            className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="flex-none w-[85%] sm:w-[350px] md:w-[calc(33.333%-1.33rem)] snap-center bg-white rounded-none p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative mt-10"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="text-center mt-10">
                  <div className="flex justify-center text-[#FFD400] mb-3">
                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <FaQuoteLeft className="text-gray-200 text-3xl mx-auto mb-4" />
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

