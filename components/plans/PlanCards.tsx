"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
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
    btn: "bg-[#D2190D] hover:bg-[#b8160c] shadow-red-900/20",
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
  const displayLabel = formatPlanLabel(plan.speed);
  const displayTitle = formatPlanTitle(plan.name, displayLabel);
  const displayPrice = String(plan.price ?? "").replace(/\s*\*+$/, "");
  const benefits = plan.features?.filter(isDisplayBenefit) ?? [];
  const hasOttApps = (plan.ottApps ?? []).length > 0;
  const pricingTone = isPopular ? "text-[#d2190d]" : "text-[#134799]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`relative flex h-full min-w-0 flex-col overflow-visible rounded-[18px] border bg-white p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 sm:p-5 ${
        isPopular
          ? "border-2 border-[#d2190d] shadow-[0_14px_34px_rgba(210,25,13,0.12)] hover:border-[#b8160c] hover:shadow-[0_18px_38px_rgba(210,25,13,0.15)]"
          : `${c.card} shadow-[0_10px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_34px_rgba(15,23,42,0.1)]`
      }`}
    >
      {showBadge && (
        <div
          className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm sm:px-4 sm:text-[11px] ${isPopular ? "bg-[#d2190d] text-white" : "border border-slate-200 bg-white text-slate-600"}`}
        >
          {isPopular ? (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Most Popular
            </span>
          ) : (
            plan.tag
          )}
        </div>
      )}
      <div className="space-y-1 pt-3">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#d2190d]">{displayLabel}</div>
        {displayTitle ? (
          <h3 className="text-xl font-black leading-tight text-slate-900 sm:text-2xl">{displayTitle}</h3>
        ) : null}
        {plan.tagline ? (
          <p className="mt-2 text-sm text-slate-600">{plan.tagline}</p>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner shadow-slate-100">
        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>Plan Charges (Excl. GST)</span>
          {plan.savingsBadge ? (
            <span className="rounded-full bg-[#d2190d] px-2.5 py-1 text-[10px] font-bold text-white">{plan.savingsBadge}</span>
          ) : null}
        </div>
        <div className="mt-3 flex items-end gap-2">
          <span className={`text-3xl font-black leading-none sm:text-4xl ${pricingTone}`}>₹{displayPrice}</span>
          <span className="pb-1 text-sm font-semibold text-slate-500">/month</span>
        </div>

        {(plan.setupFee || plan.securityDeposit) && (
          <>
            <div className="my-3 border-t border-slate-300" />
            <div className="space-y-2.5">
              {plan.setupFee && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 sm:text-sm">One-time Setup Fee</span>
                  <span className="font-semibold text-slate-900">{plan.setupFee}</span>
                </div>
              )}
              {plan.securityDeposit && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 sm:text-sm">Security Deposit</span>
                  <span className="font-semibold text-slate-900">{plan.securityDeposit} <span className="text-xs text-slate-600">Refundable</span></span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {hasOttApps ? (
        <div className="mt-4 rounded-2xl border border-[#134799]/10 bg-blue-50/60 p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#134799]">
            <Sparkles className="h-4 w-4" /> OTT Bundle
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.ottApps?.map((app) => (
              <span key={app} className="rounded-full border border-[#134799]/20 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">{app}</span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="my-4 border-t border-slate-200" />
      <ul className="flex flex-1 flex-col gap-2">
        {benefits.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-slate-600">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isPopular ? "text-[#d2190d]" : "text-[#134799]"}`} />
            <span className="text-sm leading-5 text-slate-600">{feat}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-5 min-h-[46px] w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all duration-200 ease-in-out ${
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

function formatPlanLabel(speed: string) {
  const cleaned = speed.replace(/[_-]+/g, " ").trim();
  const speedMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*(M|G)?\s*BPS/i);

  if (speedMatch) {
    const unit = speedMatch[2]?.toUpperCase() === "G" ? "GBPS" : "MBPS";
    return `${speedMatch[1]} ${unit}`;
  }

  return cleaned.toUpperCase();
}

function formatPlanTitle(name: string, displayLabel: string) {
  if (looksLikePlanSlug(name)) return "";
  if (formatPlanLabel(name) === displayLabel) return "";
  return name;
}

function looksLikePlanSlug(name: string) {
  return /[_-]/.test(name) && /\d/.test(name) && /mbps|gbps/i.test(name);
}

function isDisplayBenefit(feature: string) {
  const normalized = feature.toLowerCase();
  return !(
    normalized.includes("refundable") ||
    normalized.includes("security deposit") ||
    normalized.includes("gst")
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
      : "hidden gap-8 overflow-visible pt-6 md:grid md:grid-cols-3 lg:gap-10";

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
