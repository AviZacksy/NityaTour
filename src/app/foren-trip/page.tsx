"use client";
import SectionHeading from "../components/SectionHeading";
import { FaCar, FaUsers, FaGlobeAsia, FaMapMarkedAlt, FaPlaneDeparture } from "react-icons/fa";

const domestic = [
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

const international = ["Thailand", "Europe", "Bali", "Vietnam", "Dubai"];

export default function ForenTrip() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pb-16 pt-6 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <header className="rounded-xl border border-stone-200 bg-[var(--surface)] px-6 py-10 text-center shadow-sm md:px-10 md:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Packages · Domestic · International
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            Foreign trip & tour packages
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
            Planned itineraries for families and groups—India-wide favourites plus select
            international destinations, handled with the same Nitya Tour discipline.
          </p>
        </header>

        <div className="mt-14">
          <SectionHeading>What we arrange</SectionHeading>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 text-center shadow-sm">
              <FaCar className="mx-auto text-2xl text-teal-800" aria-hidden />
              <h3 className="mt-4 text-sm font-semibold text-stone-900">Ground transport</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Cars suited to terrain and group size, coordinated with your dates.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 text-center shadow-sm">
              <FaUsers className="mx-auto text-2xl text-teal-800" aria-hidden />
              <h3 className="mt-4 text-sm font-semibold text-stone-900">Family & group trips</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Practical day-wise plans with room for rest and sightseeing.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 text-center shadow-sm">
              <FaGlobeAsia className="mx-auto text-2xl text-teal-800" aria-hidden />
              <h3 className="mt-4 text-sm font-semibold text-stone-900">Packages</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Domestic, national, and hand-picked international options.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading>Domestic & national</SectionHeading>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {domestic.map((place) => (
              <div
                key={place}
                className="flex flex-col items-center rounded-lg border border-stone-200 bg-[var(--surface)] px-3 py-4 text-center shadow-sm"
              >
                <FaMapMarkedAlt className="text-lg text-stone-400" aria-hidden />
                <span className="mt-2 text-sm font-medium text-stone-800">{place}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading>International highlights</SectionHeading>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {international.map((place) => (
              <div
                key={place}
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
