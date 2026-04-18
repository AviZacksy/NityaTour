"use client";
import { useEffect, useState, Suspense, lazy } from "react";
import HeroSection from "./components/HeroSection";
import CarImageSlider from "./components/CarImageSlider";
import StickyContactButtons from "./components/StickyContactButtons";
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
    <div className="relative min-h-screen font-sans">
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

      <footer
        id="contact"
        className="border-t border-stone-200/80 bg-[var(--surface)] py-12 text-center"
      >
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">{footerKicker}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{footerBody}</p>
        </div>
      </footer>

      {company && <StickyContactButtons company={company} />}
    </div>
  );
}
