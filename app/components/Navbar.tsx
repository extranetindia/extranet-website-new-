"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "https://www.extranetindia.com/" },
  { label: "Plans", href: "/plans" },
  { label: "For ILL", href: "/contact" },
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link
            href="/"
            className="relative flex h-9 items-center transition-all duration-200 ease-in-out hover:opacity-90 sm:h-10"
          >
            <Image
              src="/logo.png"
              alt="Extranet"
              width={160}
              height={40}
              priority
              className="h-9 w-auto max-w-[140px] object-contain object-left sm:h-10 sm:max-w-none"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive(link.href)
                      ? "text-slate-600 font-medium"
                      : "text-slate-600 font-medium"
                  } hover:text-[#134799]`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+919540901195"
              className="hidden xl:flex items-center gap-2 text-sm text-slate-600 hover:text-[#134799] transition-all duration-200 ease-in-out mr-1"
            >
              <Phone className="w-4 h-4 text-[#134799]" />
              <span className="font-medium">+91 9540901195</span>
            </a>
            <Link
              href="https://user.extranetindia.com/Selfcare/#/login"
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-[#D2190D] hover:text-white hover:border-[#D2190D] hover:shadow-md hover:shadow-red-900/15"
            >
              My Account
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#134799] hover:bg-[#0f3b7f] text-white text-sm font-semibold transition-all duration-200 ease-in-out shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/25"
            >
              Get Connected
            </Link>
          </div>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-transparent p-2 text-slate-600 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-[#134799] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799]/20 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`min-h-[48px] rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ease-in-out ${
                    isActive(link.href)
                      ? "bg-text-[#134799] text-[#134799]"
                      : "text-slate-700 hover:bg-slate-100 hover:text-[#134799]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
                <a
                  href="tel:+919540901195"
                  className="flex min-h-[44px] items-center gap-2 px-4 py-3 text-slate-600 transition-all duration-200 ease-in-out hover:text-[#134799]"
                >
                  <Phone className="w-4 h-4 text-[#134799]" />
                  +91 95409 01195
                </a>
                <Link
                  href="https://user.extranetindia.com/Selfcare/#/login"
                  onClick={() => setMobileOpen(false)}
                  className="mx-0 min-h-[48px] rounded-xl border border-slate-200 bg-white py-3.5 text-center text-sm font-semibold text-slate-700 transition-all duration-200 ease-in-out hover:bg-[#D2190D] hover:text-white hover:border-[#D2190D] hover:shadow-md hover:shadow-red-900/15"
                >
                  My Account
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mx-0 min-h-[48px] rounded-xl bg-[#134799] py-3.5 text-center text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f]"
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
