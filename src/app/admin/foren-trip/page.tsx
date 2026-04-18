"use client";

import { useEffect, useState } from "react";
import type { Company, ForenArrangeIcon } from "@/lib/companyTypes";
import AdminAuthGate from "../_components/AdminAuthGate";
import { AdminSection, Field, TextArea, GhostButton, PrimaryButton } from "../_components/admin-fields";

type SaveState = "idle" | "saving" | "saved" | "error";

const arrangeIconOptions: { value: ForenArrangeIcon; label: string }[] = [
  { value: "car", label: "Car (ground transport)" },
  { value: "users", label: "Users (groups / family)" },
  { value: "globe", label: "Globe (packages / world)" },
];

export default function ForenTripEditorPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin/company", { method: "GET" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load");
        return (await res.json()) as Company;
      })
      .then((data) => {
        if (!cancelled) setCompany(data);
      })
      .catch((e) => {
        if (!cancelled) {
          setSaveState("error");
          setSaveError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave() {
    if (!company) return;
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

  if (!company && !loading) {
    return (
      <AdminAuthGate>
        <p className="text-sm text-red-700">{saveError || "Could not load."}</p>
      </AdminAuthGate>
    );
  }

  const site = company?.site ?? {};
  const f = site.foren_trip ?? {};
  const cards = f.arrange_cards?.length ? f.arrange_cards : [{ title: "", body: "", icon: "car" as ForenArrangeIcon }];

  return (
    <AdminAuthGate>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Foreign trip page</h1>
            <p className="mt-2 text-sm text-stone-600">
              <code className="rounded bg-stone-100 px-1">/foren-trip</code> — headings, cards, aur
              destination lists.
            </p>
          </div>
          <PrimaryButton disabled={loading || saveState === "saving" || !company} onClick={onSave}>
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save changes"}
          </PrimaryButton>
        </div>

        {saveState === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {saveError || "Something went wrong."}
          </div>
        )}

        {!company ? (
          <p className="mt-8 text-sm text-stone-500">Loading…</p>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <AdminSection title="Header">
              <Field
                label="Kicker (small line)"
                value={f.header_kicker ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, header_kicker: v } },
                  })
                }
              />
              <Field
                label="Title"
                value={f.header_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, header_title: v } },
                  })
                }
              />
              <TextArea
                label="Lead paragraph"
                value={f.header_lead ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, header_lead: v } },
                  })
                }
                rows={4}
              />
            </AdminSection>

            <AdminSection title="What we arrange">
              <Field
                label="Section heading"
                value={f.arrange_heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, arrange_heading: v } },
                  })
                }
              />
              <div className="flex items-center justify-between gap-2 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Cards</p>
                <GhostButton
                  onClick={() =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        foren_trip: {
                          ...f,
                          arrange_cards: [...cards, { title: "", body: "", icon: "car" }],
                        },
                      },
                    })
                  }
                >
                  Add card
                </GhostButton>
              </div>
              <div className="space-y-3">
                {cards.map((card, idx) => (
                  <div key={idx} className="rounded-xl border border-stone-200 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-stone-500">Card {idx + 1}</p>
                      <GhostButton
                        disabled={cards.length <= 1}
                        onClick={() => {
                          const next = cards.filter((_, i) => i !== idx);
                          setCompany({
                            ...company,
                            site: { ...site, foren_trip: { ...f, arrange_cards: next } },
                          });
                        }}
                      >
                        Remove
                      </GhostButton>
                    </div>
                    <label className="block">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
                        Icon
                      </span>
                      <select
                        className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-teal-600/40 focus:ring-2 focus:ring-teal-700/15"
                        value={card.icon ?? "car"}
                        onChange={(e) => {
                          const next = [...cards];
                          next[idx] = { ...next[idx], icon: e.target.value as ForenArrangeIcon };
                          setCompany({
                            ...company,
                            site: { ...site, foren_trip: { ...f, arrange_cards: next } },
                          });
                        }}
                      >
                        {arrangeIconOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      label="Title"
                      value={card.title}
                      onChange={(v) => {
                        const next = [...cards];
                        next[idx] = { ...next[idx], title: v };
                        setCompany({
                          ...company,
                          site: { ...site, foren_trip: { ...f, arrange_cards: next } },
                        });
                      }}
                    />
                    <TextArea
                      label="Body"
                      value={card.body}
                      onChange={(v) => {
                        const next = [...cards];
                        next[idx] = { ...next[idx], body: v };
                        setCompany({
                          ...company,
                          site: { ...site, foren_trip: { ...f, arrange_cards: next } },
                        });
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </AdminSection>

            <AdminSection title="Domestic & national">
              <Field
                label="Section heading"
                value={f.domestic_heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, domestic_heading: v } },
                  })
                }
              />
              <TextArea
                label="Places (one per line)"
                value={(f.domestic_places ?? []).join("\n")}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      foren_trip: {
                        ...f,
                        domestic_places: v
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      },
                    },
                  })
                }
                rows={12}
              />
            </AdminSection>

            <AdminSection title="International">
              <Field
                label="Section heading"
                value={f.international_heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, foren_trip: { ...f, international_heading: v } },
                  })
                }
              />
              <TextArea
                label="Places (one per line)"
                value={(f.international_places ?? []).join("\n")}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      foren_trip: {
                        ...f,
                        international_places: v
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      },
                    },
                  })
                }
                rows={8}
              />
            </AdminSection>
          </div>
        )}
      </div>
    </AdminAuthGate>
  );
}
