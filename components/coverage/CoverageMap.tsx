"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building, Home, Radio, Search, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const coverageTypes = [
  {
    icon: Home,
    title: "Residential Fiber",
    description:
      "FTTH (Fiber to the Home) with speeds from 50 Mbps to 1 Gbps. Available in 50+ cities across India.",
    count: "50+ Cities",
  },
  {
    icon: Building,
    title: "Business Leased Line",
    description:
      "Dedicated fiber for commercial buildings, IT parks, and campuses with guaranteed SLAs.",
    count: "80+ Business Zones",
  },
  {
    icon: Radio,
    title: "Last-Mile Wireless",
    description:
      "High-capacity fixed wireless for areas where fiber deployment is in progress.",
    count: "40+ Towns",
  },
];

export interface CoverageCity {
  id: string;
  name: string;
}

export default function CoverageMap({ cities }: { cities: CoverageCity[] }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query, cities]);

  const searched = query.trim().length > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        {coverageTypes.map((type, i) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 5) * 0.07 }}
            className="tele-card tele-card-hover p-6"
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${
              i % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
            }`}>
              <type.icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="mb-1 text-[1.7rem] font-extrabold tracking-tight text-[#11418D]">{type.count}</div>
            <h3 className="mb-1.5 text-base font-extrabold text-[#15366A]">{type.title}</h3>
            <p className="text-sm leading-relaxed text-[#5C6F89]">{type.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Live sector checker — powered by the real coverage database */}
      <div className="relative overflow-hidden rounded-xl bg-[#15366A] p-6 sm:p-10">
        <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#C1170C]/20 blur-[110px]" />
        <div aria-hidden className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#11418D]/50 blur-[110px]" />
        <div className="relative grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="tele-eyebrow text-white/60">Serviceability</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Is Extranet live in your sector?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Search your sector or locality below — the checker runs against our live
              coverage database{cities.length > 0 ? `, currently ${cities.length} sectors strong` : ""}.
            </p>
            <div className="relative mt-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" aria-hidden />
              <label htmlFor="coverage-search" className="sr-only">
                Search your sector or locality
              </label>
              <input
                id="coverage-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “Sigma”, “Kasna”, “Ecotech”…"
                autoComplete="off"
                className="min-h-[52px] w-full rounded-[10px] border border-white/25 bg-white/10 py-3 pl-12 pr-4 text-[0.95rem] font-medium text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none"
              />
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 sm:p-6" aria-live="polite">
            <AnimatePresence mode="wait">
            {!searched && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <p className="text-sm font-extrabold text-[#15366A]">Start typing to check instantly</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cities.slice(0, 8).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setQuery(c.name)}
                      className="inline-flex min-h-[40px] items-center rounded-full border border-[#DCE3EC] px-3 py-2 text-xs font-bold text-[#33475f] transition-colors hover:border-[#11418D] hover:text-[#11418D]"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {searched && matches.length > 0 && (
              <motion.div
                key={`hit-${query.trim().toLowerCase()}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p className="flex items-center gap-2 text-sm font-extrabold text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                  Great news — we&apos;re live near you
                </p>
                <ul className="mt-3 space-y-2">
                  {matches.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-[#15366A]">
                        <MapPin className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        {c.name}
                      </span>
                      <Link href="/plans" className="shrink-0 text-[0.8rem] font-extrabold text-[#C1170C] hover:underline">
                        View plans →
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {searched && matches.length === 0 && (
              <motion.div
                key="miss"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p className="text-sm font-extrabold text-[#15366A]">
                  “{query.trim()}” isn&apos;t on our live list — yet.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5C6F89]">
                  We&apos;re expanding across Greater Noida every month. Drop your address
                  and we&apos;ll confirm feasibility — enterprise sites can request a
                  priority build-out survey.
                </p>
                <Link href="/contact" className="tele-btn tele-btn-primary mt-4 w-full sm:w-auto sm:px-6">
                  Request feasibility check
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            )}
            </AnimatePresence>
            <p className="mt-4 border-t border-[#EDF1F6] pt-3 text-xs leading-relaxed text-[#5C6F89]">
              Prefer to talk? Call{" "}
              <a href="tel:+919540901195" className="font-bold text-[#11418D] hover:underline">
                +91 95409 01195
              </a>{" "}
              — sales &amp; support, 24×7.
            </p>
          </div>
        </div>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
      </div>

      <div className="flex flex-col items-stretch gap-3 rounded-xl border border-[#DCE3EC] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#C1170C]/10 text-[#C1170C]">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-extrabold text-[#15366A]">Expanding across Greater Noida</h3>
            <p className="mt-0.5 text-sm text-[#5C6F89]">
              Wireless backhaul bridges gaps until FTTH goes live in your town.
            </p>
          </div>
        </div>
        <Link href="/plans" className="tele-btn tele-btn-outline shrink-0 px-6">
          Browse plans
        </Link>
      </div>
    </div>
  );
}
