"use client";

import { useEffect, useState } from "react";
import type { Company, WhyStrengthIcon } from "@/lib/companyTypes";
import AdminAuthGate from "../_components/AdminAuthGate";
import { AdminSection, Field, TextArea, GhostButton, PrimaryButton } from "../_components/admin-fields";

type SaveState = "idle" | "saving" | "saved" | "error";

const iconOptions: { value: WhyStrengthIcon; label: string }[] = [
  { value: "shield", label: "Shield (trust / safety)" },
  { value: "rupee", label: "Rupee (pricing)" },
  { value: "globe", label: "Globe (India / reach)" },
  { value: "headset", label: "Headset (support)" },
];

export default function ContentEditorPage() {
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
        <p className="text-sm text-red-700">{saveError || "Could not load content."}</p>
      </AdminAuthGate>
    );
  }

  const site = company?.site ?? {};
  const hc = site.hero_cards ?? {};
  const glanceLines = [...(hc.at_a_glance_lines ?? []), "", "", ""].slice(0, 3);
  const pillars = hc.pillars?.length ? hc.pillars : [{ title: "", body: "" }];
  const strengths = site.why_choose?.strengths?.length
    ? site.why_choose.strengths
    : [{ title: "", body: "", icon: "shield" as WhyStrengthIcon }];
  const snapshot = site.why_choose?.snapshot?.length
    ? site.why_choose.snapshot
    : [{ label: "", value: "" }];

  return (
    <AdminAuthGate>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Pages & text</h1>
            <p className="mt-2 text-sm text-stone-600">
              Homepage par dikhne wale headings, paragraphs, aur lists—sab yahan se.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PrimaryButton disabled={loading || saveState === "saving" || !company} onClick={onSave}>
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save changes"}
            </PrimaryButton>
          </div>
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
            <AdminSection title="Navbar">
              <Field
                label="Brand text (top menu)"
                value={site.navbar_brand ?? ""}
                onChange={(v) => setCompany({ ...company, site: { ...site, navbar_brand: v } })}
                placeholder="Nitya Tour & Travels"
              />
            </AdminSection>

            <AdminSection title="Fleet section (homepage)">
              <Field
                label="Heading"
                value={site.fleet_section?.heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      fleet_section: { ...site.fleet_section, heading: v },
                    },
                  })
                }
                placeholder="Our fleet"
              />
              <TextArea
                label="Intro paragraph"
                value={site.fleet_section?.lead ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      fleet_section: { ...site.fleet_section, lead: v },
                    },
                  })
                }
                rows={3}
              />
            </AdminSection>

            <AdminSection title="Hotel section">
              <Field
                label="Heading"
                value={site.hotel_section?.heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      hotel_section: { ...site.hotel_section, heading: v },
                    },
                  })
                }
              />
              <TextArea
                label="Subtitle"
                value={site.hotel_section?.subtitle ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      hotel_section: { ...site.hotel_section, subtitle: v },
                    },
                  })
                }
                rows={3}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Show photos button"
                  value={site.hotel_section?.show_photos ?? ""}
                  onChange={(v) =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        hotel_section: { ...site.hotel_section, show_photos: v },
                      },
                    })
                  }
                />
                <Field
                  label="Hide photos button"
                  value={site.hotel_section?.hide_photos ?? ""}
                  onChange={(v) =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        hotel_section: { ...site.hotel_section, hide_photos: v },
                      },
                    })
                  }
                />
              </div>
            </AdminSection>

            <AdminSection title="Footer">
              <Field
                label="Small heading"
                value={site.footer?.kicker ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, footer: { ...site.footer, kicker: v } },
                  })
                }
                placeholder="Contact"
              />
              <TextArea
                label="Paragraph"
                value={site.footer?.body ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, footer: { ...site.footer, body: v } },
                  })
                }
                rows={4}
              />
            </AdminSection>

            <AdminSection title="Hero — cards under main hero">
              <Field
                label="At a glance — card title"
                value={hc.at_a_glance_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      hero_cards: { ...hc, at_a_glance_title: v },
                    },
                  })
                }
              />
              <p className="text-xs text-stone-500">
                Line 1 / 2 khali chhodoge to site automatically location aur service area dikhayegi.
              </p>
              <Field
                label="At a glance — line 1 (optional)"
                value={glanceLines[0]}
                onChange={(v) => {
                  const next = [...glanceLines];
                  next[0] = v;
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, at_a_glance_lines: next } },
                  });
                }}
              />
              <Field
                label="At a glance — line 2 (optional)"
                value={glanceLines[1]}
                onChange={(v) => {
                  const next = [...glanceLines];
                  next[1] = v;
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, at_a_glance_lines: next } },
                  });
                }}
              />
              <Field
                label="At a glance — line 3"
                value={glanceLines[2]}
                onChange={(v) => {
                  const next = [...glanceLines];
                  next[2] = v;
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, at_a_glance_lines: next } },
                  });
                }}
              />
              <Field
                label="Contact card title"
                value={hc.contact_card_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, contact_card_title: v } },
                  })
                }
              />
              <Field
                label="How we work — title"
                value={hc.how_we_work_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, how_we_work_title: v } },
                  })
                }
              />
              <TextArea
                label="How we work — intro"
                value={hc.how_we_work_intro ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: { ...site, hero_cards: { ...hc, how_we_work_intro: v } },
                  })
                }
                rows={3}
              />

              <div className="flex items-center justify-between gap-2 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Pillars (list)
                </p>
                <GhostButton
                  onClick={() =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        hero_cards: { ...hc, pillars: [...pillars, { title: "", body: "" }] },
                      },
                    })
                  }
                >
                  Add row
                </GhostButton>
              </div>
              <div className="space-y-3">
                {pillars.map((p, idx) => (
                  <div key={idx} className="rounded-xl border border-stone-200 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-stone-500">Pillar {idx + 1}</p>
                      <GhostButton
                        disabled={pillars.length <= 1}
                        onClick={() => {
                          const next = pillars.filter((_, i) => i !== idx);
                          setCompany({
                            ...company,
                            site: { ...site, hero_cards: { ...hc, pillars: next } },
                          });
                        }}
                      >
                        Remove
                      </GhostButton>
                    </div>
                    <Field
                      label="Title"
                      value={p.title}
                      onChange={(v) => {
                        const next = [...pillars];
                        next[idx] = { ...next[idx], title: v };
                        setCompany({
                          ...company,
                          site: { ...site, hero_cards: { ...hc, pillars: next } },
                        });
                      }}
                    />
                    <TextArea
                      label="Body"
                      value={p.body}
                      onChange={(v) => {
                        const next = [...pillars];
                        next[idx] = { ...next[idx], body: v };
                        setCompany({
                          ...company,
                          site: { ...site, hero_cards: { ...hc, pillars: next } },
                        });
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </AdminSection>

            <AdminSection title="Why choose us">
              <Field
                label="Section heading"
                value={site.why_choose?.heading ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: { ...site.why_choose, heading: v },
                    },
                  })
                }
              />
              <TextArea
                label="Lead paragraph"
                value={site.why_choose?.lead ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: { ...site.why_choose, lead: v },
                    },
                  })
                }
                rows={3}
              />
              <Field
                label="Strengths box title"
                value={site.why_choose?.strengths_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: { ...site.why_choose, strengths_title: v },
                    },
                  })
                }
              />

              <div className="flex items-center justify-between gap-2 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Strength rows
                </p>
                <GhostButton
                  onClick={() =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        why_choose: {
                          ...site.why_choose,
                          strengths: [...strengths, { title: "", body: "", icon: "shield" }],
                        },
                      },
                    })
                  }
                >
                  Add row
                </GhostButton>
              </div>
              <div className="space-y-3">
                {strengths.map((s, idx) => (
                  <div key={idx} className="rounded-xl border border-stone-200 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-stone-500">Strength {idx + 1}</p>
                      <GhostButton
                        disabled={strengths.length <= 1}
                        onClick={() => {
                          const next = strengths.filter((_, i) => i !== idx);
                          setCompany({
                            ...company,
                            site: {
                              ...site,
                              why_choose: { ...site.why_choose, strengths: next },
                            },
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
                        value={s.icon ?? "shield"}
                        onChange={(e) => {
                          const next = [...strengths];
                          next[idx] = { ...next[idx], icon: e.target.value as WhyStrengthIcon };
                          setCompany({
                            ...company,
                            site: {
                              ...site,
                              why_choose: { ...site.why_choose, strengths: next },
                            },
                          });
                        }}
                      >
                        {iconOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      label="Title"
                      value={s.title}
                      onChange={(v) => {
                        const next = [...strengths];
                        next[idx] = { ...next[idx], title: v };
                        setCompany({
                          ...company,
                          site: {
                            ...site,
                            why_choose: { ...site.why_choose, strengths: next },
                          },
                        });
                      }}
                    />
                    <TextArea
                      label="Body"
                      value={s.body}
                      onChange={(v) => {
                        const next = [...strengths];
                        next[idx] = { ...next[idx], body: v };
                        setCompany({
                          ...company,
                          site: {
                            ...site,
                            why_choose: { ...site.why_choose, strengths: next },
                          },
                        });
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <Field
                label="Snapshot card title"
                value={site.why_choose?.snapshot_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: { ...site.why_choose, snapshot_title: v },
                    },
                  })
                }
              />
              <div className="flex items-center justify-between gap-2 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Snapshot rows
                </p>
                <GhostButton
                  onClick={() =>
                    setCompany({
                      ...company,
                      site: {
                        ...site,
                        why_choose: {
                          ...site.why_choose,
                          snapshot: [...snapshot, { label: "", value: "" }],
                        },
                      },
                    })
                  }
                >
                  Add row
                </GhostButton>
              </div>
              <div className="space-y-3">
                {snapshot.map((row, idx) => (
                  <div key={idx} className="grid gap-2 rounded-xl border border-stone-200 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                    <Field
                      label="Label"
                      value={row.label}
                      onChange={(v) => {
                        const next = [...snapshot];
                        next[idx] = { ...next[idx], label: v };
                        setCompany({
                          ...company,
                          site: {
                            ...site,
                            why_choose: { ...site.why_choose, snapshot: next },
                          },
                        });
                      }}
                    />
                    <Field
                      label="Value"
                      value={row.value}
                      onChange={(v) => {
                        const next = [...snapshot];
                        next[idx] = { ...next[idx], value: v };
                        setCompany({
                          ...company,
                          site: {
                            ...site,
                            why_choose: { ...site.why_choose, snapshot: next },
                          },
                        });
                      }}
                    />
                    <GhostButton
                      disabled={snapshot.length <= 1}
                      onClick={() => {
                        const next = snapshot.filter((_, i) => i !== idx);
                        setCompany({
                          ...company,
                          site: {
                            ...site,
                            why_choose: { ...site.why_choose, snapshot: next },
                          },
                        });
                      }}
                    >
                      Remove
                    </GhostButton>
                  </div>
                ))}
              </div>

              <Field
                label="Checklist card title"
                value={site.why_choose?.checklist_title ?? ""}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: { ...site.why_choose, checklist_title: v },
                    },
                  })
                }
              />
              <TextArea
                label="Checklist (one line per item)"
                value={(site.why_choose?.checklist ?? []).join("\n")}
                onChange={(v) =>
                  setCompany({
                    ...company,
                    site: {
                      ...site,
                      why_choose: {
                        ...site.why_choose,
                        checklist: v
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
