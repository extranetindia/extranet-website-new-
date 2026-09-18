"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function AnnouncementBar() {
  const { settings, loading } = useCompanySettings();
  const [isBarVisible, setIsBarVisible] = useState(true);

  // Only render if announcement is enabled and has text
  const showAnnouncement = !loading && settings?.announcement_enabled && settings?.announcement_text;

  // Handle announcement bar height based on settings and scroll
  useEffect(() => {
    if (showAnnouncement) {
      // Announcement is enabled, set initial height
      document.documentElement.style.setProperty("--announcement-bar-height", isBarVisible ? "40px" : "0px");
    } else {
      // Announcement is disabled, always 0
      document.documentElement.style.setProperty("--announcement-bar-height", "0px");
    }
  }, [showAnnouncement, isBarVisible]);

  // Handle scroll detection
  useEffect(() => {
    if (!showAnnouncement) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide bar when scrolled down more than 50px, show when scrolled back to top
      setIsBarVisible(scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAnnouncement]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        showAnnouncement && isBarVisible ? "h-10 bg-[#11418D] text-white" : "h-0 bg-transparent"
      }`}
      aria-hidden={!showAnnouncement || !isBarVisible}
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
