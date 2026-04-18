"use client";
import type { IconType } from "react-icons";
import { FaShieldAlt, FaRupeeSign, FaGlobeAsia, FaHeadset, FaCheckCircle } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import type { SiteContent, WhyStrengthIcon } from "@/lib/companyTypes";

const iconMap: Record<WhyStrengthIcon, IconType> = {
  shield: FaShieldAlt,
  rupee: FaRupeeSign,
  globe: FaGlobeAsia,
  headset: FaHeadset,
};

const defaultStrengths: {
  icon: IconType;
  title: string;
  body: string;
  key: WhyStrengthIcon;
}[] = [
  {
    key: "shield",
    icon: FaShieldAlt,
    title: "Trusted service",
    body: "Verified drivers, transparent communication, and consistent quality on every trip.",
  },
  {
    key: "rupee",
    icon: FaRupeeSign,
    title: "Fair rates",
    body: "Clear quotations and billing—no last‑minute confusion on common routes.",
  },
  {
    key: "globe",
    icon: FaGlobeAsia,
    title: "Pan‑India",
    body: "Local, outstation, and multi‑day itineraries planned with practical routing.",
  },
  {
    key: "headset",
    icon: FaHeadset,
    title: "Responsive support",
    body: "Booking help and trip coordination when timings or plans shift.",
  },
];

const defaultChecklist = [
  "Well‑maintained vehicles",
  "Professional drivers",
  "Flexible booking options",
  "GPS tracking on trips",
  "T&C apply",
  "In any case the jurisdiction will be Indore.",
];

const defaultSnapshot = [
  { label: "Happy customers", value: "10,000+" },
  { label: "Avg. rating", value: "4.9" },
  { label: "Support", value: "24/7" },
  { label: "Safety focus", value: "High" },
];

type Props = {
  site?: SiteContent;
};

export default function WhyChooseUs({ site }: Props) {
  const w = site?.why_choose;
  const strengthsFromConfig = w?.strengths?.length
    ? w.strengths.map((s, i) => {
        const key = s.icon && iconMap[s.icon] ? s.icon : defaultStrengths[i % defaultStrengths.length].key;
        const Icon = iconMap[key] ?? FaShieldAlt;
        return { Icon, title: s.title, body: s.body, key: `${s.title}-${i}` };
      })
    : defaultStrengths.map((s) => ({ Icon: s.icon, title: s.title, body: s.body, key: s.key }));

  const checklist = w?.checklist?.length ? w.checklist : defaultChecklist;
  const snapshot = w?.snapshot?.length ? w.snapshot : defaultSnapshot;

  return (
    <section id="why-choose-us" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealOnScroll>
          <SectionHeading>{w?.heading || "Why Nitya Tour"}</SectionHeading>
          <p className="mx-auto -mt-4 mb-12 max-w-2xl text-center text-base text-stone-600">
            {w?.lead ||
              "A travel partner in Indore that keeps things simple: safe rides, honest pricing, and dependable execution."}
          </p>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-3">
          <RevealOnScroll>
            <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                {w?.strengths_title || "What sets us apart"}
              </h3>
              <ul className="mt-6 space-y-6">
                {strengthsFromConfig.map(({ Icon, title, body, key }) => (
                  <li key={key} className="flex gap-4">
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
                  {w?.snapshot_title || "Snapshot"}
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-6">
                  {snapshot.map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs text-stone-400">{row.label}</dt>
                      <dd className="mt-1 text-2xl font-semibold tracking-tight">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="rounded-xl border border-stone-200 bg-[var(--surface)] p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {w?.checklist_title || "Included experience"}
                </h3>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item, i) => (
                    <li key={`${i}-${item}`} className="flex items-start gap-3 text-sm text-stone-700">
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
