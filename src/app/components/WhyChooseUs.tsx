"use client";
import type { IconType } from "react-icons";
import { FaShieldAlt, FaRupeeSign, FaGlobeAsia, FaHeadset, FaCheckCircle } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
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
    body: "Clear quotations and billing—no last-minute confusion on common routes.",
  },
  {
    key: "globe",
    icon: FaGlobeAsia,
    title: "Pan-India",
    body: "Local, outstation, and multi-day itineraries planned with practical routing.",
  },
  {
    key: "headset",
    icon: FaHeadset,
    title: "Responsive support",
    body: "Booking help and trip coordination when timings or plans shift.",
  },
];

const defaultChecklist = [
  "Well-maintained vehicles",
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
    <section id="why-choose-us" className={`relative bg-[#FDFDF9] py-24 lg:py-32 `}>
      <div className="mx-auto max-w-7xl px-4 lg:px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-[#F5A623]">
              Experience Excellence
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight`}>
              {w?.heading || "Why Choose Nitya Tour"}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg font-medium">
              {w?.lead ||
                "A travel partner in Indore that keeps things simple: safe rides, honest pricing, and dependable execution."}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-3">
          <RevealOnScroll>
            <div className="h-full rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] lg:col-span-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1c1c1c] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#F5A623]" />
                {w?.strengths_title || "What sets us apart"}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {strengthsFromConfig.map(({ Icon, title, body, key }) => (
                  <li key={key} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-50 border border-stone-100 text-[#F5A623] shadow-sm">
                      <Icon className="text-xl" aria-hidden />
                    </span>
                    <div>
                      <p className={`text-xl font-bold text-stone-900 mb-2`}>{title}</p>
                      <p className="text-[15px] leading-relaxed text-stone-600 font-medium">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-8">
            <RevealOnScroll>
              <div className="rounded-2xl border border-stone-800 bg-[#1c1c1c] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-8 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#F5A623]" />
                  {w?.snapshot_title || "Snapshot"}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 relative z-10">
                  {snapshot.map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">{row.label}</dt>
                      <dd className={`text-3xl font-bold tracking-tight text-white`}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1c1c1c] mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#F5A623]" />
                  {w?.checklist_title || "Included experience"}
                </h3>
                <ul className="space-y-4">
                  {checklist.map((item, i) => (
                    <li key={`${i}-${item}`} className="flex items-start gap-3 text-[15px] font-medium text-stone-700">
                      <FaCheckCircle className="mt-1 shrink-0 text-[#F5A623]" aria-hidden />
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
