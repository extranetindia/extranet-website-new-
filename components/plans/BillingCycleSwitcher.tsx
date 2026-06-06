"use client";

export type BillingCycleValue = "monthly" | "quarterly" | "half_yearly" | "annual";

const CYCLE_LABELS: Record<BillingCycleValue, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  half_yearly: "Half-Yearly",
  annual: "Annual",
};

interface BillingCycleSwitcherProps {
  selectedCycle: BillingCycleValue;
  onSelectCycle: (value: BillingCycleValue) => void;
}

export default function BillingCycleSwitcher({
  selectedCycle,
  onSelectCycle,
}: BillingCycleSwitcherProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {(Object.keys(CYCLE_LABELS) as BillingCycleValue[]).map((value) => {
        const active = value === selectedCycle;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelectCycle(value)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799] ${
              active
                ? "bg-[#134799] text-white shadow-sm hover:bg-[#0f3b7f]"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {CYCLE_LABELS[value]}
          </button>
        );
      })}
    </div>
  );
}
