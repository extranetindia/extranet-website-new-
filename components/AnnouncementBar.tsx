"use client";

import { useEffect, useState } from "react";
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
      document.documentElement.style.setProperty("--announcement-bar-height", isBarVisible ? "48px" : "0px");
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
        showAnnouncement && isBarVisible ? "h-12 bg-slate-900 text-white" : "h-0 bg-transparent"
      }`}
    >
      <div className="w-full h-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium">{settings?.announcement_text}</p>
        </div>
      </div>
    </div>
  );
}
