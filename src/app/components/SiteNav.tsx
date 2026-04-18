"use client";

import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

/** Public site navigation — hidden on `/admin` so admin panel uses only AdminShell. */
export default function SiteNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <>
      <Navbar />
      <MobileMenu />
    </>
  );
}
