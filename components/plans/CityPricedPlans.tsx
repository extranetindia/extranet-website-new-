"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CitySelector from "@/components/city/CitySelector";
import BillingCycleSwitcher, { type BillingCycleValue } from "@/components/plans/BillingCycleSwitcher";
import PlanCards from "@/components/plans/PlanCards";
import PlanCompareTable from "@/components/plans/PlanCompareTable";
import type { PlanRow, OttPackageRow } from "@/lib/database/schema";
import {
  fetchPlanPricingRowsForCity,
  mergeBillingCyclePricingIntoPlans,
  mergeResolvedPricesIntoPlans,
  resolvePlansPricesForCity,
} from "@/lib/database/plan-pricing";
import { getOttPackagesByIds } from "@/lib/database/ott-packages";
import { useSelectedCity } from "@/lib/hooks/useSelectedCity";
import {
  formatSupabasePlanForCards,
  type SupabasePlanCard,
} from "@/lib/plans/format-plan";

const pricingCache = new Map<string, Awaited<ReturnType<typeof resolvePlansPricesForCity>>["data"]>();

function getPricingCacheKey(cityId: string, plans: PlanRow[]) {
  return `${cityId}:${plans.map((plan) => plan.id).join(",")}`;
}

interface CityPricedPlansProps {
  basePlans: PlanRow[];
  variant: "home" | "plans";
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
  renderControls?: React.ReactNode;
}

function PlanCardsSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="min-h-[420px] animate-pulse rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] md:min-h-[520px]"
        />
      ))}
    </div>
  );
}

