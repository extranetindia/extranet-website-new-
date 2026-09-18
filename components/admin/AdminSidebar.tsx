"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Boxes,
  MapPin,
  MessageSquare,
  Headset,
  Settings,
  FileText,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Inbox,
  Disc3,
  Globe,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navGroups: Array<{
  label: string;
  items: Array<{ label: string; href: string; icon: typeof LayoutDashboard }>;
}> = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Hero Banner", href: "/admin/hero", icon: ImageIcon },
      { label: "Plans", href: "/admin/plans", icon: Boxes },
      { label: "OTT Packages", href: "/admin/ott-packages", icon: Disc3 },
      { label: "Leads", href: "/admin/leads", icon: Inbox },
      { label: "Coverage", href: "/admin/coverage", icon: MapPin },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    ],
  },
  {
    label: "Configure",
    items: [
      { label: "Support", href: "/admin/support", icon: Headset },
      { label: "Legal Policies", href: "/admin/legal", icon: FileText },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavContent({
  collapsed,
  onToggle,
  onCloseMobile,
}: Pick<AdminSidebarProps, "collapsed" | "onToggle" | "onCloseMobile">) {
  const pathname = usePathname();
  const { signOut, loading: signingOut } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#DCE3EC] px-4 py-4">
        <Link href="/admin" className="min-w-0 shrink-0 transition-opacity hover:opacity-90" onClick={onCloseMobile}>
          <NextImage
            src="/logo.png"
            alt="Extranet"
            width={160}
            height={40}
            priority
            className={`w-auto ${collapsed ? "h-8" : "h-9"}`}
          />
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className="hidden rounded-lg border border-[#DCE3EC] p-1.5 text-[#5C6F89] transition-colors hover:border-[#11418D]/40 hover:bg-[#F4F7FC] hover:text-[#11418D] lg:block"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto p-3" aria-label="Admin">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#5C6F89]">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-[#11418D] text-white shadow-[0_4px_12px_rgba(17,65,141,0.3)]"
                        : "text-[#475569] hover:bg-[#F4F7FC] hover:text-[#11418D]"
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                    <item.icon size={18} className="shrink-0" aria-hidden />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#DCE3EC] p-3">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F4F7FC] hover:text-[#11418D] ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "View website" : undefined}
        >
          <Globe size={18} className="shrink-0" aria-hidden />
          {!collapsed && <span>View website</span>}
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          disabled={signingOut}
          title={collapsed ? "Sign out" : undefined}
          className={`mt-1 flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-[#C1170C] transition-colors hover:bg-red-50 disabled:opacity-60 ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} className="shrink-0" aria-hidden />
          {!collapsed && <span>{signingOut ? "Signing out…" : "Sign out"}</span>}
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  return (
    <>
      <aside
        className={`sticky top-0 hidden h-screen border-r border-[#DCE3EC] bg-white lg:block ${
          collapsed ? "w-20" : "w-72"
        } shrink-0 transition-[width] duration-200`}
      >
        <NavContent
          collapsed={collapsed}
          onToggle={onToggle}
          onCloseMobile={onCloseMobile}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E2B57]/50 lg:hidden">
          <aside className="h-full w-72 border-r border-[#DCE3EC] bg-white shadow-xl">
            <NavContent
              collapsed={false}
              onToggle={onToggle}
              onCloseMobile={onCloseMobile}
            />
          </aside>
        </div>
      )}
    </>
  );
}
