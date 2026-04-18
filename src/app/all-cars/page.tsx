"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import type { Company } from "@/lib/companyTypes";
import { DEFAULT_CAR_IMAGES, resolveFleetFolders } from "@/lib/fleetConfig";

type CarGallery = {
  folder: string;
  title: string;
  images: string[];
};

const defaultWhatsapp = "8435067145";

export default function AllCarsGallery() {
  const [cars, setCars] = useState<CarGallery[]>([]);
  const [whatsapp, setWhatsapp] = useState(defaultWhatsapp);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const company = (await fetch("/data/data.json").then((r) => r.json())) as Company;
        if (cancelled) return;
        setWhatsapp(company?.contact?.whatsapp || defaultWhatsapp);
        const folders = resolveFleetFolders(company?.fleet?.folders);
        const loaded = await Promise.all(
          folders.map(async (folder) => {
            try {
              const res = await fetch(`/${folder}/data.json`);
              if (!res.ok) return null;
              const data = await res.json();
              let images: string[] = data.images || DEFAULT_CAR_IMAGES[folder] || [];
              if (folder === "innova Crysta 2019") {
                images = ["img.jpg", ...images.filter((img: string) => img !== "img.jpg")];
              }
              const title = typeof data.model === "string" && data.model.trim() ? data.model : folder;
              return { folder, title, images } as CarGallery;
            } catch {
              return null;
            }
          })
        );
        if (cancelled) return;
        setCars(loaded.filter((c): c is CarGallery => c !== null && c.images.length > 0));
      } catch {
        if (!cancelled) setCars([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/";
                }
              }
            }}
            className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-[var(--surface)] px-4 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
          >
            <FaArrowLeft aria-hidden />
            Back
          </button>
        </div>
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            Fleet gallery
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600 md:text-base">
            Browse full photo sets by model. WhatsApp us from any image to check availability.
          </p>
        </header>
        {cars.map((car) => (
          <section key={car.folder} id={car.folder} className="mb-16 scroll-mt-24">
            <h2 className="mb-6 border-b border-stone-200 pb-3 text-lg font-semibold text-stone-900 md:text-xl">
              {car.title}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {car.images.map((img, idx) => (
                <div
                  key={img}
                  className="group relative overflow-hidden rounded-xl border border-stone-200 bg-[var(--surface)] shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-100">
                    <Image
                      src={`/${car.folder}/${img}`}
                      alt={`${car.title} ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      {...(idx === 0 ? { priority: true } : { loading: "lazy" })}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 border-t border-stone-200/60 bg-white/85 backdrop-blur-sm" />
                    <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-md border border-white/30 bg-stone-900/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                      {car.title}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-teal-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-teal-900"
                  >
                    <FaWhatsapp aria-hidden />
                    Book
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
