"use client";
import Image from "next/image";
import { useState, useRef } from "react";

interface CarImageSliderProps {
  images: string[];
  folder: string;
  alt: string;
}

export default function CarImageSlider({ images, folder, alt }: CarImageSliderProps) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const [lastTouch, setLastTouch] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [pinchDist, setPinchDist] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return (
    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">No Image</div>
  );

  // Touch handlers
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
      // Pan
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;
      setOffset({ x: dx, y: dy });
    } else if (e.touches.length === 2) {
      // Pinch
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
      // Swipe
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
    <div className="relative w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-white rounded-xl transition-transform duration-300 hover:scale-105 overflow-hidden touch-none"
        onTouchStart={e => { handleDoubleTap(); handleTouchStart(e); }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <Image
          src={`/${encodeURIComponent(folder)}/${encodeURIComponent(images[idx])}`}
          alt={alt}
          fill
          className="object-contain w-full h-full rounded-xl border-4 border-indigo-100 shadow-lg bg-white select-none"
          priority={idx === 0}
          style={{
            transform: `scale(${zoom}) translate(${offset.x / (zoom || 1)}px, ${offset.y / (zoom || 1)}px)`,
            transition: drag ? 'none' : 'transform 0.3s',
            touchAction: 'none',
          }}
          draggable={false}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-300 text-indigo-700 text-xl sm:text-2xl rounded-full p-2 shadow-lg border border-indigo-200 z-10"
            onClick={() => setIdx((idx - 1 + images.length) % images.length)}
            aria-label="Previous image"
            style={{ touchAction: 'manipulation' }}
          >
            &#8592;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-300 text-indigo-700 text-xl sm:text-2xl rounded-full p-2 shadow-lg border border-indigo-200 z-10"
            onClick={() => setIdx((idx + 1) % images.length)}
            aria-label="Next image"
            style={{ touchAction: 'manipulation' }}
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