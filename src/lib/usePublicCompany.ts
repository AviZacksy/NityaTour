"use client";

import { useEffect, useState } from "react";
import type { Company } from "@/lib/companyTypes";

export function usePublicCompany() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setCompany(data as Company);
      })
      .catch(() => {
        if (!cancelled) setCompany(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return company;
}
