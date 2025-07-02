import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileMenu from "./components/MobileMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitya Tour - Indore Cab Service & Tour Travels",
  description: "Best cab service in Indore. Book cabs, cars, and hotels with Nitya Tour Travels. Affordable, reliable, and trusted travel partner in Indore.",
  keywords: [
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
    title: "Nitya Tour - Indore Cab Service & Tour Travels",
    description: "Best cab service in Indore. Book cabs, cars, and hotels with Nitya Tour Travels. Affordable, reliable, and trusted travel partner in Indore.",
    url: "https://nityatour.com",
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
    title: "Nitya Tour - Indore Cab Service & Tour Travels",
    description: "Best cab service in Indore. Book cabs, cars, and hotels with Nitya Tour Travels. Affordable, reliable, and trusted travel partner in Indore.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileMenu />
        {children}
      </body>
    </html>
  );
}
