"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";

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

const pillars = [
  { title: "Safety first", body: "Regular checks and verified drivers." },
  { title: "Clear pricing", body: "Straightforward rates, no surprises." },
  { title: "All‑India reach", body: "City rides, outstation, and tours." },
  { title: "Support", body: "Help when you need it, day or night." },
];

export default function HeroSection() {
  const [company, setCompany] = useState<Company | null>(null);

  const formatPhoneDisplay = (value?: string) => {
    if (!value) return "";
    const digits = value.replace(/\s+/g, "");
    const m = digits.match(/^(\d{5})(\d{5})$/);
    return m ? `${m[1]} ${m[2]}` : value;
  };

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setCompany(data as Company));
  }, []);

  return (
    <section className="relative w-full border-b border-stone-200/80 bg-[var(--surface)] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealOnScroll>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Indore · Cab · Tours · Hotels
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
                {company?.company_name || "Nitya Tour & Travels"}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
                Reliable cars and tour planning from Indore—local trips, outstation, and packages
                with a calm, professional team.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
                Travel agency in Indore: car rental, taxi, tour packages, and hotel support—serving
                customers across India with well‑maintained vehicles.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#our-cars"
                  className="inline-flex items-center justify-center rounded-md bg-stone-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
                >
                  View fleet
                </a>
                <a
                  href={`https://wa.me/${company?.contact?.whatsapp || "8435067145"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-transparent px-5 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-stone-200 bg-[var(--page-bg)] p-8">
                <Image
                  src="/logo/logo.png"
                  alt="Nitya Tour & Travels logo"
                  width={160}
                  height={160}
                  className="opacity-95"
                />
                <p className="mt-4 text-center text-sm text-stone-500">
                  Serving Indore and pan‑India travel with care and consistency.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <RevealOnScroll>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                At a glance
              </h2>
              <ul className="mt-5 space-y-4 text-stone-700">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0 text-teal-700" aria-hidden />
                  <span>{company?.location || "Indore, Madhya Pradesh"}</span>
                </li>
                <li className="flex gap-3">
                  <FaShieldAlt className="mt-0.5 shrink-0 text-teal-700" aria-hidden />
                  <span>Service area: {company?.service_area || "All India"}</span>
                </li>
                <li className="flex gap-3">
                  <FaClock className="mt-0.5 shrink-0 text-teal-700" aria-hidden />
                  <span>Bookings & assistance when you need them</span>
                </li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                Contact
              </h2>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`tel:${company?.contact?.phone || "8435067145"}`}
                  className="flex items-center gap-3 rounded-md py-1 text-stone-800 transition-colors hover:text-teal-800"
                >
                  <FaPhone className="text-stone-400" aria-hidden />
                  <span className="font-medium">
                    {formatPhoneDisplay(company?.contact?.phone || "8435067145")}
                    {(company?.contact?.phone_alt || "8269058399") && (
                      <>
                        {" "}
                        / {formatPhoneDisplay(company?.contact?.phone_alt || "8269058399")}
                      </>
                    )}
                  </span>
                </a>
                <a
                  href={`mailto:${company?.contact?.email || "mynityatravels@gmail.com"}`}
                  className="flex items-center gap-3 rounded-md py-1 text-stone-800 transition-colors hover:text-teal-800"
                >
                  <FaEnvelope className="text-stone-400" aria-hidden />
                  <span className="break-all font-medium">
                    {company?.contact?.email || "mynityatravels@gmail.com"}
                  </span>
                </a>
                {company?.social_media?.instagram && (
                  <a
                    href={company.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-md py-1 text-stone-800 transition-colors hover:text-teal-800"
                  >
                    <FaInstagram className="text-stone-400" aria-hidden />
                    <span className="font-medium">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                How we work
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                We focus on punctual pickups, clean vehicles, and courteous drivers—whether you need
                a day in the city or a longer itinerary.
              </p>
              <ul className="mt-5 space-y-3">
                {pillars.map((p) => (
                  <li key={p.title} className="border-t border-stone-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium text-stone-900">{p.title}</p>
                    <p className="mt-1 text-sm text-stone-600">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
