"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Plans",
    href: "/plans",
    submenu: [
      { label: "Home Broadband", href: "/plans/home", hint: "WiFi & OTT bundles" },
      { label: "Business Internet", href: "/plans/business", hint: "Leased-line grade" },
    ],
  },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

const SALES_PHONE = "+91 9540901195";
const SALES_TEL = "tel:+919540901195";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [plansDropdownOpen, setPlansDropdownOpen] = useState(false);
  const [mobilePlansOpen, setMobilePlansOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobilePlansOpen(false);
    setPlansDropdownOpen(false);
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(21,54,106,0.10)]" : "shadow-none"
      }`}
      style={{ top: "var(--announcement-bar-height, 0px)" }}
    >
      {/* Trust strip */}
      <div className="hidden border-b border-[#DCE3EC] bg-[#F4F7FC] md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wide text-[#5C6F89]">
            Enterprise-grade fibre broadband
            <span className="mx-2 text-[#DCE3EC]" aria-hidden>|</span>
            <span className="font-medium">Serving homes &amp; businesses across India</span>
          </p>
          <div className="flex items-center gap-5 text-xs font-semibold">
            <a href={SALES_TEL} className="flex items-center gap-1.5 text-[#11418D] hover:text-[#0e3675]">
              <Phone className="h-3.5 w-3.5" />
              Sales: {SALES_PHONE}
            </a>
            <Link href="https://user.extranetindia.com/Selfcare/#/login" className="flex items-center gap-1.5 text-[#475569] hover:text-[#11418D]">
              <UserRound className="h-3.5 w-3.5" />
              Pay Bill / My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-[#DCE3EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4 sm:h-[4.5rem]">
            <Link href="/" className="flex h-10 items-center transition-opacity hover:opacity-90 sm:h-11" aria-label="Extranet India — home">
              <Image
                src="/logo.png"
                alt="Extranet"
                width={220}
                height={55}
                priority
                className="h-10 w-auto max-w-[190px] object-contain object-left sm:h-12 sm:max-w-none"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.submenu ? (
                    <div
                      onMouseEnter={() => setPlansDropdownOpen(true)}
                      onMouseLeave={() => setPlansDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setPlansDropdownOpen(!plansDropdownOpen)}
                        aria-expanded={plansDropdownOpen}
                        aria-haspopup="true"
                        className={`relative flex items-center gap-1.5 px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${
                          isActive(link.href) ? "text-[#11418D]" : "text-[#33475f] hover:text-[#11418D]"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${plansDropdownOpen ? "rotate-180" : ""}`}
                        />
                        <span
                          aria-hidden
                          className={`absolute inset-x-4 -bottom-[13px] h-[3px] rounded-t-full bg-[#C1170C] transition-opacity ${
                            isActive(link.href) || plansDropdownOpen ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {plansDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                          >
                            <div className="overflow-hidden rounded-xl border border-[#DCE3EC] bg-white shadow-[0_20px_44px_rgba(21,54,106,0.16)]">
                              <p className="border-b border-[#EDF1F6] bg-[#F4F7FC] px-5 py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[#5C6F89]">
                                Broadband plans
                              </p>
                              {link.submenu.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setPlansDropdownOpen(false)}
                                  className="block px-5 py-3.5 transition-colors hover:bg-[#F4F7FC]"
                                >
                                  <span className="block text-sm font-bold text-[#15366A]">{item.label}</span>
                                  <span className="mt-0.5 block text-xs text-[#5C6F89]">{item.hint}</span>
                                </Link>
                              ))}
                              <Link
                                href="/#finder"
                                onClick={() => setPlansDropdownOpen(false)}
                                className="block border-t border-[#EDF1F6] px-5 py-3 transition-colors hover:bg-[#F4F7FC]"
                              >
                                <span className="block text-sm font-bold text-[#11418D]">Find my perfect plan</span>
                                <span className="mt-0.5 block text-xs text-[#5C6F89]">3-question quiz, live results</span>
                              </Link>
                              <Link
                                href="/plans"
                                onClick={() => setPlansDropdownOpen(false)}
                                className="block border-t border-[#EDF1F6] px-5 py-3 text-[0.8rem] font-bold text-[#C1170C] hover:bg-red-50/50"
                              >
                                Compare all plans →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`relative block px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${
                        isActive(link.href) ? "text-[#11418D]" : "text-[#33475f] hover:text-[#11418D]"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 -bottom-[13px] h-[3px] rounded-t-full bg-[#C1170C] transition-opacity ${
                          isActive(link.href) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href="/contact"
                className="tele-btn tele-btn-primary px-5 py-2.5"
              >
                Get Connected
              </Link>
            </div>

            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[10px] p-2 text-[#15366A] hover:bg-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11418D]/30 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Brand keyline — blue → red → blue echoes the extranet wordmark */}
      <span aria-hidden className="block h-[2px] bg-gradient-to-r from-[#11418D] via-[#C1170C] to-[#11418D]" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[#DCE3EC] bg-white shadow-[0_18px_40px_rgba(21,54,106,0.14)] lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" aria-label="Mobile">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobilePlansOpen(!mobilePlansOpen)}
                        aria-expanded={mobilePlansOpen}
                        className={`flex min-h-[48px] w-full items-center justify-between rounded-[10px] px-4 py-3 text-[0.95rem] font-bold ${
                          isActive(link.href) ? "bg-[#F4F7FC] text-[#11418D]" : "text-[#15366A] hover:bg-[#F8F9FB]"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobilePlansOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobilePlansOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 flex flex-col gap-1 rounded-[10px] border border-[#DCE3EC] bg-[#F8F9FB] p-2">
                              {link.submenu.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobilePlansOpen(false);
                                  }}
                                  className="rounded-lg px-3 py-2.5 hover:bg-white"
                                >
                                  <span className="block text-sm font-bold text-[#15366A]">{item.label}</span>
                                  <span className="block text-xs text-[#5C6F89]">{item.hint}</span>
                                </Link>
                              ))}
                              <Link
                                href="/#finder"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobilePlansOpen(false);
                                }}
                                className="rounded-lg px-3 py-2.5 hover:bg-white"
                              >
                                <span className="block text-sm font-bold text-[#11418D]">Find my perfect plan</span>
                                <span className="block text-xs text-[#5C6F89]">3-question quiz, live results</span>
                              </Link>
                              <Link
                                href="/plans"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobilePlansOpen(false);
                                }}
                                className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#C1170C]"
                              >
                                Compare all plans →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block min-h-[48px] rounded-[10px] px-4 py-3 text-[0.95rem] font-bold ${
                        isActive(link.href) ? "bg-[#F4F7FC] text-[#11418D]" : "text-[#15366A] hover:bg-[#F8F9FB]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-[#DCE3EC] pt-4">
                <a href={SALES_TEL} className="flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm font-bold text-[#11418D]">
                  <Phone className="h-4 w-4" />
                  Sales: {SALES_PHONE}
                </a>
                <Link
                  href="https://user.extranetindia.com/Selfcare/#/login"
                  onClick={() => setMobileOpen(false)}
                  className="tele-btn tele-btn-outline min-h-[48px] w-full"
                >
                  Pay Bill / My Account
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="tele-btn tele-btn-primary min-h-[48px] w-full"
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
