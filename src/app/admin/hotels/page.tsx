"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HotelEntry, HotelsFile } from "@/lib/companyTypes";
import AdminAuthGate from "../_components/AdminAuthGate";
import { AdminSection, Field, GhostButton, PrimaryButton } from "../_components/admin-fields";

type SaveState = "idle" | "saving" | "saved" | "error";

function hotelImageSrc(filename: string) {
  const n = filename.split("/").map(encodeURIComponent).join("/");
  return `/Hotel/${n}`;
}

export default function HotelsEditorPage() {
  const [data, setData] = useState<HotelsFile>({ hotels: [] });
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingRow, setUploadingRow] = useState<number | null>(null);
  const [uploadErr, setUploadErr] = useState("");

  const bulkInputRef = useRef<HTMLInputElement>(null);
  const rowInputRef = useRef<HTMLInputElement>(null);
  const pendingRowRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin/hotels")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load hotels");
        return (await res.json()) as HotelsFile;
      })
      .then((json) => {
        if (!cancelled) setData(json);
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
    setSaveState("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/admin/hotels", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      setData(json as HotelsFile);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch (e) {
      setSaveState("error");
      setSaveError(e instanceof Error ? e.message : "Save failed");
    }
  }

  const hotels = data.hotels ?? [];

  function updateRow(index: number, patch: Partial<HotelEntry>) {
    const next = hotels.map((h, i) => (i === index ? { ...h, ...patch } : h));
    setData({ hotels: next });
  }

  async function postUpload(files: FileList): Promise<string[]> {
    const fd = new FormData();
    for (const f of Array.from(files)) fd.append("files", f);
    const res = await fetch("/api/admin/hotels/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const j = (await res.json().catch(() => ({}))) as { error?: string; filenames?: string[] };
    if (!res.ok) throw new Error(j.error || "Upload failed");
    return j.filenames ?? [];
  }

  async function onBulkFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    e.target.value = "";
    if (!list?.length) return;
    setUploading(true);
    setUploadErr("");
    try {
      const names = await postUpload(list);
      const rows = names.map((image) => ({ name: "", image }));
      setData({ hotels: [...hotels, ...rows] });
    } catch (err) {
      setUploadErr(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onRowFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    e.target.value = "";
    const idx = pendingRowRef.current;
    pendingRowRef.current = null;
    if (!list?.length || idx === null) return;
    setUploading(true);
    setUploadingRow(idx);
    setUploadErr("");
    try {
      const names = await postUpload(list);
      const first = names[0];
      if (first) updateRow(idx, { image: first });
    } catch (err) {
      setUploadErr(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setUploadingRow(null);
    }
  }

  return (
    <AdminAuthGate>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Hotels</h1>
            <p className="mt-2 text-sm text-stone-600">
              Photos <code className="rounded bg-stone-100 px-1">public/Hotel/</code> me save hoti
              hain. <strong>Gallery se chunein</strong> ya har property ke liye alag photo set karein —
              phir <strong>Save changes</strong>.
            </p>
          </div>
          <PrimaryButton disabled={loading || saveState === "saving"} onClick={onSave}>
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save changes"}
          </PrimaryButton>
        </div>

        {saveState === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {saveError || "Something went wrong."}
          </div>
        )}

        <input
          ref={bulkInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-hidden
          onChange={onBulkFiles}
        />
        <input
          ref={rowInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-hidden
          onChange={onRowFile}
        />

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-dashed border-teal-700/30 bg-teal-50/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-900">
              Kai photos — nayi properties
            </p>
            <p className="mt-1 text-xs text-stone-600">
              Har selected photo ek naya hotel row banayegi (naam baad me likh sakte ho).
            </p>
            {uploadErr && (
              <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                {uploadErr}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <PrimaryButton
                disabled={loading || uploading}
                onClick={() => {
                  setUploadErr("");
                  bulkInputRef.current?.click();
                }}
              >
                {uploading ? "Upload…" : "Gallery se kai photos add karein"}
              </PrimaryButton>
              <GhostButton
                disabled={loading}
                onClick={() => setData({ hotels: [...hotels, { name: "", image: "" }] })}
              >
                Khali row add
              </GhostButton>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-stone-600">
              {loading ? "Loading…" : `${hotels.length} properties`}
            </p>
          </div>

          <AdminSection title="Hotel list">
            <div className="space-y-6">
              {hotels.map((h, idx) => (
                <div
                  key={`${idx}-${h.image || "empty"}`}
                  className="rounded-xl border border-stone-200 bg-stone-50/40 p-4"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,200px)_1fr_auto] lg:items-start">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px] overflow-hidden rounded-xl border border-stone-200 bg-stone-200 lg:mx-0">
                      {h.image.trim() ? (
                        <Image
                          src={hotelImageSrc(h.image)}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="220px"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full min-h-[120px] items-center justify-center px-2 text-center text-xs text-stone-500">
                          Abhi koi photo nahi — gallery se chunein
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-3">
                      <Field
                        label="Display name"
                        value={h.name}
                        onChange={(v) => updateRow(idx, { name: v })}
                        placeholder="Property name"
                      />
                      <details className="rounded-lg border border-stone-200 bg-white px-3 py-2">
                        <summary className="cursor-pointer text-xs font-medium text-stone-700">
                          Advanced: image filename manually
                        </summary>
                        <div className="mt-2">
                          <Field
                            label="Filename (public/Hotel/ ke andar)"
                            value={h.image}
                            onChange={(v) => updateRow(idx, { image: v })}
                            placeholder="photo.jpg"
                          />
                        </div>
                      </details>
                      <PrimaryButton
                        disabled={uploading}
                        onClick={() => {
                          setUploadErr("");
                          pendingRowRef.current = idx;
                          requestAnimationFrame(() => rowInputRef.current?.click());
                        }}
                      >
                        {uploadingRow === idx ? "Upload…" : "Gallery / device se photo"}
                      </PrimaryButton>
                    </div>

                    <GhostButton
                      onClick={() => setData({ hotels: hotels.filter((_, i) => i !== idx) })}
                      disabled={hotels.length <= 0}
                    >
                      Delete
                    </GhostButton>
                  </div>
                </div>
              ))}
              {!loading && hotels.length === 0 && (
                <p className="text-sm text-stone-500">Upar se photos add karein ya khali row add karein.</p>
              )}
            </div>
          </AdminSection>
        </div>
      </div>
    </AdminAuthGate>
  );
}
