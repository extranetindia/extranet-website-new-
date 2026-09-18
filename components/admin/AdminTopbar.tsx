"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, LogOut, UserCircle2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface AdminTopbarProps {
  onOpenMobile: () => void;
}

const titleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/hero": "Hero Banner",
  "/admin/plans": "Plans Management",
  "/admin/ott-packages": "OTT Packages",
  "/admin/ott-packages/new": "New OTT Package",
  "/admin/leads": "Leads",
  "/admin/coverage": "Coverage Management",
  "/admin/testimonials": "Testimonials Management",
  "/admin/support": "Support Settings",
  "/admin/legal": "Legal Policies",
  "/admin/settings": "General Settings",
};

function resolveTitle(pathname: string) {
  if (titleMap[pathname]) return titleMap[pathname];
  if (pathname.startsWith("/admin/ott-packages/")) return "Edit OTT Package";
  return "Admin";
}

export default function AdminTopbar({ onOpenMobile }: AdminTopbarProps) {
  const pathname = usePathname();
  const { signOut, loading } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [newLeads, setNewLeads] = useState<number | null>(null);

  const pageTitle = useMemo(() => resolveTitle(pathname), [pathname]);

  // Live "needs attention" signal — new leads awaiting follow-up.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { count } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new");
      if (mounted && typeof count === "number") setNewLeads(count);
    })();
    return () => {
      mounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#DCE3EC] bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobile}
            className="rounded-[10px] border border-[#DCE3EC] p-2 text-[#5C6F89] transition-colors hover:border-[#11418D]/40 hover:bg-[#F4F7FC] hover:text-[#11418D] lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#5C6F89]">
              Extranet Admin
            </p>
            <h1 className="truncate text-lg font-extrabold tracking-tight text-[#15366A]">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/admin/leads"
            className="relative rounded-[10px] border border-[#DCE3EC] p-2 text-[#5C6F89] transition-colors hover:border-[#11418D]/40 hover:bg-[#F4F7FC] hover:text-[#11418D]"
            aria-label={newLeads ? `${newLeads} new leads awaiting follow-up` : "View leads"}
            title="View new leads"
          >
            <Bell size={18} />
            {newLeads !== null && newLeads > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C1170C] px-1 text-[0.65rem] font-extrabold text-white">
                {newLeads > 99 ? "99+" : newLeads}
              </span>
            )}
          </Link>
          <div className="hidden items-center gap-2 rounded-[10px] border border-[#DCE3EC] bg-white px-2.5 py-1.5 min-[420px]:flex">
            <UserCircle2 className="text-[#11418D]" size={20} aria-hidden />
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#15366A]">Admin</p>
              <p className="text-[11px] text-[#5C6F89]">Content manager</p>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
              disabled={loading}
              className="rounded-[10px] border border-[#DCE3EC] p-2 text-[#5C6F89] transition-colors hover:border-[#C1170C]/40 hover:bg-red-50 hover:text-[#C1170C] disabled:opacity-50"
              aria-label="Sign out"
              aria-expanded={showLogoutConfirm}
            >
              <LogOut size={18} />
            </button>
            {showLogoutConfirm && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-[#DCE3EC] bg-white p-3 shadow-[0_20px_44px_rgba(21,54,106,0.18)]">
                <p className="text-sm font-semibold text-[#15366A]">
                  Sign out of admin?
                </p>
                <p className="mt-0.5 text-xs text-[#5C6F89]">
                  You&apos;ll need your credentials to sign back in.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="tele-btn tele-btn-outline min-h-[40px] flex-1 px-2 text-[0.8rem]"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="tele-btn tele-btn-red min-h-[40px] flex-1 px-2 text-[0.8rem]"
                    type="button"
                  >
                    {loading ? "Signing out…" : "Sign out"}
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
