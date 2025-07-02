"use client";
import { FaShieldAlt, FaDollarSign, FaGlobe, FaClock, FaStar, FaCheckCircle } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-yellow-500 to-indigo-600 bg-clip-text text-transparent mb-10 text-center tracking-tight drop-shadow-lg">
      {children}
    </h2>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative w-full py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        <RevealOnScroll>
          <SectionHeading>Why Choose Us?</SectionHeading>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Features */}
          <div className="space-y-8">
            <RevealOnScroll>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
                <h3 className="text-3xl font-bold text-indigo-900 mb-6">
                  Our Core Strengths
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full">
                      <FaShieldAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-indigo-900 mb-2">Trusted Service</h4>
                      <p className="text-gray-700">10,000+ happy customers, verified drivers, and safe rides with complete transparency.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full">
                      <FaDollarSign className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-indigo-900 mb-2">Best Rates</h4>
                      <p className="text-gray-700">Transparent pricing, no hidden charges, best value guaranteed for every journey.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                      <FaGlobe className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-indigo-900 mb-2">All India Service</h4>
                      <p className="text-gray-700">Pan-India coverage, city & outstation, flexible routes for all your travel needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-full">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-indigo-900 mb-2">24x7 Support</h4>
                      <p className="text-gray-700">Always available for bookings, queries, and emergencies round the clock.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Customer Satisfaction */}
            <RevealOnScroll>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white">
                <h4 className="text-2xl font-bold mb-6">Customer Satisfaction</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10,000+</div>
                    <div className="text-sm opacity-90">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">4.9★</div>
                    <div className="text-sm opacity-90">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-90">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Safe Rides</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Benefits & Features */}
          <div className="space-y-8">
            <RevealOnScroll>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-100">
                <h4 className="text-2xl font-bold text-indigo-900 mb-6">What You Get</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Well-maintained vehicles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Professional drivers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Flexible booking options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">No cancellation charges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">GPS tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Insurance coverage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-700">Multiple payment options</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Service Highlights */}
            <RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-indigo-900 p-6 rounded-2xl">
                  <h5 className="font-bold mb-2">City Tours</h5>
                  <p className="text-sm opacity-90">Local sightseeing and city exploration</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl">
                  <h5 className="font-bold mb-2">Outstation</h5>
                  <p className="text-sm opacity-90">Long distance and interstate travel</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
                  <h5 className="font-bold mb-2">Airport Transfer</h5>
                  <p className="text-sm opacity-90">Reliable airport pickup and drop</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                  <h5 className="font-bold mb-2">Corporate</h5>
                  <p className="text-sm opacity-90">Business travel and corporate events</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Trust Indicators */}
            <RevealOnScroll>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-8 shadow-xl">
                <h4 className="text-2xl font-bold text-indigo-900 mb-6">Why Trust Us?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-indigo-900 text-xl" />
                    <span className="font-semibold text-indigo-900">Licensed and registered company</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-indigo-900 text-xl" />
                    <span className="font-semibold text-indigo-900">All vehicles are insured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-indigo-900 text-xl" />
                    <span className="font-semibold text-indigo-900">Background verified drivers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-indigo-900 text-xl" />
                    <span className="font-semibold text-indigo-900">Real-time tracking available</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
} 