"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { FleetCarJson } from "@/lib/fleetTypes";
import AdminAuthGate from "../_components/AdminAuthGate";
import { AdminSection, Field, GhostButton, PrimaryButton } from "../_components/admin-fields";

type SaveState = "idle" | "saving" | "saved" | "error";

type FleetBundle = {
  folders: string[];
  cars: { folder: string; data: FleetCarJson }[];
};

type CarForm = {
  model: string;
  year: string;
  seating: string;
  fuel: string;
  ac: string;
  nonAc: string;
  perDay: string;
  imageList: string[];
};

function imageUrl(folder: string, filename: string) {
  const f = folder.split("/").map(encodeURIComponent).join("/");
  const name = filename.split("/").map(encodeURIComponent).join("/");
  return `/${f}/${name}`;
}

function applyBundleToState(
  b: FleetBundle,
  setFolders: (f: string[]) => void,
  setForms: Dispatch<SetStateAction<Record<string, CarForm>>>
) {
  setFolders(b.folders);
  const next: Record<string, CarForm> = {};
  for (const c of b.cars) next[c.folder] = carToFormState(c.data);
  setForms(next);
}

function carToFormState(data: FleetCarJson): CarForm {
  return {
    model: data.model ?? "",
    year: data.year === undefined || data.year === null ? "" : String(data.year),
    seating: data.seating ?? "",
    fuel: data.fuel ?? "",
    ac: data.rate?.ac !== undefined ? String(data.rate.ac) : "",
    nonAc: data.rate?.non_ac !== undefined ? String(data.rate.non_ac) : "",
    perDay: data.per_day_charge !== undefined ? String(data.per_day_charge) : "",
    imageList: [...(data.images ?? [])],
  };
}

function formToCar(form: CarForm): FleetCarJson {
  const yearStr = form.year.trim();
  let year: string | number | undefined = yearStr;
  if (/^\d+$/.test(yearStr)) year = Number(yearStr);
  if (!yearStr) year = undefined;

  const acN = form.ac.trim() ? Number(form.ac) : undefined;
  const nonN = form.nonAc.trim() ? Number(form.nonAc) : undefined;
  const rate: FleetCarJson["rate"] = {};
  if (acN !== undefined && Number.isFinite(acN)) rate.ac = acN;
  if (nonN !== undefined && Number.isFinite(nonN)) rate.non_ac = nonN;
  const rateOut = Object.keys(rate).length > 0 ? rate : undefined;

  const perDay = form.perDay.trim() ? Number(form.perDay) : undefined;

  const images = form.imageList.map((s) => s.trim()).filter(Boolean);

  return {
    model: form.model.trim(),
    year,
    seating: form.seating.trim() || undefined,
    fuel: form.fuel.trim() || undefined,
    rate: rateOut,
    per_day_charge: perDay !== undefined && Number.isFinite(perDay) ? perDay : undefined,
    images: images.length ? images : undefined,
  };
}

