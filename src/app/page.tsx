"use client";
import { useEffect, useState, Suspense, lazy } from "react";
import HeroSection from "./components/HeroSection";
import QuickServices from "./components/QuickServices";
import PopularPackages from "./components/PopularPackages";
import SpiritualTours from "./components/SpiritualTours";
import WhyChooseUs from "./components/WhyChooseUs";
import FamilyCorporate from "./components/FamilyCorporate";
import WeekendGetaways from "./components/WeekendGetaways";
import HotelCarCombo from "./components/HotelCarCombo";
import Testimonials from "./components/Testimonials";
import GallerySection from "./components/GallerySection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import type { Company } from "@/lib/companyTypes";
import { DEFAULT_CAR_IMAGES, resolveFleetFolders } from "@/lib/fleetConfig";

const CarsGrid = lazy(() => import("./components/CarsGrid"));

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
      <div className="h-4 w-40 rounded bg-stone-200 animate-pulse" />
      <div className="mt-6 h-3 max-w-md rounded bg-stone-100 animate-pulse" />
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

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden bg-white">
      {/* 1. Hero Section with Search Box */}
      <HeroSection />

      {/* 2. Quick Services Nav Cards */}
      <QuickServices />

      {/* 3. Popular Tour Packages (Domestic & International) */}
      <PopularPackages />

      {/* 4. Spiritual Yatra Section */}
      <SpiritualTours />

      {/* 5. Car Rental / Our Fleet (Original Feature) */}
      <Suspense fallback={<SectionFallback label="Loading fleet…" />}>
        {company && cars.length > 0 && (
          <CarsGrid
            cars={cars}
            company={company}
            fleetSection={company.site?.fleet_section}
          />
        )}
      </Suspense>

      {/* 6. Why Choose Us (Simple Points) */}
      <WhyChooseUs />

      {/* 7. Family & Corporate Travel Blocks */}
      <FamilyCorporate />

      {/* 8. Weekend Getaways */}
      <WeekendGetaways />

      {/* 9. Hotel + Car Combo Conversion */}
      <HotelCarCombo />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. Gallery / Inspiration */}
      <GallerySection />

      {/* 12. Final CTA */}
      <FinalCTA />

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
