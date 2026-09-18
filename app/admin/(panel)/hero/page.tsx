"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Upload, Trash2, ArrowUpToLine, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { HERO_ASPECT, HERO_SLIDE_LIMIT, type HeroBannerRow } from "@/lib/cms/hero";

const BUCKET = "hero-images";

interface SlideView {
  id: string;
  desktop: string | null;
  mobile: string | null;
  created_at?: string;
}

interface PendingUpload {
  file: File;
  previewUrl: string;
}

function toSlideView(row: HeroBannerRow): SlideView {
  return {
    id: row.id,
    desktop: row.desktop_image_url ?? row.image_url ?? null,
    mobile: row.mobile_image_url ?? null,
    created_at: row.created_at,
  };
}

export default function AdminHeroPage() {
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const [slides, setSlides] = useState<SlideView[]>([]);
  const [pendingDesktop, setPendingDesktop] = useState<PendingUpload | null>(null);
  const [pendingMobile, setPendingMobile] = useState<PendingUpload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchSlides = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("hero_banner")
      .select("id, image_url, desktop_image_url, mobile_image_url, created_at")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Failed to fetch hero banners:", fetchError);
      setSlides([]);
      return;
    }

    setSlides(((data as HeroBannerRow[]) ?? []).map(toSlideView));
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSlides();
      setLoading(false);
    };
    void load();
  }, [fetchSlides]);

  // Avoid leaking blob URLs from file previews.
  useEffect(() => {
    return () => {
      for (const pending of [pendingDesktop, pendingMobile]) {
        if (pending?.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(pending.previewUrl);
        }
      }
    };
  }, [pendingDesktop, pendingMobile]);

  const handleFileChange = (
    target: "desktop" | "mobile",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const pending = { file, previewUrl: URL.createObjectURL(file) };

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

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return publicData.publicUrl;
  };

  const resetPending = () => {
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
  };

  const handleAdd = async () => {
    if (!pendingDesktop || saving) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const desktopUrl = await uploadImage(pendingDesktop.file, "desktop-banner");
      const mobileUrl = pendingMobile
        ? await uploadImage(pendingMobile.file, "mobile-banner")
        : null;

      const { error: insertError } = await supabase.from("hero_banner").insert({
        desktop_image_url: desktopUrl,
        mobile_image_url: mobileUrl,
        image_url: desktopUrl,
      });

      if (insertError) throw insertError;

      resetPending();
      await fetchSlides();
      setSuccess("New slide published — it plays first in the rotation.");
    } catch (err) {
      console.error("Failed to publish slide:", err);
      setError(err instanceof Error ? err.message : "Failed to publish slide.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slide: SlideView) => {
    if (!window.confirm("Delete this slide? Visitors will stop seeing it immediately.")) {
      return;
    }

    setBusyId(slide.id);
    setError(null);
    setSuccess(null);

    const { error: deleteError } = await supabase.from("hero_banner").delete().eq("id", slide.id);

    if (deleteError) {
      console.error("Failed to delete slide:", deleteError);
      setError(deleteError.message);
      setBusyId(null);
      return;
    }

    setSlides((previous) => previous.filter((item) => item.id !== slide.id));
    setBusyId(null);
  };

  const handleShowFirst = async (slide: SlideView) => {
    setBusyId(slide.id);
    setError(null);
    setSuccess(null);

    // Newest-first ordering drives the rotation, so refreshing the
    // timestamp moves this slide to the front without schema changes.
    const { error: updateError } = await supabase
      .from("hero_banner")
      .update({ created_at: new Date().toISOString() })
      .eq("id", slide.id);

    if (updateError) {
      console.error("Failed to reorder slide:", updateError);
      setError(updateError.message);
      setBusyId(null);
      return;
    }

    await fetchSlides();
    setBusyId(null);
  };

  return (
    <div className="space-y-6">
      <section className="tele-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-[#15366A]">Hero Slideshow</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#5C6F89]">
              The {HERO_SLIDE_LIMIT} most recent banners rotate on the homepage every few seconds,
              newest first. Desktop art should be 1600×600, mobile art 1080×720. Clicking any
              slide sends visitors to /plans.
            </p>
          </div>
          {!loading && (
            <span className="rounded-full bg-[#F4F7FC] px-3 py-1 text-xs font-bold text-[#11418D]">
              {slides.length} {slides.length === 1 ? "slide" : "slides"}
            </span>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="mt-4 rounded-[10px] border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700">
            {success}
          </p>
        )}

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

        {/* Add-slide composer */}
        <div className="mt-5 rounded-xl border border-dashed border-[#DCE3EC] bg-[#F8F9FB] p-4 sm:p-5">
          <p className="flex items-center gap-2 text-sm font-extrabold text-[#15366A]">
            <Plus size={16} aria-hidden />
            Publish a new slide
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => desktopInputRef.current?.click()}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border border-[#DCE3EC] bg-white px-4 py-2.5 text-sm font-bold text-[#33475f] transition-colors hover:border-[#11418D] hover:text-[#11418D]"
            >
              <Monitor size={16} aria-hidden />
              {pendingDesktop ? pendingDesktop.file.name : "Desktop art · 1600×600 *"}
            </button>
            <button
              type="button"
              onClick={() => mobileInputRef.current?.click()}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border border-[#DCE3EC] bg-white px-4 py-2.5 text-sm font-bold text-[#33475f] transition-colors hover:border-[#11418D] hover:text-[#11418D]"
            >
              <Smartphone size={16} aria-hidden />
              {pendingMobile ? pendingMobile.file.name : "Mobile art · 1080×720 (optional)"}
            </button>
          </div>
          {(pendingDesktop || pendingMobile) && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {pendingDesktop && (
                <div className={`relative w-full overflow-hidden rounded-lg border border-[#DCE3EC] ${HERO_ASPECT.desktop.className}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pendingDesktop.previewUrl} alt="New desktop slide preview" className="h-full w-full object-cover" />
                </div>
              )}
              <div className={`relative mx-auto w-full max-w-[220px] overflow-hidden rounded-lg border border-[#DCE3EC] ${HERO_ASPECT.mobile.className}`}>
                {pendingMobile ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={pendingMobile.previewUrl} alt="New mobile slide preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center p-4 text-center text-xs text-[#5C6F89]">
                    No mobile art — desktop art will be used on phones
                  </span>
                )}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => void handleAdd()}
            disabled={!pendingDesktop || saving}
            className="tele-btn tele-btn-primary mt-4 w-full sm:w-auto sm:px-8"
          >
            <Upload size={16} aria-hidden />
            {saving ? "Publishing…" : "Publish slide"}
          </button>
        </div>

        {/* Existing slides */}
        <div className="mt-6 space-y-4">
          {loading ? (
            [0, 1].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-xl border border-[#DCE3EC] bg-[#F4F7FC]" />
            ))
          ) : slides.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[#DCE3EC] bg-[#F8F9FB] px-4 py-10 text-center text-sm text-[#5C6F89]">
              No slides yet — publish your first banner above and it appears on the homepage instantly.
            </p>
          ) : (
            slides.map((slide, i) => (
              <article key={slide.id} className="rounded-xl border border-[#DCE3EC] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-sm font-extrabold text-[#15366A]">
                    Slide {i + 1}
                    {i === 0 ? (
                      <span className="rounded-full bg-[#C1170C] px-2.5 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-white">
                        Plays first
                      </span>
                    ) : i < HERO_SLIDE_LIMIT ? (
                      <span className="rounded-full bg-[#11418D]/10 px-2.5 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-[#11418D]">
                        In rotation
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#F4F7FC] px-2.5 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-[#5C6F89]">
                        Standby
                      </span>
                    )}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleShowFirst(slide)}
                      disabled={busyId === slide.id || i === 0}
                      title="Move this slide to the front of the rotation"
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#DCE3EC] px-3 text-xs font-bold text-[#33475f] transition-colors hover:border-[#11418D] hover:text-[#11418D] disabled:opacity-40"
                    >
                      <ArrowUpToLine size={14} aria-hidden />
                      Show first
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(slide)}
                      disabled={busyId === slide.id}
                      title="Delete this slide"
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-40"
                    >
                      <Trash2 size={14} aria-hidden />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid items-start gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                  <div className={`relative w-full overflow-hidden rounded-lg border border-[#EDF1F6] bg-[#F8F9FB] ${HERO_ASPECT.desktop.className}`}>
                    {slide.desktop ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={slide.desktop} alt={`Slide ${i + 1} desktop art`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-[#5C6F89]">No desktop art</span>
                    )}
                  </div>
                  <div className={`relative w-full overflow-hidden rounded-lg border border-[#EDF1F6] bg-[#F8F9FB] ${HERO_ASPECT.mobile.className}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.mobile ?? slide.desktop ?? ""}
                      alt={`Slide ${i + 1} mobile art`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
