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
    field: "monthlyPrice" | "quarterlyPrice" | "halfYearlyPrice" | "annualPrice",
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
        <h4 className="text-sm font-semibold text-[#15366A]">City Pricing</h4>
        <p className="mt-1 text-xs hover:text-[#11418D]">
          Optional per-city billing cycle pricing overrides. Leave empty to use the default plan prices.
        </p>
      </div>

      {error && (
        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm hover:text-[#11418D]">Loading city pricing...</p>
      ) : rows.length === 0 ? (
        <p className="text-sm hover:text-[#11418D]">
          No cities found. Create cities in Coverage Management first.
        </p>
      ) : (
        <div className="max-h-[360px] space-y-3 overflow-y-auto rounded-xl border border-[#DCE3EC] bg-[#F8F9FB]/80 p-3 sm:max-h-[420px]">
          {rows.map((row) => (
            <div
              key={row.cityId}
              className="rounded-xl border border-[#DCE3EC] bg-white p-3 sm:p-4"
            >
              <p className="mb-3 text-sm font-semibold text-[#15366A]">
                {row.cityName}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#5C6F89]">
                    Monthly Price
                  </span>
                  <input
                    type="text"
                    value={row.monthlyPrice}
                    disabled={disabled}
                    placeholder="e.g. ₹349"
                    onChange={(event) =>
                      onChange(row.cityId, "monthlyPrice", event.target.value)
                    }
                    className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D] disabled:bg-[#F4F7FC] disabled:hover:text-[#11418D]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#5C6F89]">
                    Quarterly Price
                  </span>
                  <input
                    type="text"
                    value={row.quarterlyPrice}
                    disabled={disabled}
                    placeholder="e.g. ₹999"
                    onChange={(event) =>
                      onChange(row.cityId, "quarterlyPrice", event.target.value)
                    }
                    className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D] disabled:bg-[#F4F7FC] disabled:hover:text-[#11418D]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#5C6F89]">
                    Half-Yearly Price
                  </span>
                  <input
                    type="text"
                    value={row.halfYearlyPrice}
                    disabled={disabled}
                    placeholder="e.g. ₹1799"
                    onChange={(event) =>
                      onChange(row.cityId, "halfYearlyPrice", event.target.value)
                    }
                    className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D] disabled:bg-[#F4F7FC] disabled:hover:text-[#11418D]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#5C6F89]">
                    Annual Price
                  </span>
                  <input
                    type="text"
                    value={row.annualPrice}
                    disabled={disabled}
                    placeholder="e.g. ₹3499"
                    onChange={(event) =>
                      onChange(row.cityId, "annualPrice", event.target.value)
                    }
                    className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D] disabled:bg-[#F4F7FC] disabled:hover:text-[#11418D]"
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
