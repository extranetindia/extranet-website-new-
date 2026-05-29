"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface HeroBannerRow {
  id: string;
  image_url: string | null;
  created_at?: string;
}

const BUCKET = "hero-images";

export default function AdminHeroPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rowId, setRowId] = useState<string | null>(null);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const displayUrl = previewUrl ?? savedImageUrl;

  const fetchBanner = useCallback(async () => {
    const { data, error } = await supabase
      .from("hero_banner")
      .select("id, image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch hero banner:", error);
      setRowId(null);
      setSavedImageUrl(null);
      return;
    }

    const row = data as HeroBannerRow | null;
    setRowId(row?.id ?? null);
    setSavedImageUrl(row?.image_url ?? null);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchBanner();
      setLoading(false);
    };
    void load();
  }, [fetchBanner]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setSaving(true);

    const extension = selectedFile.name.split(".").pop() || "jpg";
    const filePath = `banner-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: selectedFile.type || undefined,
      });

    if (uploadError) {
      console.error("Failed to upload hero image:", uploadError);
      setSaving(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    const imageUrl = publicData.publicUrl;

    if (rowId) {
      const { error: updateError } = await supabase
        .from("hero_banner")
        .update({ image_url: imageUrl })
        .eq("id", rowId);

      if (updateError) {
        console.error("Failed to update hero banner:", updateError);
        setSaving(false);
        return;
      }
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from("hero_banner")
        .insert({ image_url: imageUrl })
        .select("id")
        .single();

      if (insertError) {
        console.error("Failed to insert hero banner:", insertError);
        setSaving(false);
        return;
      }

      setRowId((inserted as HeroBannerRow).id);
    }

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setSavedImageUrl(imageUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    await fetchBanner();
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Hero Banner</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload the homepage hero image. Visitors are sent to /plans when they
          click the banner.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ImagePlus size={16} />
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!selectedFile || saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={16} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Current Banner Preview</h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {loading ? (
              <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                Loading banner...
              </div>
            ) : displayUrl ? (
              <div className="relative aspect-[21/9] w-full min-h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayUrl}
                  alt="Hero banner preview"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                No banner uploaded yet. Choose an image and click Save.
              </div>
            )}
          </div>
          {selectedFile && (
            <p className="mt-2 text-xs text-slate-500">
              New image selected: {selectedFile.name}. Click Save to publish.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
