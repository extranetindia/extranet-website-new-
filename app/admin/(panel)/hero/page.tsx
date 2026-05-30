"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { HERO_ASPECT, type HeroBannerRow } from "@/lib/cms/hero";

const BUCKET = "hero-images";

type BannerTarget = "desktop" | "mobile";

interface PendingUpload {
  file: File;
  previewUrl: string;
}

export default function AdminHeroPage() {
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const [rowId, setRowId] = useState<string | null>(null);
  const [savedDesktopUrl, setSavedDesktopUrl] = useState<string | null>(null);
  const [savedMobileUrl, setSavedMobileUrl] = useState<string | null>(null);
  const [pendingDesktop, setPendingDesktop] = useState<PendingUpload | null>(
    null,
  );
  const [pendingMobile, setPendingMobile] = useState<PendingUpload | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const desktopPreview = pendingDesktop?.previewUrl ?? savedDesktopUrl;
  const mobilePreview =
    pendingMobile?.previewUrl ?? savedMobileUrl ?? savedDesktopUrl;

  const fetchBanner = useCallback(async () => {
    const { data, error } = await supabase
      .from("hero_banner")
      .select("id, image_url, desktop_image_url, mobile_image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch hero banner:", error);
      setRowId(null);
      setSavedDesktopUrl(null);
      setSavedMobileUrl(null);
      return;
    }

    const row = data as HeroBannerRow | null;
    setRowId(row?.id ?? null);
    setSavedDesktopUrl(row?.desktop_image_url ?? row?.image_url ?? null);
    setSavedMobileUrl(row?.mobile_image_url ?? null);
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
      if (pendingDesktop?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingDesktop.previewUrl);
      }
      if (pendingMobile?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingMobile.previewUrl);
      }
    };
  }, [pendingDesktop, pendingMobile]);

  const handleFileChange = (
    target: BannerTarget,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const pending = { file, previewUrl };

    if (target === "desktop") {
      if (pendingDesktop?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingDesktop.previewUrl);
      }
      setPendingDesktop(pending);
    } else {
      if (pendingMobile?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingMobile.previewUrl);
      }
      setPendingMobile(pending);
    }
  };

  const uploadImage = async (file: File, prefix: string) => {
    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `${prefix}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  const handleSave = async () => {
    if (!pendingDesktop && !pendingMobile) return;

    setSaving(true);

    try {
      let desktopUrl = savedDesktopUrl;
      let mobileUrl = savedMobileUrl;

      if (pendingDesktop) {
        desktopUrl = await uploadImage(pendingDesktop.file, "desktop-banner");
      }

      if (pendingMobile) {
        mobileUrl = await uploadImage(pendingMobile.file, "mobile-banner");
      }

      if (!desktopUrl && mobileUrl) {
        desktopUrl = mobileUrl;
      }

      const payload = {
        desktop_image_url: desktopUrl,
        mobile_image_url: mobileUrl,
        image_url: desktopUrl,
      };

      if (rowId) {
        const { error: updateError } = await supabase
          .from("hero_banner")
          .update(payload)
          .eq("id", rowId);

        if (updateError) throw updateError;
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("hero_banner")
          .insert(payload)
          .select("id")
          .single();

        if (insertError) throw insertError;
        setRowId((inserted as HeroBannerRow).id);
      }

      if (pendingDesktop?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingDesktop.previewUrl);
      }
      if (pendingMobile?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pendingMobile.previewUrl);
      }

      setPendingDesktop(null);
      setPendingMobile(null);
      if (desktopInputRef.current) desktopInputRef.current.value = "";
      if (mobileInputRef.current) mobileInputRef.current.value = "";

      setSavedDesktopUrl(desktopUrl);
      setSavedMobileUrl(mobileUrl);
      await fetchBanner();
    } catch (err) {
      console.error("Failed to save hero banner:", err);
    } finally {
      setSaving(false);
    }
  };

  const hasPendingChanges = Boolean(pendingDesktop || pendingMobile);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Hero Banner</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload separate banners for desktop (1600×600) and mobile (1080×720).
          Visitors are sent to /plans when they click the banner.
        </p>

        <input
          ref={desktopInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange("desktop", e)}
        />
        <input
          ref={mobileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange("mobile", e)}
        />

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => desktopInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Monitor size={16} />
            Desktop Banner Upload
          </button>
          <button
            type="button"
            onClick={() => mobileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Smartphone size={16} />
            Mobile Banner Upload
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!hasPendingChanges || saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={16} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {(pendingDesktop || pendingMobile) && (
          <p className="mt-3 text-xs text-slate-500">
            {pendingDesktop && `Desktop: ${pendingDesktop.file.name}. `}
            {pendingMobile && `Mobile: ${pendingMobile.file.name}. `}
            Click Save to publish.
          </p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Monitor size={16} className="text-blue-700" />
              Desktop Preview
              <span className="font-normal text-slate-400">1600×600</span>
            </h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {loading ? (
                <div className="flex aspect-[8/3] items-center justify-center text-sm text-slate-500">
                  Loading...
                </div>
              ) : desktopPreview ? (
                <div className={`relative w-full ${HERO_ASPECT.desktop.className}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={desktopPreview}
                    alt="Desktop hero preview"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="flex aspect-[8/3] items-center justify-center text-sm text-slate-500">
                  No desktop banner uploaded
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Smartphone size={16} className="text-blue-700" />
              Mobile Preview
              <span className="font-normal text-slate-400">1080×720</span>
            </h3>
            <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {loading ? (
                <div className="flex aspect-[3/2] items-center justify-center text-sm text-slate-500">
                  Loading...
                </div>
              ) : mobilePreview ? (
                <div className={`relative w-full ${HERO_ASPECT.mobile.className}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mobilePreview}
                    alt="Mobile hero preview"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="flex aspect-[3/2] items-center justify-center text-sm text-slate-500">
                  No mobile banner — falls back to desktop
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
