"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Broadband plans", href: "/#plans" },
  { label: "Find my plan", href: "/#finder" },
  { label: "Why Extranet", href: "/#why-extranet" },
  { label: "OTT bundles", href: "/#ott" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Contact", href: "/contact" },
];

/**
 * Slim wayfinding bar that slides in once the hero scrolls away.
 * Fixed-positioned (tracks the navbar via the shared height var) so it
 * works regardless of overflow contexts. Links are absolute so it is
 * useful from any page.
 */
export default function SectionNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 z-40 border-b border-[#DCE3EC] bg-white/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
      style={{ top: "calc(var(--navbar-height, 3.5rem) + var(--announcement-bar-height, 0px) + 2px)" }}
    >
      <nav
        aria-label="On this page"
        className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden lg:px-8"
      >
        <span className="mr-1 hidden shrink-0 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-[#5C6F89] sm:block">
          Explore
        </span>
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            tabIndex={visible ? 0 : -1}
            className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-[#DCE3EC] bg-white px-3.5 py-2 text-xs font-bold text-[#33475f] transition-colors hover:border-[#11418D] hover:bg-[#F4F7FC] hover:text-[#11418D]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
