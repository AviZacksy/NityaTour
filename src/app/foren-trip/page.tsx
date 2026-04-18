"use client";

import type { IconType } from "react-icons";
import { FaCar, FaUsers, FaGlobeAsia, FaMapMarkedAlt, FaPlaneDeparture } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import { usePublicCompany } from "@/lib/usePublicCompany";
import type { ForenArrangeIcon, SiteContent } from "@/lib/companyTypes";

const defaultDomestic = [
  "Sikkim",
  "Darjeeling",
  "Himachal Pradesh",
  "Uttarakhand",
  "Rajasthan",
  "Kerala",
  "Orissa",
  "Spiti Valley",
  "Gujarat",
];

const defaultInternational = ["Thailand", "Europe", "Bali", "Vietnam", "Dubai"];

const arrangeIconMap: Record<ForenArrangeIcon, IconType> = {
  car: FaCar,
  users: FaUsers,
  globe: FaGlobeAsia,
};

type ArrangeCard = NonNullable<NonNullable<SiteContent["foren_trip"]>["arrange_cards"]>[number];

const defaultArrangeCards: ArrangeCard[] = [
  {
    icon: "car",
    title: "Ground transport",
    body: "Cars suited to terrain and group size, coordinated with your dates.",
  },
  {
    icon: "users",
    title: "Family & group trips",
    body: "Practical day-wise plans with room for rest and sightseeing.",
  },
  {
    icon: "globe",
    title: "Packages",
    body: "Domestic, national, and hand-picked international options.",
  },
];

export default function ForenTrip() {
  const company = usePublicCompany();
  const f = company?.site?.foren_trip;

  const headerKicker = f?.header_kicker ?? "Packages · Domestic · International";
  const headerTitle = f?.header_title ?? "Foreign trip & tour packages";
  const headerLead =
    f?.header_lead ??
    "Planned itineraries for families and groups—India-wide favourites plus select international destinations, handled with the same Nitya Tour discipline.";
  const arrangeHeading = f?.arrange_heading ?? "What we arrange";
  const domesticHeading = f?.domestic_heading ?? "Domestic & national";
  const internationalHeading = f?.international_heading ?? "International highlights";
  const domestic = f?.domestic_places?.length ? f.domestic_places : defaultDomestic;
  const international = f?.international_places?.length ? f.international_places : defaultInternational;
  const fromConfig = (f?.arrange_cards ?? []).filter((c) => c.title?.trim());
  const arrangeCards: ArrangeCard[] = fromConfig.length > 0 ? fromConfig : defaultArrangeCards;

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pb-16 pt-6 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <header className="rounded-xl border border-stone-200 bg-[var(--surface)] px-6 py-10 text-center shadow-sm md:px-10 md:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">{headerKicker}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            {headerTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600">{headerLead}</p>
        </header>

        <div className="mt-14">
          <SectionHeading>{arrangeHeading}</SectionHeading>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {arrangeCards.map((card, idx) => {
              const fallback: ForenArrangeIcon[] = ["car", "users", "globe"];
              const resolved: ForenArrangeIcon =
                card.icon && arrangeIconMap[card.icon] ? card.icon : fallback[idx % 3];
              const Icon = arrangeIconMap[resolved] ?? FaCar;
              return (
                <div
                  key={`${card.title}-${idx}`}
                  className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 text-center shadow-sm"
                >
                  <Icon className="mx-auto text-2xl text-teal-800" aria-hidden />
                  <h3 className="mt-4 text-sm font-semibold text-stone-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading>{domesticHeading}</SectionHeading>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {domestic.map((place, i) => (
              <div
                key={`${place}-${i}`}
                className="flex flex-col items-center rounded-lg border border-stone-200 bg-[var(--surface)] px-3 py-4 text-center shadow-sm"
              >
                <FaMapMarkedAlt className="text-lg text-stone-400" aria-hidden />
                <span className="mt-2 text-sm font-medium text-stone-800">{place}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading>{internationalHeading}</SectionHeading>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {international.map((place, i) => (
              <div
                key={`${place}-${i}`}
                className="flex flex-col items-center rounded-lg border border-stone-200 bg-[var(--surface)] px-3 py-4 text-center shadow-sm"
              >
                <FaPlaneDeparture className="text-lg text-stone-400" aria-hidden />
                <span className="mt-2 text-sm font-medium text-stone-800">{place}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
