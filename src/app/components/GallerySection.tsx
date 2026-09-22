"use client";
import RevealOnScroll from "./RevealOnScroll";

const galleryImages = [
  "/moments/1.jpg",
  "/moments/2.jpg",
  "/moments/3.jpg",
  "/moments/4.jpg",
  "/moments/5.jpg",
  "/moments/6.jpg",
];

export default function GallerySection() {
  return (
    <section className="pt-10 pb-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-[#1f73b7] font-bold tracking-widest text-xs uppercase mb-2 block">Travel Inspiration</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Capturing Moments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Glimpses of beautiful destinations across the world.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, idx) => (
              <div key={idx} className="relative h-48 md:h-64 rounded-none overflow-hidden group">
                <img 
                  src={src} 
                  alt={`Gallery Image ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

