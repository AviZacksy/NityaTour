"use client";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-white to-yellow-600 bg-clip-text text-transparent mb-10 text-center tracking-tight drop-shadow-lg">
      {children}
    </h2>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-20 flex items-center justify-center overflow-hidden bg-black/90">
      {/* Gold gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-700/10 to-black/80" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <SectionHeading>Why Choose Us?</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/30 backdrop-blur-xl border border-yellow-200 rounded-3xl p-8 shadow-2xl flex flex-col items-center hover:scale-105 hover:shadow-yellow-200 transition-all duration-300">
            <span className="text-5xl mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow">★</span>
            <h3 className="font-extrabold text-xl mb-2 text-indigo-900">Trusted Service</h3>
            <p className="text-gray-800 text-base font-medium">1000+ happy customers, verified drivers, and safe rides.</p>
          </div>
          <div className="bg-white/30 backdrop-blur-xl border border-yellow-200 rounded-3xl p-8 shadow-2xl flex flex-col items-center hover:scale-105 hover:shadow-yellow-200 transition-all duration-300">
            <span className="text-5xl mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow">₹</span>
            <h3 className="font-extrabold text-xl mb-2 text-indigo-900">Best Rates</h3>
            <p className="text-gray-800 text-base font-medium">Transparent pricing, no hidden charges, best value guaranteed.</p>
          </div>
          <div className="bg-white/30 backdrop-blur-xl border border-yellow-200 rounded-3xl p-8 shadow-2xl flex flex-col items-center hover:scale-105 hover:shadow-yellow-200 transition-all duration-300">
            <span className="text-5xl mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow">🌏</span>
            <h3 className="font-extrabold text-xl mb-2 text-indigo-900">All India Service</h3>
            <p className="text-gray-800 text-base font-medium">Pan-India coverage, city & outstation, flexible routes.</p>
          </div>
          <div className="bg-white/30 backdrop-blur-xl border border-yellow-200 rounded-3xl p-8 shadow-2xl flex flex-col items-center hover:scale-105 hover:shadow-yellow-200 transition-all duration-300">
            <span className="text-5xl mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow">⏰</span>
            <h3 className="font-extrabold text-xl mb-2 text-indigo-900">24x7 Support</h3>
            <p className="text-gray-800 text-base font-medium">Always available for bookings, queries, and emergencies.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 