import React, { useState } from "react";

interface Car {
  model: string;
}

const CarNameList: React.FC<{ cars: Car[] }> = ({ cars }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-stone-200 bg-[var(--surface)] shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/25"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        All models
        <span
          className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden border-t border-stone-100 transition-all duration-300 ${
          open ? "max-h-[28rem]" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="max-h-[28rem] space-y-2 overflow-y-auto px-4 py-4">
          {cars.map((car, idx) => (
            <li
              key={idx}
              className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2.5 text-center text-sm font-medium text-stone-800"
            >
              {car.model}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarNameList;
