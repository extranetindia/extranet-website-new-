"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Plans",
    href: "/plans",
    children: [
      { label: "Home Broadband", href: "/plans#home-broadband" },
      { label: "Business & Enterprise", href: "/plans#enterprise" },
      { label: "Compare Plans", href: "/plans" },
    ],
  },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-blue-900/5"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-50 ring-1 ring-slate-200 group-hover:ring-blue-400/60 transition-all">
              <Image
                src="/extranet-logo.png"
                alt="Extranet India"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                extra<span className="text-red-600">A</span>net
              </span>
              <div className="text-[10px] font-semibold text-blue-700/80 tracking-widest uppercase leading-none">
                India Private Limited
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                    ? "text-slate-600 font-medium"
                    : "text-slate-600 font-medium"
                  } hover:text-blue-700 hover:bg-blue-50`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+919540901195"
              className="hidden xl:flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mr-1"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="font-medium">+91 9540901195</span>
            </a>
            <Link
              href="#"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 text-sm font-semibold transition-all bg-white"
            >
              My Account
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-all shadow-md shadow-blue-900/20"
            >
              Get Connected
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2">
                <a
                  href="tel:+919540901195"
                  className="flex items-center gap-2 px-4 py-3 text-slate-600"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  +91 95409 01195
                </a>
                <Link
                  href="#"
                  className="mx-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-center text-sm"
                >
                  My Account
                </Link>
                <Link
                  href="/contact"
                  className="mx-4 py-3 rounded-xl bg-blue-700 text-white text-sm font-semibold text-center"
                >
                  Get Connected
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
