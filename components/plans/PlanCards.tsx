"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import MobileCarousel from "@/components/ui/MobileCarousel";
import type { PlanDefinition } from "@/lib/plans";

const colorMap = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "bg-blue-50 text-blue-700",
    card: "border-slate-200 hover:border-blue-300 hover:shadow-blue-100/50",
    btn: "bg-blue-700 hover:bg-blue-800 shadow-blue-900/20",
    check: "text-blue-600",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`relative flex h-full min-h-[480px] flex-col gap-5 rounded-2xl border bg-white p-6 transition-all duration-300 sm:min-h-[520px] sm:gap-6 sm:p-8 md:min-h-[650px] ${c.card} ${isPopular ? "md:-mt-2 md:mb-2" : ""}`}
    >
      {(plan.tag || isPopular) && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider ${c.badge}`}
        >
          {plan.tag ?? "Most Popular"}
        </div>
      )}
      <div>
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${c.icon}`}
        >
          <Zap className="h-5 w-5" />
        </div>
        <h3 className="mb-1 text-xl font-bold text-slate-900">{plan.name}</h3>
        <p className="text-sm text-slate-500">{plan.description}</p>
      </div>
      <div>
        <div className="mb-1 text-3xl font-black text-slate-900">{plan.speed}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-900 sm:text-4xl">
            {plan.price}
          </span>
          {plan.period && (
            <span className="font-medium text-slate-500">{plan.period}</span>
          )}
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.features?.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${c.check}`} />
            <span className="text-slate-600">{feat}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`w-full min-h-[44px] rounded-xl py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] ${c.btn}`}
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
      ? "hidden gap-6 md:grid md:grid-cols-2 lg:gap-8"
      : "hidden items-start gap-8 md:grid md:grid-cols-3 lg:gap-10";

  return (
    <>
      <MobileCarousel ariaLabel="Broadband plans" slideClassName="w-[82%] max-w-[320px] shrink-0 snap-start snap-always">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.name}
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
            key={plan.name}
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
