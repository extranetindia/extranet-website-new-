"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CitySelector from "@/components/city/CitySelector";
import BillingCycleSwitcher, { type BillingCycleValue } from "@/components/plans/BillingCycleSwitcher";
import PlanCards from "@/components/plans/PlanCards";
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
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="min-h-[420px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100 md:min-h-[520px]"
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

  const headingTitle = "Choose Your City";

  const cyclePlans = displayPlans.map((plan) => ({
    ...plan,
    price: getCyclePrice(plan, billingCycle),
    period: getCyclePeriodLabel(billingCycle),
    setupFee: getCycleSetupFee(plan, billingCycle),
    securityDeposit: getCycleSecurityDeposit(plan, billingCycle),
  }));

  return (
    <div>
      <div className="mb-8 w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D2190D]">Choose Your City</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">{headingTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Select your city to see localized pricing. Plans without city pricing use our standard rates.
            </p>
          </div>
          <div className="w-full lg:max-w-sm">
            <CitySelector
              id={variant === "home" ? "home-city-selector" : "plans-city-selector"}
              cities={cities}
              value={cityId}
              onChange={setCityId}
              loading={citiesLoading}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-slate-600">Switch between billing cycles to compare current pricing and savings badges.</p>
        <BillingCycleSwitcher selectedCycle={billingCycle} onSelectCycle={setBillingCycle} />
      </div>
      {renderControls ? <div className="mb-4 flex justify-center">{renderControls}</div> : null}
      {pricingLoading ? (
        <PlanCardsSkeleton />
      ) : (
        <PlanCards
          plans={cyclePlans}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
          columns={columns}
          ottPackages={ottPackages}
        />
      )}
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
