import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SiteNav from "./components/SiteNav";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitya Tour - Best Travel Agency in Indore | Cab Service & Tour Travels",
  description: "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
  keywords: [
    "travel agency in indore",
    "travel agency near me",
    "best travel agency near me",
    "tours and travels near me",
    "tour planner in indore",
    "indore travel agency",
    "Tours & Travels in indore",
    "Cab service indore",
    "Taxi service indore",
    "Car rental indore",
    "Nitya Tour",
    "Nitya Tour Travels",
    "spiritual tours indore",
    "ujjain darshan taxi",
    "omkareshwar taxi service",
    "outstation cabs indore",
    "family tour packages indore",
    "corporate travel agency indore",
    "char dham yatra package",
    "hotel booking indore",
    "tempo traveller on rent indore"
  ],
  openGraph: {
    title: "Nitya Tour - Best Travel Agency in Indore | Cab Service & Tour Travels",
    description:
      "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
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
    description:
      "Best travel agency near me in Indore. Rent cars in Indore, tour planners in Indore, tour and travels near me. Best cab service Indore with taxi service and tour package planner.",
    images: ["/Ertiga model 2024/images.jpeg"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

// ... (keep metadata and fonts)

export default async function RootLayout({
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
        className={`${nunito.variable} font-sans antialiased text-stone-900 bg-[var(--page-bg)] relative`}
      >
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
