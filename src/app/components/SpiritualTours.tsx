"use client";
import RevealOnScroll from "./RevealOnScroll";

const spiritualPackages = [
  { dest: "Char Dham Yatra", duration: "11N/12D", img: "/service/chardham.jpg" },
  { dest: "Kedarnath", duration: "3N/4D", img: "/service/sprituial.jpg" },
  { dest: "Badrinath", duration: "3N/4D", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
  { dest: "Varanasi", duration: "2N/3D", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop" },
  { dest: "Ayodhya", duration: "2N/3D", img: "/service/tourpackage.jpg" },
  { dest: "Mathura-Vrindavan", duration: "2N/3D", img: "/service/family-trip.jpg" },
  { dest: "Ujjain", duration: "1N/2D", img: "/service/outing.jpg" },
  { dest: "Jyotirlinga Tours", duration: "Various", img: "/service/chardham.jpg" },
];

export default function SpiritualTours() {
  return (
    <section id="spiritual-tours" className="py-20 bg-[#fff8ec]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#d32f2f] font-bold tracking-widest text-xs uppercase mb-2 block">Divine Journeys</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Spiritual & Pilgrimage Tours</h2>
              <p className="text-gray-600">Experience peace and devotion with our specially curated Yatra packages. From the sacred Char Dham to the spiritual ghats of Varanasi.</p>
            </div>
            <button onClick={() => {
                const contactBtn = document.querySelector('a[href="#contact"]') as HTMLAnchorElement;
                if(contactBtn) contactBtn.click();
            }} className="shrink-0 bg-white border-2 border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-white font-bold py-2.5 px-6 rounded-full transition-colors">
              Book Now
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {spiritualPackages.map((pkg, idx) => (
              <div key={idx} className="group cursor-pointer rounded-none overflow-hidden relative shadow-sm hover:shadow-xl transition-shadow bg-white">
                <div className="relative h-40 md:h-56 w-full overflow-hidden">
                  <img 
                    src={pkg.img} 
                    alt={pkg.dest}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">{pkg.dest}</h3>
                  <p className="text-[#F5A623] text-xs font-semibold">{pkg.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

