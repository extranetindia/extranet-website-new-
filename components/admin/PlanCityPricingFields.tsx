"use client";

import type { CityPricingFormRow } from "@/lib/database/plan-pricing";

interface PlanCityPricingFieldsProps {
  rows: CityPricingFormRow[];
  loading: boolean;
  error: string | null;
  disabled?: boolean;
  fallbackPrice?: string;
  onChange: (
    cityId: string,
    field: "price" | "originalPrice",
    value: string,
  ) => void;
}

export default function PlanCityPricingFields({
  rows,
  loading,
  error,
  disabled = false,
  fallbackPrice,
  onChange,
}: PlanCityPricingFieldsProps) {
  return (
    <div className="md:col-span-2">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-slate-900">City Pricing</h4>
        <p className="mt-1 text-xs text-slate-500">
          Optional per-city overrides. Leave empty to use the default plan price
          {fallbackPrice ? (
            <>
              {" "}
              (<span className="font-medium text-slate-700">{fallbackPrice}</span>
              )
            </>
          ) : (
            " above"
          )}
          .
        </p>
      </div>

      {error && (
        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading city pricing...</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-500">
          No cities found. Run the cities migration to seed service areas.
        </p>
      ) : (
        <div className="max-h-[280px] space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:max-h-[320px]">
          {rows.map((row) => (
            <div
              key={row.cityId}
              className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
            >
              <p className="mb-3 text-sm font-semibold text-slate-900">
                {row.cityName}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-600">
                    Price
                  </span>
                  <input
                    type="text"
                    value={row.price}
                    disabled={disabled}
                    placeholder="e.g. ₹349"
                    onChange={(event) =>
                      onChange(row.cityId, "price", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-600">
                    Original Price
                  </span>
                  <input
                    type="text"
                    value={row.originalPrice}
                    disabled={disabled}
                    placeholder="e.g. ₹699"
                    onChange={(event) =>
                      onChange(row.cityId, "originalPrice", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
