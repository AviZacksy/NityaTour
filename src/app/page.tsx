"use client";
import { useEffect, useState, Suspense, lazy } from "react";
import HeroSection from "./components/HeroSection";
import CarImageSlider from "./components/CarImageSlider";
import StickyContactButtons from "./components/StickyContactButtons";
import HotelSection from "./components/HotelSection";

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

interface Company {
  company_name: string;
  location: string;
  service_area: string;
  contact: {
    phone: string;
    whatsapp: string;
    phone_alt?: string;
    whatsapp_alt?: string;
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
}

async function fetchCompanyInfo() {
  const res = await fetch("/data/data.json");
  return res.json();
}

const carFolders = [
  "Ertiga model 2024",
  "Hyundai aura model 2025",
  "Innova-7plus1",
  "innova Crysta 2019",
  "Tavera Model 2014",
  "Tempo",
];

const carImages: Record<string, string[]> = {
  "Ertiga model 2024": [
    "WhatsApp Image 2025-06-24 at 15.07.25_430e5d48.jpg",
    "WhatsApp Image 2025-06-24 at 15.07.27_a217b9c5.jpg",
  ],
  "Hyundai aura model 2025": [
    "WhatsApp Image 2025-06-24 at 15.09.16_2e13421c.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.13_c8e54a77.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.16_4d49f737.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_8b7a1274.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_33f7d750.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.14_4226d3d3.jpg",
  ],
  "Innova-7plus1": [
    "travel-agents.png",
    "WhatsApp Image 2025-06-24 at 14.56.14_d3113ba1.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.15_073c41f9.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.16_47da2324.jpg",
  ],
  "innova Crysta 2019": [
    "WhatsApp Image 2025-06-24 at 15.00.08_c5fa1fb6.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.07_edc740c8.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_89d13109.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.06_3b62cf8a.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.05_afea44f1.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_a4f79e70.jpg",
  ],
  "Tavera Model 2014": [
    "WhatsApp Image 2025-06-24 at 15.02.20_03174d4f.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.24_c4158462.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.21_d3cd18fe.jpg",
  ],
  "Tempo": [
    "WhatsApp Image 2025-06-24 at 14.53.29_b00b9700.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_e7228dc2.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_08cfcb37.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.31_040105aa.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_a9ad4ec3.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_ecefb8ac.jpg",
  ],
};

async function fetchAllCars() {
  const cars = await Promise.all(
    carFolders.map(async (folder) => {
      const url = `/${folder}/data.json`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Fetch failed:", url, res.status);
        return { error: true, folder, images: [] };
      }
      const data = await res.json();
      let images = data.images || carImages[folder] || [];
      if (folder === "innova Crysta 2019") {
        images = ["img.jpg", ...images.filter((img: string) => img !== "img.jpg")];
      }
      return { ...data, folder, images };
    })
  );
  return cars;
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
    fetchCompanyInfo().then(setCompany);
    fetchAllCars()
      .then(setCars)
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      <HeroSection />
      <Suspense fallback={<SectionFallback label="Loading fleet…" />}>
        {company && <CarsGrid cars={cars} company={company} CarImageSlider={CarImageSlider} />}
      </Suspense>
      <HotelSection />
      <Suspense fallback={<SectionFallback label="Loading…" />}>
        <WhyChooseUs />
      </Suspense>

      <footer
        id="contact"
        className="border-t border-stone-200/80 bg-[var(--surface)] py-12 text-center"
      >
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Contact</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Prefer a quick reply? Use the{" "}
            <span className="font-medium text-stone-800">WhatsApp</span> or{" "}
            <span className="font-medium text-stone-800">Call</span> buttons on screen—we will
            confirm vehicle, route, and fare clearly before you travel.
          </p>
        </div>
      </footer>

      {company && <StickyContactButtons company={company} />}
    </div>
  );
}
