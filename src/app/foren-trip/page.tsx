"use client";
import SectionHeading from "../components/SectionHeading";
import { FaCar, FaUsers, FaGlobeAsia, FaMapMarkedAlt, FaPlaneDeparture } from "react-icons/fa";

export default function ForenTrip() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-yellow-50 pb-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-yellow-500 to-indigo-600 py-16 mb-12 rounded-b-3xl shadow-xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">Tour Package Planner - Foren Trip & Tour Packages</h1>
        <p className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">Best travels in Indore - Explore the world with Nitya Tour & Travels – Domestic, National, and International packages for every traveler!</p>
      </div>

      {/* Services Section */}
      <SectionHeading>Our Services</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 px-2">
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaCar className="text-4xl text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg mb-1">Rent Cars in Indore</h3>
          <p className="text-gray-600 text-center">Wide range of cars for every need and budget.</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaUsers className="text-4xl text-yellow-500 mb-3" />
          <h3 className="font-bold text-lg mb-1">Family Trip Plan</h3>
          <p className="text-gray-600 text-center">Perfectly planned trips for families and groups.</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaGlobeAsia className="text-4xl text-green-600 mb-3" />
          <h3 className="font-bold text-lg mb-1">Travelling Package</h3>
          <p className="text-gray-600 text-center">Domestic, national, and international packages.</p>
        </div>
      </div>

      {/* Domestic/National Destinations */}
      <SectionHeading>Domestic/National Destinations</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12 px-2">
        {[
          "Sikkim", "Darjeeling", "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Kerala", "Orissa", "Spiti Valley", "Gujarat"
        ].map((place) => (
          <div key={place} className="bg-gradient-to-r from-yellow-200 to-indigo-100 rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaMapMarkedAlt className="text-2xl text-indigo-600 mb-2" />
            <span className="font-semibold text-gray-800 text-lg text-center">{place}</span>
          </div>
        ))}
      </div>

      {/* International Destinations */}
      <SectionHeading>International Destinations</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto px-2">
        {[
          "Thailand", "Europe", "Bali", "Vietnam", "Dubai"
        ].map((place) => (
          <div key={place} className="bg-gradient-to-r from-indigo-200 to-yellow-100 rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaPlaneDeparture className="text-2xl text-yellow-600 mb-2" />
            <span className="font-semibold text-gray-800 text-lg text-center">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
}