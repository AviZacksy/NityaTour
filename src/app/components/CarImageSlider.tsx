"use client";
import Image from "next/image";
import { useState, useRef } from "react";

interface CarImageSliderProps {
  images: string[];
  folder: string;
  alt: string;
  overlayLabel?: string;
}

export default function CarImageSlider({ images, folder, alt, overlayLabel }: CarImageSliderProps) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const [lastTouch, setLastTouch] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [pinchDist, setPinchDist] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0)
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg bg-stone-100 text-sm text-stone-500">
        No image
      </div>
    );

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      setStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setDrag(true);
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      setPinchDist(Math.sqrt(dx * dx + dy * dy));
      setDrag(false);
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 1 && drag && zoom > 1) {
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;
      setOffset({ x: dx, y: dy });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (pinchDist) {
        let newZoom = zoom * (dist / pinchDist);
        newZoom = Math.max(1, Math.min(newZoom, 4));
        setZoom(newZoom);
      }
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (e.touches.length === 0 && drag && zoom === 1) {
      const dx = start.x - (e.changedTouches[0]?.clientX || 0);
      if (Math.abs(dx) > 50) {
        if (dx > 0) setIdx((idx + 1) % images.length);
        else setIdx((idx - 1 + images.length) % images.length);
      }
      setOffset({ x: 0, y: 0 });
      setDrag(false);
    } else if (e.touches.length === 0 && zoom > 1) {
      setOffset({ x: 0, y: 0 });
      setDrag(false);
    }
    setPinchDist(0);
  }

  function handleDoubleTap() {
    const now = Date.now();
    if (now - lastTouch < 300) {
      setZoom(zoom === 1 ? 2 : 1);
      setOffset({ x: 0, y: 0 });
    }
    setLastTouch(now);
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      <div
        ref={containerRef}
        className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-white touch-none md:h-60"
        onTouchStart={(e) => {
          handleDoubleTap();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      >
        <Image
          src={`/${encodeURIComponent(folder)}/${encodeURIComponent(images[idx])}`}
          alt={alt}
          fill
          className="object-contain bg-white select-none"
          priority={idx === 0}
          style={{
            transform: `scale(${zoom}) translate(${offset.x / (zoom || 1)}px, ${offset.y / (zoom || 1)}px)`,
            transition: drag ? "none" : "transform 0.3s",
            touchAction: "none",
          }}
          draggable={false}
        />
        {overlayLabel && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 border-t border-stone-200/60 bg-white/85 backdrop-blur-sm md:h-20" />
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-md border border-white/30 bg-stone-900/70 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
              {overlayLabel}
            </div>
          </>
        )}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-stone-200 bg-white/95 p-2 text-sm text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
              onClick={() => setIdx((idx - 1 + images.length) % images.length)}
              aria-label="Previous image"
              style={{ touchAction: "manipulation" }}
            >
              ←
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-stone-200 bg-white/95 p-2 text-sm text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
              onClick={() => setIdx((idx + 1) % images.length)}
              aria-label="Next image"
              style={{ touchAction: "manipulation" }}
            >
              →
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === idx ? "bg-teal-800" : "bg-stone-300"
              }`}
              aria-hidden
            />
          ))}
        </div>
      )}
    </div>
  );
}
