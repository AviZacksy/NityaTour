"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import CarImageSlider from "./components/CarImageSlider";
import StickyContactButtons from "./components/StickyContactButtons";
import CarsGrid from "./components/CarsGrid";

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
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
}

// Utility to fetch company info
async function fetchCompanyInfo() {
  const res = await fetch("/data/data.json");
  return res.json();
}

// List of car folders (can be automated with an index.json in future)
const carFolders = [
  "Ertiga model 2024",
  "Hyundai aura model 2025",
  "Innova 7+1",
  "innova Crysta 2019",
  "Tavera Model 2014",
  "Tempo"
];

const carImages: Record<string, string[]> = {
  "Ertiga model 2024": [
    "WhatsApp Image 2025-06-24 at 15.07.25_430e5d48.jpg",
    "WhatsApp Image 2025-06-24 at 15.07.27_a217b9c5.jpg"
  ],
  "Hyundai aura model 2025": [
    "WhatsApp Image 2025-06-24 at 15.09.16_2e13421c.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.13_c8e54a77.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.16_4d49f737.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_8b7a1274.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.15_33f7d750.jpg",
    "WhatsApp Image 2025-06-24 at 15.09.14_4226d3d3.jpg"
  ],
  "Innova 7+1": [
    "WhatsApp Image 2025-06-24 at 14.56.14_d3113ba1.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.15_073c41f9.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.13_548bda35.jpg",
    "WhatsApp Image 2025-06-24 at 14.56.16_47da2324.jpg"
  ],
  "innova Crysta 2019": [
    "WhatsApp Image 2025-06-24 at 15.00.08_c5fa1fb6.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.07_edc740c8.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_89d13109.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.06_3b62cf8a.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.05_afea44f1.jpg",
    "WhatsApp Image 2025-06-24 at 15.00.04_a4f79e70.jpg"
  ],
  "Tavera Model 2014": [
    "WhatsApp Image 2025-06-24 at 15.02.20_03174d4f.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.24_c4158462.jpg",
    "WhatsApp Image 2025-06-24 at 15.02.21_d3cd18fe.jpg"
  ],
  "Tempo": [
    "WhatsApp Image 2025-06-24 at 14.53.29_b00b9700.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_e7228dc2.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_08cfcb37.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.31_040105aa.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.32_a9ad4ec3.jpg",
    "WhatsApp Image 2025-06-24 at 14.53.30_ecefb8ac.jpg"
  ]
};

// IMPORTANT: Make sure each car folder has 'data.json' (not '.json')
async function fetchAllCars() {
  const cars = await Promise.all(
    carFolders.map(async (folder) => {
      const url = `/${folder}/data.json`;
      console.log('Fetching:', url);
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Fetch failed:', url, res.status);
        return { error: true, folder, images: [] };
      }
      const data = await res.json();
      return { ...data, folder, images: carImages[folder] || [] };
    })
  );
  return cars;
}

export default function Home() {
  const [company, setCompany] = useState<Company | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCompanyInfo().then(setCompany);
    fetchAllCars().then((data) => {
      setCars(data);
      console.log('Fetched cars:', data);
    }).catch((err) => {
      console.error('Error fetching cars:', err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] text-gray-900 font-sans relative">
      <HeroSection />
      {company && <CarsGrid cars={cars} company={company} CarImageSlider={CarImageSlider} />}
      <WhyChooseUs />
      {company && <StickyContactButtons company={company} />}
      {/* All Cars, HowItWorks, Reviews, ContactFooter, StickyContactButtons components yahan import/use karen */}
    </div>
  );
}
