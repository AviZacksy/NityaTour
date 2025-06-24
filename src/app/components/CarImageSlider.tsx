"use client";
import Image from "next/image";
import { useState } from "react";

interface CarImageSliderProps {
  images: string[];
  folder: string;
  alt: string;
}

export default function CarImageSlider({ images, folder, alt }: CarImageSliderProps) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return (
    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">No Image</div>
  );
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="transition-transform duration-300 hover:scale-105">
        <Image
          src={`/${encodeURIComponent(folder)}/${encodeURIComponent(images[idx])}`}
          alt={alt}
          width={260}
          height={160}
          className="rounded-xl object-cover w-full h-40 border-4 border-indigo-100 shadow-lg"
          style={{ objectFit: "cover" }}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-300 text-indigo-700 text-2xl rounded-full p-2 shadow-lg border border-indigo-200 z-10"
            onClick={() => setIdx((idx - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-300 text-indigo-700 text-2xl rounded-full p-2 shadow-lg border border-indigo-200 z-10"
            onClick={() => setIdx((idx + 1) % images.length)}
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}
      <div className="flex gap-1 mt-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-3 h-3 rounded-full border-2 ${i === idx ? "bg-indigo-600 border-yellow-400" : "bg-gray-200 border-indigo-200"}`}
          />
        ))}
      </div>
    </div>
  );
} 