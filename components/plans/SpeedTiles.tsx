"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Staggered entrance for the speed tiles — measured, one wave,
 * then the section sits still and lets the numbers talk.
 */
export default function SpeedTiles({
  tiers,
  maxBusiness,
}: {
  tiers: Array<[number, number]>;
  maxBusiness: number;
}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {tiers.map(([speed, price], i) => (
        <motion.div
          key={speed}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: Math.min(i, 7) * 0.06, ease: "easeOut" }}
        >
          <Link
            href="/plans/home"
            className="group block h-full rounded-xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:bg-[#C1170C] hover:shadow-[0_18px_44px_rgba(193,23,12,0.4)] sm:p-6"
            aria-label={`${speed} Mbps plans from ${price} rupees per month`}
          >
            <p className="text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl">
              {speed.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-white/85">
              Mbps
            </p>
            <p className="mt-4 flex items-center justify-between gap-2 border-t border-white/15 pt-3 transition-colors group-hover:border-white/30">
              <span className="text-sm font-bold text-white/80 transition-colors group-hover:text-white">
                from <strong className="text-base font-extrabold text-[#FF7A71] transition-colors group-hover:text-white">₹{price.toLocaleString("en-IN")}</strong>/mo
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden />
            </p>
          </Link>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: Math.min(tiers.length, 7) * 0.06, ease: "easeOut" }}
      >
        <Link
          href="/plans/business"
          className="group flex h-full min-h-[160px] flex-col justify-between rounded-xl bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(2,12,35,0.5)] sm:p-6"
          aria-label={maxBusiness > 0 ? `Business plans up to ${maxBusiness} megabits` : "Business plans"}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C1170C]">
            Need more?
          </p>
          <p className="text-3xl font-extrabold leading-tight tracking-tight text-[#15366A] sm:text-4xl">
            {maxBusiness > 0 ? `${maxBusiness.toLocaleString("en-IN")} Mbps for business` : "Business-grade fibre"}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#11418D]">
            See business plans
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </p>
        </Link>
      </motion.div>
    </div>
  );
}
