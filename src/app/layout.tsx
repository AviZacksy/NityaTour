import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import StickyContactButtons from "./components/StickyContactButtons";
import { promises as fs } from "fs";
import path from "path";
import "./globals.css";
import SiteNav from "./components/SiteNav";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    "Indore travel agency",
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
};

// ... (keep metadata and fonts)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let companyData = null;
  try {
    const filePath = path.join(process.cwd(), "public", "data", "data.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    companyData = JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading company data:", error);
  }

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="DeiydIuvITFg-iCpH4WgVTfaxEHIqyVNoxW-_GdWuJY" />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased text-stone-900 bg-[var(--page-bg)] relative`}
      >
        <SiteNav />
        {children}
        {companyData && <StickyContactButtons company={companyData} />}
      </body>
    </html>
  );
}
