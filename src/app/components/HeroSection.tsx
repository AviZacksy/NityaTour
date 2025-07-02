"use client";
import { useEffect, useState } from "react";
import { FaShieldAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaStar } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";

interface Company {
  company_name: string;
  location: string;
  service_area: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
}

export default function HeroSection() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setCompany(data as Company));
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Hero Content */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 font-bold px-6 py-2 rounded-full mb-6 shadow-lg animate-bounce">
              <FaStar className="inline mr-2" />
          Trusted by 10,000+ Customers
        </span>
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-yellow-500 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
              {company?.company_name || "Nitya Tour & Travels"}
        </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 animate-fade-in-up delay-100">
              Premium Car Rental Services
            </p>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in-up delay-200">
              Experience luxury and comfort with our well-maintained fleet
            </p>
          </div>
        </RevealOnScroll>

        {/* Company Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Details & Contact */}
          <RevealOnScroll>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
                <h3 className="text-3xl font-bold text-indigo-900 mb-6">
                  About Our Company
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaMapMarkerAlt className="text-yellow-500 text-xl" />
                    <span className="font-semibold">{company?.location || "Indore, Madhya Pradesh"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaShieldAlt className="text-yellow-500 text-xl" />
                    <span className="font-semibold">Service Area: {company?.service_area || "All India"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaClock className="text-yellow-500 text-xl" />
                    <span className="font-semibold">24/7 Service Available</span>
                  </div>
                </div>
              </div>
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-8 shadow-xl">
                <h4 className="text-2xl font-bold text-indigo-900 mb-6">Get In Touch</h4>
                <div className="space-y-4">
                  <a 
                    href={`tel:${company?.contact?.phone || "8269058399"}`}
                    className="flex items-center gap-3 text-indigo-900 hover:text-white transition-colors"
                  >
                    <FaPhone className="text-xl" />
                    <span className="font-semibold">{company?.contact?.phone || "8269058399"}</span>
                  </a>
                  <a 
                    href={`mailto:${company?.contact?.email || "mynityatravels@gmail.com"}`}
                    className="flex items-center gap-3 text-indigo-900 hover:text-white transition-colors"
                  >
                    <FaEnvelope className="text-xl" />
                    <span className="font-semibold">{company?.contact?.email || "mynityatravels@gmail.com"}</span>
                  </a>
                  {company?.social_media?.instagram && (
                    <a 
                      href={company.social_media.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-indigo-900 hover:text-white transition-colors"
                    >
                      <FaInstagram className="text-xl" />
                      <span className="font-semibold">Follow us on Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </RevealOnScroll>
          {/* Mission & Values */}
          <RevealOnScroll>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
                <h4 className="text-2xl font-bold text-indigo-900 mb-6">Our Mission</h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  To provide exceptional car rental services with the highest standards of safety, 
                  comfort, and reliability. We strive to make every journey memorable by offering 
                  well-maintained vehicles and professional service to our valued customers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-2xl">
                    <h5 className="font-bold mb-2">Safety First</h5>
                    <p className="text-sm opacity-90">All vehicles undergo regular safety checks</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-indigo-900 p-4 rounded-2xl">
                    <h5 className="font-bold mb-2">Best Rates</h5>
                    <p className="text-sm opacity-90">Competitive pricing with no hidden charges</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl">
                    <h5 className="font-bold mb-2">24/7 Support</h5>
                    <p className="text-sm opacity-90">Round the clock customer assistance</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-2xl">
                    <h5 className="font-bold mb-2">Wide Selection</h5>
                    <p className="text-sm opacity-90">Diverse fleet to meet all your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* CTA Button */}
        <RevealOnScroll>
          <div className="text-center">
        <a
          href="#our-cars"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 font-bold px-12 py-6 rounded-full shadow-xl text-xl md:text-2xl hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 animate-pulse"
        >
              Book Your Ride Now
        </a>
      </div>
        </RevealOnScroll>
      </div>
    </section>
  );
} 