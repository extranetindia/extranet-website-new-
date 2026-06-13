"use client";

import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function FixedHeader({ children }: { children: React.ReactNode }) {
  const { settings, loading } = useCompanySettings();
  
  // Calculate if announcement bar should be shown
  const showAnnouncement = !loading && settings?.announcement_enabled && settings?.announcement_text;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar - 48px when visible, 0 when hidden */}
      <div className={`w-full transition-all duration-200 overflow-hidden ${showAnnouncement ? 'h-12 bg-slate-900 text-white' : 'h-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <p className="text-sm font-medium">{settings?.announcement_text}</p>
        </div>
      </div>

      {/* Navbar - renders with fixed positioning relative to parent */}
      <div className="w-full bg-white">
        {children}
      </div>
    </div>
  );
}
