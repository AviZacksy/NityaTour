"use client";
import { FaShieldAlt, FaRupeeSign, FaGlobeAsia, FaHeadset, FaCheckCircle } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";

const strengths = [
  {
    icon: FaShieldAlt,
    title: "Trusted service",
    body: "Verified drivers, transparent communication, and consistent quality on every trip.",
  },
  {
    icon: FaRupeeSign,
    title: "Fair rates",
    body: "Clear quotations and billing—no last‑minute confusion on common routes.",
  },
  {
    icon: FaGlobeAsia,
    title: "Pan‑India",
    body: "Local, outstation, and multi‑day itineraries planned with practical routing.",
  },
  {
    icon: FaHeadset,
    title: "Responsive support",
    body: "Booking help and trip coordination when timings or plans shift.",
  },
];

const checklist = [
  "Well‑maintained vehicles",
  "Professional drivers",
  "Flexible booking options",
  "GPS tracking on trips",
  "T&C apply",
  "In any case the jurisdiction will be Indore.",
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealOnScroll>
          <SectionHeading>Why Nitya Tour</SectionHeading>
          <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center text-base text-stone-600">
            A travel partner in Indore that keeps things simple: safe rides, honest pricing, and
            dependable execution.
          </p>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-3">
          <RevealOnScroll>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                What sets us apart
              </h3>
              <ul className="mt-6 space-y-6">
                {strengths.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-teal-800">
                      <Icon className="text-lg" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-stone-900">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-8">
            <RevealOnScroll>
              <div className="rounded-xl border border-stone-200 bg-stone-900 p-6 text-stone-50 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
                  Snapshot
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-xs text-stone-400">Happy customers</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight">10,000+</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-400">Avg. rating</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight">4.9</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-400">Support</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight">24/7</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-400">Safety focus</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight">High</dd>
                  </div>
                </dl>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                  Included experience
                </h3>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                      <FaCheckCircle className="mt-0.5 shrink-0 text-teal-800" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
