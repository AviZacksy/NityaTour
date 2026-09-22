"use client";
import { FaPhone, FaMapMarkerAlt, FaClock, FaChevronUp } from "react-icons/fa";
import { usePublicCompany } from "@/lib/usePublicCompany";
import Image from "next/image";

export default function Footer() {
  const company = usePublicCompany();
  
  const phone = company?.contact?.phone || "+91-9968488791";
  const phoneAlt = company?.contact?.phone_alt;
  const phoneThird = company?.contact?.phone_third;
  const displayPhone = [phone, phoneAlt, phoneThird].filter(Boolean).join(" / ");
  const address = company?.location || "184 Main Street West Victoria 8007";

  const galleryImages = [
    "/Divine/ujjain.jpg",
    "/Divine/vanarasi.jpg",
    "/service/corporate.jpg",
    "/service/family-trip.jpg",
    "/Divine/Ayodhya.jpg",
    "/Divine/chardham.jpg",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#222222] text-[#cccccc] font-sans">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Column 1: About Summary */}
          <div className="space-y-6 lg:col-span-4 lg:pr-8">
            <div className="mb-6">
              <img src="/logo/logo2.png" alt="Nitya Tour" className="h-14 w-auto drop-shadow-sm bg-white rounded-none p-1" />
            </div>
            
            <p className="text-[14px] leading-[26px]">
              Nitya Tours & Travels is Indore&apos;s premier travel agency. We offer a comprehensive range of services including well-maintained car rentals, taxi services, hotel bookings, and customized tour packages for family holidays, corporate travel, and spiritual yatras across India. Your comfort and safety are our top priorities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#" className="hover:text-[#f5a623] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#f5a623] transition-colors">About Us</a></li>
              <li><a href="#our-cars" className="hover:text-[#f5a623] transition-colors">Fleet & Cars</a></li>
              <li><a href="#spiritual-tours" className="hover:text-[#f5a623] transition-colors">Spiritual Tours</a></li>
              <li><a href="#family-corporate" className="hover:text-[#f5a623] transition-colors">Tour Packages</a></li>
              <li><a href="#contact" className="hover:text-[#f5a623] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Our Services</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#our-cars" className="hover:text-[#f5a623] transition-colors">Car Rental / Taxi</a></li>
              <li><a href="#our-cars" className="hover:text-[#f5a623] transition-colors">Outstation Cabs</a></li>
              <li><a href="#family-corporate" className="hover:text-[#f5a623] transition-colors">Local Sightseeing</a></li>
              <li><a href="#family-corporate" className="hover:text-[#f5a623] transition-colors">Hotel Bookings</a></li>
              <li><a href="#spiritual-tours" className="hover:text-[#f5a623] transition-colors">Spiritual Yatras</a></li>
              <li><a href="#contact" className="hover:text-[#f5a623] transition-colors">24/7 Support</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-[14px]">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-white shrink-0 mt-1" size={14} />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-white shrink-0 mt-1" size={14} />
                <span className="leading-relaxed">{displayPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-white shrink-0 mt-1" size={14} />
                <span>Mon - Sat 8.00 - 18.00<br/>Sunday CLOSED</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Gallery */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-square">
                  <Image 
                    src={src} 
                    alt={`Gallery ${idx + 1}`} 
                    fill 
                    className="object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-[#333333] relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[#cccccc]">
            &copy; 2026 Nitya Tours and Travels, All Rights Reserved
          </p>
        </div>

        {/* Scroll to top button (Voyage style) */}
        <button 
          onClick={scrollToTop}
          className="absolute right-0 bottom-0 w-12 h-12 bg-[#333333] hover:bg-[#444444] text-white flex flex-col items-center justify-center transition-colors"
        >
          <FaChevronUp size={12} className="mb-0.5" />
          <span className="text-[10px] font-bold">TOP</span>
        </button>
      </div>
    </footer>
  );
}
