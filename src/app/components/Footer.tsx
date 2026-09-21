"use client";
import { FaPhone, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaClock, FaLinkedinIn, FaPinterestP, FaVimeoV, FaDribbble, FaChevronUp } from "react-icons/fa";
import { usePublicCompany } from "@/lib/usePublicCompany";
import Image from "next/image";

export default function Footer() {
  const company = usePublicCompany();
  
  const phone = company?.contact?.phone || "+91-9968488791";
  const address = company?.location || "184 Main Street West Victoria 8007";

  const galleryImages = [
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=200&auto=format&fit=crop",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#222222] text-[#cccccc] font-sans">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <img src="/logo/logo1.png" alt="Nitya Tour" className="h-14 w-auto drop-shadow-sm bg-white rounded-none p-1" />
            </div>
            
            <p className="text-[14px] leading-[26px] mb-6 pr-4">
              Nullam ac justo efficitur, tristique ligula. Lorem Ipsn gravida nibh vel velit auctor aliquet. Aenean sollicitudin.
            </p>
            
            <ul className="space-y-4 text-[14px]">
              <li className="flex items-center gap-3">
                <FaPhone className="text-white shrink-0" size={14} />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-white shrink-0" size={14} />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-white shrink-0" size={14} />
                <span>Mon - Sat 8.00 - 18.00 Sunday CLOSED</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Latest News (or Services) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8">Latest News</h4>
            <p className="text-[14px]">No posts were found.</p>
          </div>

          {/* Column 3: Gallery */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8">Gallery</h4>
            <div className="grid grid-cols-3 gap-1">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-square">
                  <Image 
                    src={src} 
                    alt={`Gallery ${idx + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8">Follow Us</h4>
            <p className="text-[14px]">Couldn&apos;t connect with Twitter</p>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-[#333333] relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[#cccccc]">
            &copy; 2026 Nitya Tour, All Rights Reserved
          </p>
          
          <div className="flex items-center gap-5 text-white pr-16 md:pr-0">
            <a href="#" className="hover:text-gray-400 transition-colors"><FaTwitter size={14} /></a>
            <a href="#" className="hover:text-gray-400 transition-colors"><FaFacebookF size={14} /></a>
            <a href="#" className="hover:text-gray-400 transition-colors"><FaLinkedinIn size={14} /></a>
            <a href="#" className="hover:text-gray-400 transition-colors"><FaPinterestP size={14} /></a>
            <a href="#" className="hover:text-gray-400 transition-colors"><FaVimeoV size={14} /></a>
            <a href="#" className="hover:text-gray-400 transition-colors"><FaDribbble size={14} /></a>
          </div>
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
