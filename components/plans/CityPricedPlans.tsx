"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CitySelector from "@/components/city/CitySelector";
import PlanCards from "@/components/plans/PlanCards";
import type { PlanRow } from "@/lib/database/schema";
import {
  mergeResolvedPricesIntoPlans,
  resolvePlansPricesForCity,
} from "@/lib/database/plan-pricing";
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
  const { cities, cityId, setCityId, loading: citiesLoading, ready } =
    useSelectedCity();
  const [pricingLoading, setPricingLoading] = useState(false);
  const [displayPlans, setDisplayPlans] = useState<SupabasePlanCard[]>(() =>
    basePlans.map((plan) => formatSupabasePlanForCards(plan)),
  );
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

      const merged = mergeResolvedPricesIntoPlans(basePlans, resolved);
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

  const headingTitle =
    variant === "home" ? "Best Popular Plans In" : "Choose Your City";

  return (
    <div>
      <div className="mb-10 w-full">
        {variant === "home" ? (
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-3 text-center">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Best Popular Plans In
              </h2>
              <CitySelector
                id="home-city-selector"
                variant="inline"
                cities={cities}
                value={cityId}
                onChange={setCityId}
                loading={citiesLoading}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              {headingTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Select your city to see localized pricing. Plans without city pricing
              use our standard rates.
            </p>
            <div className="mt-4 w-full sm:max-w-xs">
              <CitySelector
                id="plans-city-selector"
                cities={cities}
                value={cityId}
                onChange={setCityId}
                loading={citiesLoading}
              />
            </div>
          </div>
        )}
      </div>
      {renderControls ? <div className="mt-8 flex justify-center">{renderControls}</div> : null}
      {pricingLoading ? (
        <PlanCardsSkeleton />
      ) : (
        <PlanCards
          plans={displayPlans}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
          columns={columns}
        />
      )}
    </div>
  );
}
