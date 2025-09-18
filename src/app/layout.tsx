import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileMenu from "./components/MobileMenu";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitya Tour - Best Travel Agency in Indore | Cab Service & Tour Travels",
  description: "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
  keywords: [
    "travel agency near me",
    "best travels in indore",
    "rent cars in indore",
    "tour planners in indore",
    "tour and travels near me",
    "tour package planner",
    "rent cabs near me",
    "travelling package",
    "rent car service indore",
    "taxi service indore",
    "best cab service indore",
    "cab service Indore",
    "Nitya Tour",
    "Nitya Tour Travels",
    "Indore taxi",
    "car rental Indore",
    "hotel booking Indore",
    "Indore tour operator",
    "Indore travel agency"
  ],
  openGraph: {
    title: "Nitya Tour - Best Travel Agency in Indore | Cab Service & Tour Travels",
    description: "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
    url: "https://nityatour.in",
    siteName: "Nitya Tour",
    images: [
      {
        url: "/Ertiga model 2024/images.jpeg",
        width: 1200,
        height: 630,
        alt: "Nitya Tour - Indore Cab Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitya Tour - Best Travel Agency in Indore | Cab Service & Tour Travels",
    description: "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
    images: ["/Ertiga model 2024/images.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="DeiydIuvITFg-iCpH4WgVTfaxEHIqyVNoxW-_GdWuJY" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <MobileMenu />
        {children}
      </body>
    </html>
  );
}
