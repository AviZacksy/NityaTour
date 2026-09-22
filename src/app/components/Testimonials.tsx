"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Yashoda devi",
    role: "3 weeks ago",
    text: "When I first contacted Ms Jyothi Yadav ma’am, her response in the first instance is so cordial and we were so happy and decided to go to trip with Nitya Travels.",
    rating: 5,
    color: "bg-purple-600"
  },
  {
    name: "gautam raval",
    role: "6 months ago",
    text: "We recently hired a vehicle with a driver from Nitya Tour & Travels, Indore for a religious tour around Indore, covering Ujjain, Maheshwar, and Omkareshwar. The experience was wonderful, with smooth darshan.",
    rating: 5,
    color: "bg-teal-600"
  },
  {
    name: "Vinayak kudva",
    role: "8 months ago",
    text: "We had booked a cab for 9 days for an MP trip covering Indore, Ujjain, Omkareshwar, Bhopal, Sanchi and Satpura. We had a wonderful experience - good and knowledgeable driver who was helpful throughout the trip.",
    rating: 5,
    color: "bg-orange-600"
  },
  {
    name: "Dr Kavita Pawar",
    role: "2 months ago",
    text: "Jyothi Maam helped us coordinate a wonderful trip from indore to dhar and ujjain over 2 days. Mr Navin bhaiya was a exceptional driver, very friendly and helpful and the car provided was great quality",
    rating: 5,
    color: "bg-blue-600"
  },
  {
    name: "Shibadityaa Pathak",
    role: "3 months ago",
    text: "Excellent service. The car was very comfortable. Sharwan Ji was our driver and is a good, knowledgeable person.",
    rating: 5,
    color: "bg-green-600"
  },
  {
    name: "Divyarani Sishtla",
    role: "9 months ago",
    text: "Dhanraj ji and Dilip ji were our drivers from Indore to Hyderabad, they both were excellent! The entire journey was smooth, quick and felt very safe. I would definitely recommend Nitya tours and travels. Amazing service 💯",
    rating: 5,
    color: "bg-slate-500"
  }
];

export default function Testimonials() {
  return (
    <section className="pt-20 pb-10 bg-gray-50">
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
                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden ${t.color || 'bg-gray-200'} flex items-center justify-center text-white text-3xl font-bold`}>
                  {t.name.charAt(0).toUpperCase()}
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