export default function CityPricedPlans({
  basePlans,
  variant,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  columns = 3,
  renderControls,
}: CityPricedPlansProps) {
  // Determine plan type for coverage filtering
  const hasBusiness = basePlans.some((p) => p.plan_type === "business");
  const planType = hasBusiness ? "business" : "home";

  const { cities, cityId, setCityId, loading: citiesLoading, ready } =
    useSelectedCity(planType);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycleValue>("monthly");
  const [displayPlans, setDisplayPlans] = useState<SupabasePlanCard[]>(() =>
    basePlans.map((plan) => formatSupabasePlanForCards(plan)),
  );
  const [ottPackages, setOttPackages] = useState<Map<string, OttPackageRow>>(new Map());
  const requestIdRef = useRef(0);

  const applyPricing = useCallback(
    async (targetCityId: string) => {
      const requestId = ++requestIdRef.current;
      setPricingLoading(true);

      const cacheKey = getPricingCacheKey(targetCityId, basePlans);
      let resolved = pricingCache.get(cacheKey);

      if (!resolved) {
        const result = await resolvePlansPricesForCity(basePlans, targetCityId);
        if (requestId !== requestIdRef.current) return;

        if (result.error) {
          setDisplayPlans(basePlans.map((plan) => formatSupabasePlanForCards(plan)));
          setPricingLoading(false);
          return;
        }

        resolved = result.data;
        pricingCache.set(cacheKey, resolved);
      }

      // Merge standard pricing overrides
      let merged = mergeResolvedPricesIntoPlans(basePlans, resolved);

      // Also fetch and merge billing-cycle pricing from plan_pricing
      const { data: pricingRows, error: pricingError } = await fetchPlanPricingRowsForCity(targetCityId);
      if (!pricingError && pricingRows) {
        merged = mergeBillingCyclePricingIntoPlans(merged, pricingRows);
      }

      setDisplayPlans(merged.map((plan) => formatSupabasePlanForCards(plan)));
      setPricingLoading(false);
    },
    [basePlans],
  );

  useEffect(() => {
    if (!ready || !cityId) {
      setDisplayPlans(basePlans.map((plan) => formatSupabasePlanForCards(plan)));
      return;
    }

    void applyPricing(cityId);
  }, [ready, cityId, basePlans, applyPricing]);

  // Load OTT packages for plans that have ott_package_id
  useEffect(() => {
    const loadOttPackages = async () => {
      const ottPackageIds = basePlans
        .filter((plan) => plan.ott_package_id)
        .map((plan) => plan.ott_package_id as string);

      if (ottPackageIds.length === 0) {
        setOttPackages(new Map());
        return;
      }

      const { data, error } = await getOttPackagesByIds(ottPackageIds);
      if (error) {
        console.error("Failed to load OTT packages:", error);
        return;
      }

      if (data) {
        const packageMap = new Map<string, OttPackageRow>();
        data.forEach((pkg) => {
          packageMap.set(pkg.id, pkg);
        });
        setOttPackages(packageMap);
      }
    };

    void loadOttPackages();
  }, [basePlans]);

  const cyclePlans = displayPlans.map((plan) => ({
    ...plan,
    price: getCyclePrice(plan, billingCycle),
    period: getCyclePeriodLabel(billingCycle),
    setupFee: getCycleSetupFee(plan, billingCycle),
    securityDeposit: getCycleSecurityDeposit(plan, billingCycle),
  }));

  return (
    <div>
      <p className="tele-eyebrow flex items-center gap-2 text-[#C1170C]">
        <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
        {planType === "business" ? "Business pricing" : "Home pricing"} · Step 1 — your city
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-[1.7rem] font-extrabold leading-tight tracking-tight text-[#15366A] sm:text-4xl">
          Best broadband plans in
        </h2>
        <CitySelector
          id={variant === "home" ? "home-city-selector" : "plans-city-selector"}
          cities={cities}
          value={cityId}
          onChange={setCityId}
          loading={citiesLoading}
          variant="inline"
          className="shrink-0"
        />
      </div>
      <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-[#5C6F89]">
        Prices and availability update automatically for your city. Choose a plan
        type and billing cycle to compare.
      </p>

      <div className="mt-6 flex flex-col gap-3 border-y border-[#DCE3EC] py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        {renderControls ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#5C6F89]">
              Step 2 — plan type
            </span>
            <div className="flex">{renderControls}</div>
          </div>
        ) : null}
        <div className={`flex flex-col gap-2 ${renderControls ? "lg:items-end" : ""}`}>
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#5C6F89]">
            {renderControls ? "Step 3 — billing cycle" : "Step 2 — billing cycle"}
          </span>
          <BillingCycleSwitcher selectedCycle={billingCycle} onSelectCycle={setBillingCycle} />
        </div>
      </div>
      <div className="mt-6">
        {pricingLoading ? (
          <PlanCardsSkeleton />
        ) : (
          <>
            <PlanCards
              plans={cyclePlans}
              ctaHref={ctaHref}
              ctaLabel={ctaLabel}
              columns={columns}
              ottPackages={ottPackages}
            />
            <PlanCompareTable plans={cyclePlans} ctaHref={ctaHref} />
            <p className="mt-4 text-center text-xs leading-relaxed text-[#5C6F89]">
              All prices exclude 18% GST · Speeds are &ldquo;up to&rdquo; plan maximums on a wired connection ·
              Unlimited data as per fair-usage policy · *T&amp;C apply
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function getCyclePrice(plan: SupabasePlanCard, cycle: BillingCycleValue) {
  if (cycle === "quarterly") return plan.quarterlyPrice ?? plan.monthlyPrice ?? plan.price;
  if (cycle === "half_yearly") return plan.halfYearlyPrice ?? plan.monthlyPrice ?? plan.price;
  if (cycle === "annual") return plan.annualPrice ?? plan.monthlyPrice ?? plan.price;
  return plan.monthlyPrice ?? plan.price;
}

function getCycleSetupFee(plan: SupabasePlanCard, cycle: BillingCycleValue) {
  if (cycle === "quarterly") return plan.quarterlySetupFee ?? plan.monthlySetupFee ?? plan.setupFee;
  if (cycle === "half_yearly") return plan.halfYearlySetupFee ?? plan.monthlySetupFee ?? plan.setupFee;
  if (cycle === "annual") return plan.annualSetupFee ?? plan.monthlySetupFee ?? plan.setupFee;
  return plan.monthlySetupFee ?? plan.setupFee;
}

function getCycleSecurityDeposit(plan: SupabasePlanCard, cycle: BillingCycleValue) {
  if (cycle === "quarterly") return plan.quarterlySecurityDeposit ?? plan.monthlySecurityDeposit ?? plan.securityDeposit;
  if (cycle === "half_yearly") return plan.halfYearlySecurityDeposit ?? plan.monthlySecurityDeposit ?? plan.securityDeposit;
  if (cycle === "annual") return plan.annualSecurityDeposit ?? plan.monthlySecurityDeposit ?? plan.securityDeposit;
  return plan.monthlySecurityDeposit ?? plan.securityDeposit;
}

function getCyclePeriodLabel(cycle: BillingCycleValue) {
  if (cycle === "quarterly") return "/quarter";
  if (cycle === "half_yearly") return "/half-year";
  if (cycle === "annual") return "/year";
  return "/month";
}
