"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import ContactModal from "./ContactModal";
import { usePublicCompany } from "@/lib/usePublicCompany";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaTripadvisor,
  FaChevronDown
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showContact, setShowContact] = useState(false);
  const company = usePublicCompany();
  const brand = useMemo(
    () => company?.site?.navbar_brand?.trim() || company?.company_name || "Nitya Tour & Travels",
    [company]
  );

  const phone = company?.contact?.phone || company?.contact_numbers?.[0] || "+91-9968488791";
  const email = company?.contact?.email || company?.contact_email || "info@nityatour.com";
  const whatsapp = company?.contact?.whatsapp || company?.contact_whatsapp || "+91-9958221107";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
    contact?: boolean
  ) => {
    if (contact) {
      e.preventDefault();
      setShowContact(true);
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = href;
        }
      }
    }
  };

  return (
    <>
      <header className="hidden md:block w-full sticky top-0 z-50 shadow-sm bg-white">
        {/* Top Contact Bar (Blue) */}
        <div className="bg-[#1f73b7] py-2">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 lg:px-8 text-[13px] text-white">
            {/* Left side: Phones */}
            <div className="flex items-center gap-6">
              <a
                href={`https://api.whatsapp.com/send?phone=${whatsapp.replace(/[^0-9]/g, "")}&text=Hi`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <FaWhatsapp className="text-base" />
                <span>{whatsapp}</span>
              </a>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-sm" />
                <span>{phone}</span>
              </div>
            </div>

            {/* Middle: Emails */}
            <div className="flex items-center gap-6 hidden lg:flex">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-sm" />
                <a href={`mailto:${email}`} className="hover:opacity-80 transition-opacity">
                  {email}
                </a>
              </div>
            </div>

            {/* Right side: Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity"><FaFacebookF /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaLinkedinIn /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaTripadvisor /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaTwitter /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Bottom Logo & Navigation Bar */}
        <div className="border-b border-gray-100">
          <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-4 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 shrink-0">
              <Image src="/logo/logo1.png" alt={brand} width={180} height={70} className="object-contain max-h-[60px] w-auto" priority />
            </Link>

            {/* Navigation Menu */}
            <nav className="h-full">
              <ul className="flex items-center h-full gap-4 lg:gap-6">
                {/* Home */}
                <li className="h-full flex items-center relative group">
                  <Link href="/" className={`text-[14.5px] font-medium tracking-wide transition-colors duration-200 py-2 ${pathname === "/" ? "text-black" : "text-gray-700 hover:text-black"}`}>Home</Link>
                </li>

                {/* Tours & Packages Dropdown */}
                <li className="h-full flex items-center relative group">
                  <Link href="#tour-packages" onClick={(e) => handleNavClick(e, "#tour-packages")} className="flex items-center gap-1 text-[14.5px] font-medium tracking-wide text-gray-700 hover:text-black transition-colors duration-200 py-2">
                    Tours & Packages <FaChevronDown className="text-[10px]" />
                  </Link>
                  <div className="absolute top-[80px] left-0 w-48 bg-white shadow-lg border border-gray-100 rounded-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <ul className="py-2">
                      <li><Link href="#domestic" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Domestic Tours</Link></li>
                      <li><Link href="#international" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">International Tours</Link></li>
                      <li><Link href="#family" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Family Trips</Link></li>
                      <li><Link href="#weekend" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Weekend Getaways</Link></li>
                      <li><Link href="#group" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Group Tours</Link></li>
                    </ul>
                  </div>
                </li>

                {/* Hotels */}
                <li className="h-full flex items-center relative group">
                  <Link href="#hotel-nitya" onClick={(e) => handleNavClick(e, "#hotel-nitya")} className="text-[14.5px] font-medium tracking-wide transition-colors duration-200 py-2 text-gray-700 hover:text-black">Hotels</Link>
                </li>

                {/* Car Rental */}
                <li className="h-full flex items-center relative group">
                  <Link href="#our-cars" onClick={(e) => handleNavClick(e, "#our-cars")} className="text-[14.5px] font-medium tracking-wide transition-colors duration-200 py-2 text-gray-700 hover:text-black">Car Rental</Link>
                </li>

                {/* Spiritual Tours Dropdown */}
                <li className="h-full flex items-center relative group">
                  <Link href="#spiritual-tours" onClick={(e) => handleNavClick(e, "#spiritual-tours")} className="flex items-center gap-1 text-[14.5px] font-medium tracking-wide text-gray-700 hover:text-black transition-colors duration-200 py-2">
                    Spiritual Tours <FaChevronDown className="text-[10px]" />
                  </Link>
                  <div className="absolute top-[80px] left-0 w-48 bg-white shadow-lg border border-gray-100 rounded-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <ul className="py-2">
                      <li><Link href="#chardham" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Char Dham</Link></li>
                      <li><Link href="#jyotirlinga" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Jyotirlinga</Link></li>
                      <li><Link href="#temple" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Temple Tours</Link></li>
                      <li><Link href="#ayodhya" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Ayodhya</Link></li>
                      <li><Link href="#varanasi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Varanasi</Link></li>
                      <li><Link href="#other-yatras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1f73b7]">Other Yatras</Link></li>
                    </ul>
                  </div>
                </li>

                {/* Corporate */}
                <li className="h-full flex items-center relative group">
                  <Link href="#corporate" onClick={(e) => handleNavClick(e, "#corporate")} className="text-[14.5px] font-medium tracking-wide transition-colors duration-200 py-2 text-gray-700 hover:text-black">Corporate</Link>
                </li>

                {/* Contact Us */}
                <li className="h-full flex items-center relative group">
                  <Link href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="text-[14.5px] font-medium tracking-wide transition-colors duration-200 py-2 text-gray-700 hover:text-black">Contact Us</Link>
                </li>
                
                {/* Book Now Button */}
                <li className="h-full flex items-center relative ml-2">
                   <button onClick={(e) => handleNavClick(e, "#contact", true)} className="flex items-center gap-2 bg-[#d32f2f] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors shadow-md">
                     <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                     Book Now
                   </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}

