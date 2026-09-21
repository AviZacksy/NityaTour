"use client";
import RevealOnScroll from "./RevealOnScroll";
import { FaPhoneAlt } from "react-icons/fa";

export default function FinalCTA() {
  const handleContactClick = () => {
    const contactBtn = document.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    if (contactBtn) contactBtn.click();
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Wherever You Want To Go, <br className="hidden md:block" />
            <span className="text-[#1f73b7]">We&apos;ll Help You Get There.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Ready to start your next adventure? Get in touch with us today and let&apos;s craft the perfect itinerary for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleContactClick} className="bg-[#d32f2f] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-colors shadow-lg text-lg">
              Plan Your Trip
            </button>
            <a href="tel:8435067145" className="flex items-center justify-center gap-2 bg-white text-[#1f73b7] border-2 border-[#1f73b7] hover:bg-gray-50 font-bold py-4 px-8 rounded-full transition-colors shadow-lg text-lg">
              <FaPhoneAlt />
              Talk to a Travel Expert
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
