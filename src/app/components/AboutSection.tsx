"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { FaShieldAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";

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

interface AboutSectionProps {
  company?: Company;
}

export default function AboutSection({ company }: AboutSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading>About Us</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
              <h3 className="text-3xl font-bold text-indigo-900 mb-6">
                {company?.company_name || "Nitya Tour & Travels"}
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

          {/* Mission & Values */}
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

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white">
              <h4 className="text-2xl font-bold mb-6">Why Choose Us?</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-400 text-indigo-900 p-2 rounded-full">
                    <FaShieldAlt className="text-lg" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Trusted Service</h5>
                    <p className="text-sm opacity-90">10,000+ satisfied customers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-400 text-indigo-900 p-2 rounded-full">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Flexible Booking</h5>
                    <p className="text-sm opacity-90">Easy online booking and instant confirmation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-400 text-indigo-900 p-2 rounded-full">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Pan India Service</h5>
                    <p className="text-sm opacity-90">Available across all major cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 