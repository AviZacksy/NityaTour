"use client";

import { useEffect, useState } from "react";
import type { Company } from "@/lib/companyTypes";
import AdminAuthGate from "../_components/AdminAuthGate";
import { AdminSection, Field, TextArea } from "../_components/admin-fields";

type SaveState = "idle" | "saving" | "saved" | "error";

const emptyCompany: Company = {
  company_name: "",
  location: "",
  service_area: "",
  contact: { phone: "", whatsapp: "", email: "" },
};

export default function CompanyEditorPage() {
  const [company, setCompany] = useState<Company>(emptyCompany);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin/company", { method: "GET" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load company data");
        return (await res.json()) as Company;
      })
      .then((data) => {
        if (cancelled) return;
        setCompany(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setSaveState("error");
        setSaveError(e instanceof Error ? e.message : "Failed to load");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave() {
    setSaveState("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/admin/company", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      setCompany(json as Company);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch (e) {
      setSaveState("error");
      setSaveError(e instanceof Error ? e.message : "Save failed");
    }
  }

  return (
    <AdminAuthGate>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Company & Hero</h1>
            <p className="mt-2 text-sm text-stone-600">
              This editor updates <code className="rounded bg-stone-100 px-1">public/data/data.json</code>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={loading || saveState === "saving"}
              onClick={onSave}
              className="inline-flex items-center justify-center rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        {saveState === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {saveError || "Something went wrong."}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AdminSection title="Company">
            <Field
              label="Company name"
              value={company.company_name}
              onChange={(v) => setCompany({ ...company, company_name: v })}
              placeholder="Nitya Tour & Travels"
            />
            <Field
              label="Location"
              value={company.location}
              onChange={(v) => setCompany({ ...company, location: v })}
              placeholder="Indore, Madhya Pradesh"
            />
            <Field
              label="Service area"
              value={company.service_area}
              onChange={(v) => setCompany({ ...company, service_area: v })}
              placeholder="All India"
            />
          </AdminSection>

          <AdminSection title="Contact">
            <Field
              label="Phone"
              value={company.contact.phone}
              onChange={(v) =>
                setCompany({ ...company, contact: { ...company.contact, phone: v } })
              }
              placeholder="8435067145"
            />
            <Field
              label="Phone (alt)"
              value={company.contact.phone_alt ?? ""}
              onChange={(v) =>
                setCompany({ ...company, contact: { ...company.contact, phone_alt: v || undefined } })
              }
              placeholder="8269058399"
            />
            <Field
              label="WhatsApp"
              value={company.contact.whatsapp}
              onChange={(v) =>
                setCompany({ ...company, contact: { ...company.contact, whatsapp: v } })
              }
              placeholder="8435067145"
            />
            <Field
              label="WhatsApp (alt)"
              value={company.contact.whatsapp_alt ?? ""}
              onChange={(v) =>
                setCompany({
                  ...company,
                  contact: { ...company.contact, whatsapp_alt: v || undefined },
                })
              }
              placeholder="8269058399"
            />
            <Field
              label="Email"
              value={company.contact.email}
              onChange={(v) =>
                setCompany({ ...company, contact: { ...company.contact, email: v } })
              }
              placeholder="mynityatravels@gmail.com"
            />
          </AdminSection>

          <AdminSection title="Hero">
            <Field
              label="Kicker (top small line)"
              value={company.hero?.kicker ?? ""}
              onChange={(v) => setCompany({ ...company, hero: { ...(company.hero ?? {}), kicker: v } })}
              placeholder="Indore · Cab · Tours · Hotels"
            />
            <Field
              label="Headline"
              value={company.hero?.headline ?? ""}
              onChange={(v) =>
                setCompany({ ...company, hero: { ...(company.hero ?? {}), headline: v } })
              }
              placeholder="Nitya Tour & Travels"
            />
            <TextArea
              label="Lead (main paragraph)"
              value={company.hero?.lead ?? ""}
              onChange={(v) => setCompany({ ...company, hero: { ...(company.hero ?? {}), lead: v } })}
              placeholder="Reliable cars and tour planning…"
            />
            <TextArea
              label="Description (small paragraph)"
              value={company.hero?.description ?? ""}
              onChange={(v) =>
                setCompany({ ...company, hero: { ...(company.hero ?? {}), description: v } })
              }
              placeholder="Travel agency in Indore…"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Primary CTA label"
                value={company.hero?.primary_cta?.label ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    hero: {
                      ...(company.hero ?? {}),
                      primary_cta: { ...(company.hero?.primary_cta ?? {}), label: v },
                    },
                  })
                }
                placeholder="View fleet"
              />
              <Field
                label="Primary CTA href"
                value={company.hero?.primary_cta?.href ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    hero: {
                      ...(company.hero ?? {}),
                      primary_cta: { ...(company.hero?.primary_cta ?? {}), href: v },
                    },
                  })
                }
                placeholder="#our-cars"
              />
              <Field
                label="Secondary CTA label"
                value={company.hero?.secondary_cta?.label ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    hero: {
                      ...(company.hero ?? {}),
                      secondary_cta: { ...(company.hero?.secondary_cta ?? {}), label: v },
                    },
                  })
                }
                placeholder="WhatsApp us"
              />
              <Field
                label="Secondary CTA href (optional)"
                value={company.hero?.secondary_cta?.href ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    hero: {
                      ...(company.hero ?? {}),
                      secondary_cta: { ...(company.hero?.secondary_cta ?? {}), href: v },
                    },
                  })
                }
                placeholder="Leave empty to auto WhatsApp link"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Logo src"
                value={company.hero?.logo_src ?? ""}
                onChange={(v) =>
                  setCompany({ ...company, hero: { ...(company.hero ?? {}), logo_src: v } })
                }
                placeholder="/logo/logo.png"
              />
              <Field
                label="Logo alt"
                value={company.hero?.logo_alt ?? ""}
                onChange={(v) =>
                  setCompany({ ...company, hero: { ...(company.hero ?? {}), logo_alt: v } })
                }
                placeholder="Nitya Tour & Travels logo"
              />
            </div>
            <Field
              label="Card note (right card)"
              value={company.hero?.card_note ?? ""}
              onChange={(v) =>
                setCompany({ ...company, hero: { ...(company.hero ?? {}), card_note: v } })
              }
              placeholder="Serving Indore and pan‑India travel…"
            />
          </AdminSection>

          <AdminSection title="Social">
            <Field
              label="Instagram URL"
              value={company.social_media?.instagram ?? ""}
              onChange={(v) =>
                setCompany({
                  ...company,
                  social_media: { ...(company.social_media ?? {}), instagram: v || undefined },
                })
              }
              placeholder="https://instagram.com/…"
            />
          </AdminSection>
        </div>
      </div>
    </AdminAuthGate>
  );
}
