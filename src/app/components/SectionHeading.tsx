"use client";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-10 md:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
        {children}
      </h2>
      <div className="mx-auto mt-4 h-px w-16 bg-stone-300" aria-hidden />
    </div>
  );
}
