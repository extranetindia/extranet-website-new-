"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "Plans",
    href: "#plans",
    children: [
      { label: "Home Broadband", href: "#plans" },
      { label: "Business Fiber", href: "#plans" },
      { label: "Enterprise Leased Line", href: "#plans" },
    ],
  },
  { label: "Features", href: "#features" },
  { label: "Coverage", href: "#coverage" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050a14]/95 backdrop-blur-xl border-b border-blue-900/40 shadow-[0_4px_30px_rgba(37,99,235,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300">
              <Image
                src="/extranet-logo.png"
                alt="Extranet India"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white tracking-tight">
                extra<span className="text-red-500">A</span>net
              </span>
              <div className="text-[10px] font-medium text-blue-400/80 tracking-widest uppercase leading-none">
                India Private Limited
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </a>

                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 rounded-xl bg-[#0a1628]/95 backdrop-blur-xl border border-blue-900/40 shadow-xl shadow-blue-950/40 overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-blue-900/30 transition-colors border-b border-blue-900/20 last:border-0"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918888888888"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="font-medium">+91 88888 88888</span>
            </a>
            <a
              href="#plans"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50"
            >
              Get Connected
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#080f1e]/98 backdrop-blur-xl border-t border-blue-900/30 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-slate-200 hover:text-white hover:bg-white/5 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-blue-900/30 flex flex-col gap-2">
                <a
                  href="tel:+918888888888"
                  className="flex items-center gap-2 px-4 py-3 text-slate-300"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  +91 88888 88888
                </a>
                <a
                  href="#plans"
                  onClick={() => setMobileOpen(false)}
                  className="mx-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold text-center"
                >
                  Get Connected
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