function CarImagesEditor({
  folder,
  imageList,
  onChange,
}: {
  folder: string;
  imageList: string[];
  onChange: (next: string[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [newName, setNewName] = useState("");
  const [bulkPaste, setBulkPaste] = useState("");

  function updateAt(index: number, value: string) {
    const next = [...imageList];
    next[index] = value;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(imageList.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= imageList.length) return;
    const next = [...imageList];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(next);
  }

  function addOne() {
    const v = newName.trim();
    if (!v || imageList.includes(v)) return;
    onChange([...imageList, v]);
    setNewName("");
  }

  function addBulk() {
    const lines = bulkPaste
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!lines.length) return;
    const merged = [...imageList];
    for (const line of lines) {
      if (!merged.includes(line)) merged.push(line);
    }
    onChange(merged);
    setBulkPaste("");
  }

  async function onFilesChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    e.target.value = "";
    if (!list?.length) return;
    setUploading(true);
    setUploadErr("");
    try {
      const fd = new FormData();
      fd.append("folder", folder);
      for (const f of Array.from(list)) {
        fd.append("files", f);
      }
      const res = await fetch("/api/admin/fleet/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; filenames?: string[] };
      if (!res.ok) throw new Error(j.error || "Upload failed");
      const names = j.filenames ?? [];
      const merged = [...imageList];
      for (const n of names) {
        if (n && !merged.includes(n)) merged.push(n);
      }
      onChange(merged);
    } catch (err) {
      setUploadErr(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Photos</p>
      <p className="text-xs text-stone-500">
        <strong>Gallery se chunein</strong> — photos server par{" "}
        <code className="rounded bg-stone-100 px-1">public/{folder}/</code> me save hongi, list yahan
        update ho jayegi. Phir <strong>Save this car</strong> dabana zaroori hai taaki{" "}
        <code className="rounded bg-stone-100 px-1">data.json</code> me order save ho.
      </p>

      {imageList.length === 0 ? (
        <p className="text-sm text-stone-500">Abhi koi image add nahi hai.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageList.map((name, idx) => (
            <li
              key={`${idx}-${name}`}
              className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50/80 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-stone-200">
                {name.trim() ? (
                  <Image
                    src={imageUrl(folder, name)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-stone-500">
                    Filename khali
                  </div>
                )}
              </div>
              <div className="space-y-2 p-3">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                    Filename
                  </span>
                  <input
                    value={name}
                    onChange={(e) => updateAt(idx, e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-900 outline-none focus:border-teal-600/40"
                    placeholder="photo.jpg"
                  />
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <GhostButton disabled={idx === 0} onClick={() => move(idx, -1)}>
                    ↑
                  </GhostButton>
                  <GhostButton disabled={idx === imageList.length - 1} onClick={() => move(idx, 1)}>
                    ↓
                  </GhostButton>
                  <GhostButton onClick={() => removeAt(idx)}>Remove</GhostButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        aria-hidden
        onChange={onFilesChosen}
      />

      <div className="rounded-xl border border-dashed border-teal-700/30 bg-teal-50/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-900">Nayi photos</p>
        <p className="mt-1 text-xs text-stone-600">
          Phone / laptop ki gallery ya file picker khulega — ek ya kai photos ek saath.
        </p>
        {uploadErr && (
          <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
            {uploadErr}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <PrimaryButton
            disabled={uploading}
            onClick={() => {
              setUploadErr("");
              fileInputRef.current?.click();
            }}
          >
            {uploading ? "Upload ho raha hai…" : "Gallery / device se chunein"}
          </PrimaryButton>
        </div>
      </div>

      <details className="rounded-xl border border-stone-200 bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium text-stone-800">
          Advanced: filename manually / bulk paste
        </summary>
        <div className="mt-4 space-y-4 border-t border-stone-100 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="min-w-0 flex-1">
              <span className="text-[10px] text-stone-500">Sirf filename (file pehle se folder me ho)</span>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="images (1).jpeg"
                className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600/40"
              />
            </label>
            <GhostButton onClick={addOne}>List me add</GhostButton>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">Bulk paste</p>
            <textarea
              value={bulkPaste}
              onChange={(e) => setBulkPaste(e.target.value)}
              placeholder={"WhatsApp Image …jpg\n…ek line me ek naam"}
              rows={3}
              className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-teal-600/40"
            />
            <GhostButton onClick={addBulk}>Paste se add karein</GhostButton>
          </div>
        </div>
      </details>
    </div>
  );
}

export default function FleetEditorPage() {
  const [forms, setForms] = useState<Record<string, CarForm>>({});
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin/fleet")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load fleet");
        return (await res.json()) as FleetBundle;
      })
      .then((b) => {
        if (cancelled) return;
        applyBundleToState(b, setFolders, setForms);
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

  function moveFolder(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= folders.length) return;
    const next = [...folders];
    const tmp = next[index];
    next[index] = next[j];
    next[j] = tmp;
    setFolders(next);
  }

  async function saveOrder() {
    setSaveState("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/admin/fleet", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ folders }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      const b = json as FleetBundle;
      applyBundleToState(b, setFolders, setForms);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch (e) {
      setSaveState("error");
      setSaveError(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function saveCar(folder: string) {
    setSaveState("saving");
    setSaveError("");
    const form = forms[folder];
    if (!form) return;
    try {
      const payload = formToCar(form);
      const res = await fetch("/api/admin/fleet", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ cars: { [folder]: payload } }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      const b = json as FleetBundle;
      const nextForms = { ...forms };
      const updated = b.cars.find((c) => c.folder === folder);
      if (updated) nextForms[folder] = carToFormState(updated.data);
      setFolders(b.folders);
      setForms(nextForms);
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
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Fleet (cars)</h1>
            <p className="mt-2 text-sm text-stone-600">
              Order homepage par isi order me dikhega. Har gaadi ki photos yahan preview ke saath add /
              remove / reorder kar sakte ho.
            </p>
          </div>
        </div>

        {saveState === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {saveError || "Something went wrong."}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-stone-500">Loading…</p>
        ) : (
          <div className="mt-8 space-y-6">
            <AdminSection title="Homepage order">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-stone-600">Up / down se order badlein, phir save karein.</p>
                <PrimaryButton onClick={saveOrder} disabled={saveState === "saving"}>
                  {saveState === "saving" ? "Saving…" : "Save order"}
                </PrimaryButton>
              </div>
              <ol className="mt-3 space-y-2">
                {folders.map((folder, idx) => (
                  <li
                    key={folder}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-200 bg-stone-50/40 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-stone-900">
                      {idx + 1}. {folder}
                    </span>
                    <div className="flex gap-2">
                      <GhostButton disabled={idx === 0} onClick={() => moveFolder(idx, -1)}>
                        Up
                      </GhostButton>
                      <GhostButton disabled={idx === folders.length - 1} onClick={() => moveFolder(idx, 1)}>
                        Down
                      </GhostButton>
                    </div>
                  </li>
                ))}
              </ol>
            </AdminSection>

            <div className="space-y-6">
              {folders.map((folder) => {
                const form = forms[folder];
                if (!form) return null;
                return (
                  <AdminSection key={folder} title={folder}>
                    <div className="grid gap-3 lg:grid-cols-2">
                      <Field
                        label="Model name (dikhta hai site par)"
                        value={form.model}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, model: v } }))}
                      />
                      <Field
                        label="Year"
                        value={form.year}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, year: v } }))}
                      />
                      <Field
                        label="Seating (number, e.g. 6)"
                        value={form.seating}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, seating: v } }))}
                      />
                      <Field
                        label="Fuel"
                        value={form.fuel}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, fuel: v } }))}
                      />
                      <Field
                        label="AC rate (/km)"
                        value={form.ac}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, ac: v } }))}
                      />
                      <Field
                        label="Non‑AC rate (/km)"
                        value={form.nonAc}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, nonAc: v } }))}
                      />
                      <Field
                        label="Per day charge (250 km)"
                        value={form.perDay}
                        onChange={(v) => setForms((s) => ({ ...s, [folder]: { ...form, perDay: v } }))}
                      />
                    </div>
                    <CarImagesEditor
                      folder={folder}
                      imageList={form.imageList}
                      onChange={(next) =>
                        setForms((s) => ({
                          ...s,
                          [folder]: { ...form, imageList: next },
                        }))
                      }
                    />
                    <div className="flex justify-end">
                      <PrimaryButton onClick={() => saveCar(folder)} disabled={saveState === "saving"}>
                        Save this car
                      </PrimaryButton>
                    </div>
                  </AdminSection>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminAuthGate>
  );
}
