"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

interface CityPricedPlansProps {
  basePlans: PlanRow[];
  variant: "home" | "plans";
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
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
}: CityPricedPlansProps) {
  const { cities, cityId, selectedCity, setCityId, loading: citiesLoading, ready } =
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

      let resolved = pricingCache.get(targetCityId);

      if (!resolved) {
        const result = await resolvePlansPricesForCity(basePlans, targetCityId);
        if (requestId !== requestIdRef.current) return;

        if (result.error) {
          setDisplayPlans(basePlans.map((plan) => formatSupabasePlanForCards(plan)));
          setPricingLoading(false);
          return;
        }

        resolved = result.data;
        pricingCache.set(targetCityId, resolved);
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

  const heading = useMemo(() => {
    if (variant === "home") {
      return {
        title: "Best Popular Plans In",
        showInlineCity: true,
      };
    }
    return {
      title: "Choose Your City",
      showInlineCity: false,
    };
  }, [variant]);

  return (
    <div>
      <div
        className={`mb-8 flex flex-col gap-4 sm:mb-10 ${
          variant === "home"
            ? "sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
            : "sm:gap-5"
        }`}
      >
        <div className={variant === "plans" ? "max-w-2xl" : undefined}>
          <h2
            className={`font-black text-slate-900 ${
              variant === "home"
                ? "text-2xl sm:text-3xl md:text-4xl"
                : "text-2xl sm:text-3xl"
            }`}
          >
            {heading.title}
            {variant === "home" && selectedCity && !citiesLoading && (
              <span className="text-blue-700"> {selectedCity.name}</span>
            )}
          </h2>
          {variant === "plans" && (
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Select your city to see localized pricing. Plans without city pricing
              use our standard rates.
            </p>
          )}
        </div>

        <CitySelector
          id={variant === "home" ? "home-city-selector" : "plans-city-selector"}
          cities={cities}
          value={cityId}
          onChange={setCityId}
          loading={citiesLoading}
          className={variant === "home" ? "w-full sm:shrink-0 sm:max-w-[240px]" : "w-full sm:max-w-xs"}
        />
      </div>

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
