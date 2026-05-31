"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, LogOut, UserCircle2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

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
  const { signOut, loading } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const pageTitle = useMemo(() => titleMap[pathname] ?? "Admin", [pathname]);

  const handleLogout = async () => {
    await signOut();
  };

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
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
              disabled={loading}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
            {showLogoutConfirm && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                <p className="p-3 text-sm text-slate-900">
                  Are you sure you want to sign out?
                </p>
                <div className="flex gap-2 border-t border-slate-200 p-2">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex-1 rounded-lg bg-red-600 px-2 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                    type="button"
                  >
                    {loading ? "Logging out..." : "Sign out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
