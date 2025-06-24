"use client";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-8 text-center tracking-tight">
      {children}
    </h2>
  );
} 