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
import type { Company } from "@/lib/companyTypes";




const defaultPillars = [
  { title: "Safety first", body: "Regular checks and verified drivers." },
  { title: "Clear pricing", body: "Straightforward rates, no surprises." },
  { title: "All‑India reach", body: "City rides, outstation, and tours." },
  { title: "Support", body: "Help when you need it, day or night." },
];

type Props = {
  company?: Company | null;
};

export default function HeroSection({ company: companyProp }: Props) {
  const [fetched, setFetched] = useState<Company | null>(null);
  const company = companyProp !== undefined ? companyProp : fetched;

  const formatPhoneDisplay = (value?: string) => {
    if (!value) return "";
    const digits = value.replace(/\s+/g, "");
    const m = digits.match(/^(\d{5})(\d{5})$/);
    return m ? `${m[1]} ${m[2]}` : value;
  };

  useEffect(() => {
    if (companyProp !== undefined) return;
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setFetched(data as Company));
  }, [companyProp]);

  const hc = company?.site?.hero_cards;
  const lines = hc?.at_a_glance_lines ?? [];
  const glanceLine1 =
    lines[0]?.trim() || company?.location || "Indore, Madhya Pradesh";
  const glanceLine2 =
    lines[1]?.trim() ||
    (company?.service_area
      ? `Service area: ${company.service_area}`
      : "Service area: All India");
  const glanceLine3 =
    lines[2]?.trim() || "Bookings & assistance when you need them";

  const pillars = hc?.pillars?.length ? hc.pillars : defaultPillars;

  return (
    <section className={`relative w-full `}>
      {/* Stunning Background Image */}
      <div className="absolute inset-0 w-full h-[120%] lg:h-[110%] min-h-[800px] z-0 overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2000&auto=format&fit=crop"
          alt="Majestic Travel Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-24 md:pb-48 lg:pt-40 lg:pb-56">
        <RevealOnScroll>
          <div className="max-w-3xl text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              {company?.hero?.kicker || "Indore · Cab · Tours · Hotels"}
            </span>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-bold tracking-tight mb-6 drop-shadow-lg`}
            >
              {company?.hero?.headline || company?.company_name || "Nitya Tour & Travels"}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-white/90 drop-shadow-md mb-8">
              {company?.hero?.lead ||
                "Reliable cars and tour planning from Indore—local trips, outstation, and packages with a calm, professional team."}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={company?.hero?.primary_cta?.href || "#our-cars"}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-gray-100 hover:scale-105 shadow-xl"
              >
                {company?.hero?.primary_cta?.label || "Explore Our Fleet"}
              </a>
              <a
                href={
                  company?.hero?.secondary_cta?.href?.trim()
                    ? company.hero.secondary_cta.href
                    : `https://wa.me/${company?.contact?.whatsapp || "8435067145"}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-black/30 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white shadow-xl"
              >
                {company?.hero?.secondary_cta?.label || "WhatsApp Us"}
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Floating Cards overlapping the image on desktop, stacked on mobile */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 mt-8 md:-mt-32 lg:-mt-40 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealOnScroll>
            <div className="h-full rounded-2xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl border border-white/20 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white">
                  <FaMapMarkerAlt size={16} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1c1c1c]">
                  {hc?.at_a_glance_title || "At a glance"}
                </h2>
              </div>
              <ul className="space-y-4 text-gray-700 font-medium">
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                  <span>{glanceLine1}</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                  <span>{glanceLine2}</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                  <span>{glanceLine3}</span>
                </li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="h-full rounded-2xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl border border-white/20 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-white">
                  <FaPhone size={16} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1c1c1c]">
                  {hc?.contact_card_title || "Contact Us"}
                </h2>
              </div>
              <div className="space-y-4 text-sm font-medium">
                  <a
                  href={`tel:${company?.contact?.phone || "8435067145"}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-[#F5A623] shrink-0" size={18} />
                    <span className="text-[14px] font-bold">Call Us</span>
                  </div>
                  <span className="text-[14px] sm:ml-auto">
                    {formatPhoneDisplay(company?.contact?.phone || "8435067145")}
                    {(company?.contact?.phone_alt || "8269058399") && (
                      <span className="hidden sm:inline">
                        {" "}
                        / {formatPhoneDisplay(company?.contact?.phone_alt || "8269058399")}
                      </span>
                    )}
                  </span>
                </a>
                <a
                  href={`mailto:${company?.contact?.email || "mynityatravels@gmail.com"}`}
                  className="flex items-center gap-3 sm:gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 text-gray-900 overflow-hidden"
                >
                  <FaEnvelope className="text-[#F5A623] shrink-0" size={18} />
                  <span className="truncate text-[14px]">
                    {company?.contact?.email || "mynityatravels@gmail.com"}
                  </span>
                </a>
                {company?.social_media?.instagram && (
                  <a
                    href={company.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 text-gray-900"
                  >
                    <FaInstagram className="text-[#F5A623]" size={18} />
                    <span className="text-[15px]">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="h-full rounded-2xl bg-[#1c1c1c] p-8 shadow-2xl border border-gray-800 transition-transform hover:-translate-y-1 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <FaShieldAlt size={16} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/90">
                  {hc?.how_we_work_title || "How we work"}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-6 font-medium">
                {hc?.how_we_work_intro ||
                  "We focus on punctual pickups, clean vehicles, and courteous drivers—whether you need a day in the city or a longer itinerary."}
              </p>
              <ul className="space-y-4">
                {pillars.slice(0, 3).map((p) => (
                  <li key={p.title} className="flex gap-4 items-start">
                    <div className="mt-1 bg-white/20 w-1.5 h-1.5 rounded-full shrink-0" />
                    <div>
                      <p className="text-[15px] font-bold text-white/95">{p.title}</p>
                      <p className="mt-0.5 text-[13px] text-gray-400 font-medium leading-relaxed">{p.body}</p>
                    </div>
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
