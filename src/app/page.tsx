"use client";
import { useEffect, useState, Suspense, lazy } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import HeroSection from "./components/HeroSection";
import CarImageSlider from "./components/CarImageSlider";
import HotelSection from "./components/HotelSection";
import type { Company } from "@/lib/companyTypes";
import { DEFAULT_CAR_IMAGES, resolveFleetFolders } from "@/lib/fleetConfig";

const CarsGrid = lazy(() => import("./components/CarsGrid"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));

interface Car {
  images: string[];
  folder: string;
  model: string;
  year?: string;
  seating?: string;
  fuel?: string;
  rate?: {
    ac?: number;
    non_ac?: number;
  };
  per_day_charge?: number;
}

async function fetchCompanyInfo(): Promise<Company> {
  const res = await fetch("/data/data.json");
  return res.json() as Promise<Company>;
}

async function fetchAllCars(folders: string[]): Promise<Car[]> {
  const cars = await Promise.all(
    folders.map(async (folder) => {
      const url = `/${folder}/data.json`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Fetch failed:", url, res.status);
        return null;
      }
      const data = await res.json();
      let images = data.images || DEFAULT_CAR_IMAGES[folder] || [];
      if (folder === "innova Crysta 2019") {
        images = ["img.jpg", ...images.filter((img: string) => img !== "img.jpg")];
      }
      return { ...data, folder, images };
    })
  );
  return cars.filter((c): c is Car => c !== null);
}

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="h-4 w-40 rounded bg-stone-200" />
      <div className="mt-6 h-3 max-w-md rounded bg-stone-100" />
      <p className="mt-4 text-sm text-stone-500">{label}</p>
    </div>
  );
}

export default function Home() {
  const [company, setCompany] = useState<Company | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCompanyInfo()
      .then(setCompany)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!company) return;
    const folders = resolveFleetFolders(company.fleet?.folders);
    fetchAllCars(folders)
      .then(setCars)
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
  }, [company]);

  const footerKicker = company?.site?.footer?.kicker || "Contact";
  const footerBody =
    company?.site?.footer?.body ||
    "Prefer a quick reply? Use the WhatsApp or Call buttons on screen—we will confirm vehicle, route, and fare clearly before you travel.";

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      <HeroSection company={company} />
      <Suspense fallback={<SectionFallback label="Loading fleet…" />}>
        {company && (
          <CarsGrid
            cars={cars}
            company={company}
            fleetSection={company.site?.fleet_section}
            CarImageSlider={CarImageSlider}
          />
        )}
      </Suspense>
      <HotelSection copy={company?.site?.hotel_section} />
      <Suspense fallback={<SectionFallback label="Loading…" />}>
        <WhyChooseUs site={company?.site} />
      </Suspense>

      <footer id="contact" className="bg-[#111111] text-stone-300 py-20 lg:py-24 border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Nitya Tour <span className="text-[#F5A623]">&</span> Travels</h3>
              <p className="text-sm leading-relaxed text-stone-400 mb-6">
                Your trusted travel partner in Indore. We provide premium cab services, outstation trips, and comfortable hotel stays with a focus on safety and transparency.
              </p>
              <div className="flex gap-4">
                <a href={`https://wa.me/${company?.contact?.whatsapp || "8435067145"}`} className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-[#F5A623] hover:text-white transition-all">
                  <FaWhatsapp size={18} />
                </a>
                <a href={`tel:${company?.contact?.phone || "8435067145"}`} className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-[#F5A623] hover:text-white transition-all">
                  <FaPhone size={16} />
                </a>
                <a href={`mailto:${company?.contact?.email || "mynityatravels@gmail.com"}`} className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-[#F5A623] hover:text-white transition-all">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#F5A623] transition-colors">Home</a></li>
                <li><a href="#our-cars" className="hover:text-[#F5A623] transition-colors">Our Fleet</a></li>
                <li><a href="#hotel-nitya" className="hover:text-[#F5A623] transition-colors">Hotel & Stay</a></li>
                <li><a href="#why-choose-us" className="hover:text-[#F5A623] transition-colors">Why Choose Us</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Our Services</h4>
              <ul className="space-y-4 text-sm font-medium text-stone-400">
                <li>Local City Rides</li>
                <li>Outstation Trips</li>
                <li>Airport Transfers</li>
                <li>Corporate Travel</li>
                <li>Hotel Booking</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <FaPhone className="text-[#F5A623] mt-1 shrink-0" size={14} />
                  <div>
                    <span className="block text-white font-medium">{company?.contact?.phone || "8435067145"}</span>
                    {company?.contact?.phone_alt && <span className="block mt-1 text-stone-400">{company.contact.phone_alt}</span>}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaWhatsapp className="text-[#F5A623] mt-1 shrink-0" size={14} />
                  <span className="text-stone-300">{company?.contact?.whatsapp || "8435067145"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="text-[#F5A623] mt-1 shrink-0" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span className="text-stone-300 leading-relaxed">
                    {company?.location || "Indore, Madhya Pradesh"}
                  </span>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium tracking-wide text-stone-500">
              &copy; {new Date().getFullYear()} Nitya Tour & Travels. All rights reserved.
            </p>
            <p className="text-xs font-medium tracking-wide text-stone-500 flex items-center gap-1.5">
              Designed with <span className="text-[#F5A623]">♥</span> for premium travel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
