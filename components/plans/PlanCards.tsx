"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, Clapperboard } from "lucide-react";
import MobileCarousel from "@/components/ui/MobileCarousel";
import OttAppsAccordion from "@/components/OttAppsAccordion";
import type { OttPackageRow } from "@/lib/database/schema";
import type { SupabasePlanCard } from "@/lib/plans/format-plan";

interface PlanCardsProps {
  plans: SupabasePlanCard[];
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
  ottPackages?: Map<string, OttPackageRow>;
}

function PlanCard({
  plan,
  index,
  ctaHref,
  ctaLabel,
  ottPackage,
}: {
  plan: SupabasePlanCard;
  index: number;
  ctaHref: string;
  ctaLabel: string;
  ottPackage?: OttPackageRow | null;
}) {
  const isPopular = plan.popular ?? plan.tag === "Most Popular";
  const showBadge = Boolean(plan.tag || isPopular);
  const displayLabel = formatPlanLabel(plan.speed);
  const displayTitle = formatPlanTitle(plan.name, displayLabel);
  const displayPrice = String(plan.price ?? "").replace(/\s*\*+$/, "");
  const benefits = plan.features?.filter(isDisplayBenefit) ?? [];
  const hasOttApps = (plan.ottApps ?? []).length > 0;
  const formattedSetupFee = formatFeeValue(plan.setupFee);
  const formattedSecurityDeposit = formatFeeValue(plan.securityDeposit);
  const inclGst = inclGstPrice(plan.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, delay: Math.min(index, 5) * 0.06 }}
      className={`relative flex h-full min-w-0 flex-col rounded-xl border bg-white transition-all duration-200 hover:-translate-y-0.5 ${
        isPopular
          ? "border-2 border-[#C1170C] shadow-[0_16px_38px_rgba(193,23,12,0.13)]"
          : "border-[#DCE3EC] border-t-4 border-t-[#11418D] shadow-[0_2px_10px_rgba(21,54,106,0.06)] hover:border-[#11418D]/40 hover:border-t-[#11418D] hover:shadow-[0_14px_30px_rgba(17,65,141,0.12)]"
      }`}
    >
      {showBadge && (
        <div
          className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] ${
            isPopular
              ? "bg-[#C1170C] text-white shadow-[0_4px_12px_rgba(193,23,12,0.35)]"
              : "border border-[#DCE3EC] bg-white text-[#5C6F89]"
          }`}
        >
          {isPopular ? (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-current" aria-hidden />
              Most Popular
            </span>
          ) : (
            plan.tag
          )}
        </div>
      )}

      {/* 1 — Plan identity */}
      <div className="px-5 pt-6 sm:px-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C1170C]">
          {displayLabel}
        </p>
        {displayTitle ? (
          <h3 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-[#15366A]">
            {displayTitle}
          </h3>
        ) : null}
        {plan.tagline ? (
          <p className="mt-1.5 text-[0.83rem] leading-relaxed text-[#5C6F89]">{plan.tagline}</p>
        ) : null}
      </div>

      {/* 2 — Speed + monthly price */}
      <div className="mx-5 mt-4 rounded-[10px] bg-[#F4F7FC] p-4 sm:mx-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#5C6F89]">
            {plan.period === "/month" ? "Per month · excl. GST" : `Per ${plan.period.replace("/", "")} · excl. GST`}
          </span>
          {plan.savingsBadge ? (
            <span className="rounded-full bg-[#C1170C] px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-white">
              {plan.savingsBadge}
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className={`text-[2rem] font-extrabold leading-none tracking-tight ${isPopular ? "text-[#C1170C]" : "text-[#11418D]"}`}>
            ₹{displayPrice}
          </span>
          <span className="text-sm font-bold text-[#5C6F89]">{plan.period}</span>
        </div>
        {inclGst ? (
          <p className="mt-1 text-xs font-medium text-[#5C6F89]">
            ₹{inclGst} {plan.period} inclusive of 18% GST
          </p>
        ) : null}

        {(formattedSetupFee || formattedSecurityDeposit) && (
          <dl className="mt-3 space-y-1.5 border-t border-[#DCE3EC] pt-3">
            {formattedSetupFee && (
              <div className="flex items-center justify-between text-[0.8rem]">
                <dt className="font-medium text-[#5C6F89]">One-time setup</dt>
                <dd className="font-bold text-[#15366A]">{formattedSetupFee}</dd>
              </div>
            )}
            {formattedSecurityDeposit && (
              <div className="flex items-center justify-between text-[0.8rem]">
                <dt className="font-medium text-[#5C6F89]">Security deposit</dt>
                <dd className="font-bold text-[#15366A]">
                  {formattedSecurityDeposit === "FREE" ? "Free" : `${formattedSecurityDeposit} (refundable)`}
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>

      {/* 3 — OTT benefits */}
      {hasOttApps ? (
        <div className="mx-5 mt-3 rounded-[10px] border border-[#11418D]/15 bg-[#11418D]/[.04] p-3.5 sm:mx-6">
          <p className="flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-[#11418D]">
            <Clapperboard className="h-3.5 w-3.5" aria-hidden /> OTT bundle included
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {plan.ottApps?.map((app) => (
              <span key={app} className="rounded-full border border-[#11418D]/20 bg-white px-2.5 py-1 text-xs font-semibold text-[#33475f]">{app}</span>
            ))}
          </div>
        </div>
      ) : null}

      {plan.planType === "wifi_ott" && plan.ottPackageId && ottPackage && (
        <div className="mx-5 mt-3 sm:mx-6">
          <OttAppsAccordion
            packageName={ottPackage.name}
            description={ottPackage.description}
            apps={ottPackage.apps}
          />
        </div>
      )}

      {/* 4 — Key benefits */}
      {benefits.length > 0 ? (
        <ul className="flex flex-1 flex-col gap-2 px-5 pt-4 sm:px-6">
          {benefits.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-[#33475f]">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isPopular ? "text-[#C1170C]" : "text-[#11418D]"}`} aria-hidden />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}

      {/* 5 — CTA */}
      <div className="p-5 pt-4 sm:p-6 sm:pt-4">
        <Link
          href={ctaHref}
          className={`tele-btn w-full ${isPopular ? "tele-btn-red" : "tele-btn-primary"}`}
        >
          {ctaLabel}
        </Link>
      </div>
    </motion.article>
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

