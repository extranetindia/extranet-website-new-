"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, UserCircle2 } from "lucide-react";

interface AdminTopbarProps {
  onOpenMobile: () => void;
}

const titleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/hero": "Hero Banner",
  "/admin/plans": "Plans Management",
  "/admin/leads": "Leads",
  "/admin/coverage": "Coverage Management",
  "/admin/testimonials": "Testimonials Management",
  "/admin/support": "Support Settings",
  "/admin/settings": "General Settings",
};

export default function AdminTopbar({ onOpenMobile }: AdminTopbarProps) {
  const pathname = usePathname();

  const pageTitle = useMemo(() => titleMap[pathname] ?? "Admin", [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobile}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Admin
            </p>
            <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5">
            <UserCircle2 className="text-blue-700" size={20} />
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-slate-900">Admin User</p>
              <p className="text-[11px] text-slate-500">extranet.in</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
