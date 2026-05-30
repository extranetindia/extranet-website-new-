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
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Banner", href: "/admin/hero", icon: ImageIcon },
  { label: "Plans", href: "/admin/plans", icon: Boxes },
  { label: "Coverage", href: "/admin/coverage", icon: MapPin },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Support", href: "/admin/support", icon: Headset },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function NavContent({
  collapsed,
  onToggle,
  onCloseMobile,
}: Pick<AdminSidebarProps, "collapsed" | "onToggle" | "onCloseMobile">) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <Link href="/admin" className="min-w-0 shrink-0" onClick={onCloseMobile}>
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
          className="hidden rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100 lg:block"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </Link>
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
        className={`hidden border-r border-slate-200 bg-white lg:block ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <NavContent
          collapsed={collapsed}
          onToggle={onToggle}
          onCloseMobile={onCloseMobile}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden">
          <aside className="h-full w-72 border-r border-slate-200 bg-white shadow-xl">
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