/** GST-inclusive per-period price, formatted for en-IN. Null when unparseable. */
function inclGstPrice(value: string | null | undefined): string | null {
  if (!value) return null;
  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return Math.round(numeric * 1.18).toLocaleString("en-IN");
}

function formatFeeValue(value: string | null | undefined): string | null {  if (!value) return null;

  const trimmedValue = value.toString().trim();
  const normalized = trimmedValue.toLowerCase();

  if (normalized === "0" || normalized === "free" || normalized === "waived") {
    return "FREE";
  }

  const numericValue = Number(trimmedValue.replace(/[^\d.-]/g, ""));
  if (!Number.isNaN(numericValue)) {
    return `₹${numericValue.toLocaleString("en-IN")}`;
  }

  return trimmedValue;
}

export default function PlanCards({
  plans,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  columns = 3,
  ottPackages = new Map(),
}: PlanCardsProps) {
  const gridClass =
    columns === 2
      ? "hidden gap-6 overflow-visible pt-6 md:grid md:grid-cols-2"
      : "hidden gap-5 overflow-visible pt-6 md:grid md:grid-cols-3 xl:gap-6";

  return (
    <>
      <MobileCarousel
        ariaLabel="Broadband plans"
        slideClassName="w-[82%] max-w-[320px] shrink-0 snap-start snap-always overflow-visible"
        trackPaddingTop="pt-7"
      >
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.id ?? plan.name}
            plan={plan}
            index={i}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
            ottPackage={plan.ottPackageId ? ottPackages.get(plan.ottPackageId) : null}
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
            ottPackage={plan.ottPackageId ? ottPackages.get(plan.ottPackageId) : null}
          />
        ))}
      </div>
    </>
  );
}
