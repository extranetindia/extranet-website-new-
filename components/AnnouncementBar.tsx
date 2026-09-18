"use client";

import { useEffect } from "react";
import { Megaphone } from "lucide-react";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function AnnouncementBar() {
  const { settings, loading } = useCompanySettings();

  // Only render if announcement is enabled and has text.
  // The bar stays pinned while enabled — it never hides on scroll, so the
  // header underneath never has to chase a moving offset (that desync used
  // to slide the wayfinding chips over the navbar on mobile).
  const showAnnouncement = !loading && Boolean(settings?.announcement_enabled) && Boolean(settings?.announcement_text);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--announcement-bar-height",
      showAnnouncement ? "40px" : "0px",
    );
  }, [showAnnouncement]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        showAnnouncement ? "h-10 bg-[#11418D] text-white" : "h-0 bg-transparent"
      }`}
      aria-hidden={!showAnnouncement}
    >
      <div className="flex h-10 w-full items-center">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
          <Megaphone className="h-3.5 w-3.5 shrink-0 text-white/80" aria-hidden />
          <p className="truncate text-[0.8rem] font-semibold tracking-wide">{settings?.announcement_text}</p>
        </div>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C1170C]" />
    </div>
  );
}
