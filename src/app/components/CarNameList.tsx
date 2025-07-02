import React, { useState } from "react";

interface Car {
  model: string;
}

const CarNameList: React.FC<{ cars: Car[] }> = ({ cars }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-0 mt-8 border border-indigo-100">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-indigo-900 font-bold text-lg focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Car Models
        <span className={`transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96 py-4" : "max-h-0 py-0"}`}
      >
        <ul className="space-y-2 px-6">
          {cars.map((car, idx) => (
            <li key={idx} className="py-2 px-3 bg-indigo-50 rounded-lg text-indigo-800 font-semibold text-center">
              {car.model}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarNameList; 