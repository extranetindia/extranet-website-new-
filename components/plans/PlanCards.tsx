"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import MobileCarousel from "@/components/ui/MobileCarousel";
import type { PlanDefinition } from "@/lib/plans";

const colorMap = {
  blue: {
    badge: "border-[#134799] bg-[rgba(19,71,153,0.1)] text-[#134799]",
    icon: "bg-[rgba(19,71,153,0.1)] text-[#134799]",
    card: "border-slate-200 hover:border-[#134799] hover:shadow-[0_18px_40px_rgba(19,71,153,0.1)]",
    btn: "bg-[#134799] hover:bg-[#0f3b7f] shadow-[rgba(19,71,153,0.2)]",
    check: "text-[#134799]",
  },
  red: {
    badge: "bg-red-50 text-red-700 border-red-200",
    icon: "bg-red-50 text-red-600",
    card: "border-red-200 hover:border-red-300 ring-2 ring-red-100 shadow-lg shadow-red-100/40",
    btn: "bg-red-600 hover:bg-red-700 shadow-red-900/20",
    check: "text-red-600",
  },
};

interface PlanCardsProps {
  plans: PlanDefinition[];
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
}

function PlanCard({
  plan,
  index,
  ctaHref,
  ctaLabel,
}: {
  plan: PlanDefinition;
  index: number;
  ctaHref: string;
  ctaLabel: string;
}) {
  const c = colorMap[plan.color ?? "blue"] ?? colorMap.blue;
  const isPopular = plan.popular ?? plan.tag === "Most Popular";
  const showBadge = Boolean(plan.tag || isPopular);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`relative flex h-full flex-col justify-between gap-5 overflow-visible rounded-[16px] border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70 ${
        isPopular
          ? "border-[#d2190d] ring-2 ring-[rgba(210,25,13,0.1)] shadow-lg shadow-[rgba(210,25,13,0.4)] hover:border-[#b8160c]"
          : c.card
      }`}
    >
      {showBadge && (
        <div
          className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] ${isPopular ? "border-[#d2190d] bg-[rgba(210,25,13,0.1)] text-[#d2190d]" : "border-slate-200 bg-white text-slate-600"}`}
        >
          {plan.tag ?? "Most Popular"}
        </div>
      )}
      <div className="space-y-4 pt-3">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          {plan.speed}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-black text-slate-900 sm:text-5xl">
            {plan.price}
          </span>
          <span className="pb-1 text-sm font-semibold text-slate-500">/mo</span>
        </div>
        {plan.originalPrice ? (
          <div className="text-sm font-medium text-slate-400 line-through">
            {plan.originalPrice}
          </div>
        ) : null}
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {plan.features?.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-slate-600">
            <Check className={`mt-1 h-4 w-4 shrink-0 ${isPopular ? "text-[#d2190d]" : "text-[#134799]"}`} />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white transition duration-200 ${
          isPopular
            ? "bg-[#d2190d] hover:bg-[#b8160c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2190d] focus-visible:ring-offset-2"
            : "bg-[#134799] hover:bg-[#0f3b7f]"
        }`}
      >
        {ctaLabel}
      </Link>
    </motion.div>
  );
}

export default function PlanCards({
  plans,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  columns = 3,
}: PlanCardsProps) {
  const gridClass =
    columns === 2
      ? "hidden gap-6 overflow-visible pt-6 md:grid md:grid-cols-2 lg:gap-8"
      : "hidden items-start gap-8 overflow-visible pt-6 md:grid md:grid-cols-3 lg:gap-10";

  return (
    <>
      <MobileCarousel
        ariaLabel="Broadband plans"
        slideClassName="w-[80%] max-w-[320px] shrink-0 snap-start snap-always overflow-visible"
        trackPaddingTop="pt-7"
      >
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.id ?? plan.name}
            plan={plan}
            index={i}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        ))}
      </MobileCarousel>

      <div className={gridClass}>
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.id ?? plan.name}
            plan={plan}
            index={i}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
    </>
  );
}
