"use client";

export type BillingCycleValue = "monthly" | "quarterly" | "half_yearly" | "annual";

const CYCLE_LABELS: Record<BillingCycleValue, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  half_yearly: "Half-Yearly",
  annual: "Annual",
};

const CYCLE_VALUES = Object.keys(CYCLE_LABELS) as BillingCycleValue[];

interface BillingCycleSwitcherProps {
  selectedCycle: BillingCycleValue;
  onSelectCycle: (value: BillingCycleValue) => void;
}

export default function BillingCycleSwitcher({
  selectedCycle,
  onSelectCycle,
}: BillingCycleSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className="grid w-full grid-cols-2 gap-1 rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-1 sm:inline-flex sm:w-auto sm:flex-wrap"
    >
      {CYCLE_VALUES.map((value) => {
        const active = value === selectedCycle;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelectCycle(value)}
            className={`min-h-[44px] whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11418D]/40 sm:flex-1 ${
              active
                ? "bg-[#11418D] font-bold text-white shadow-[0_4px_12px_rgba(17,65,141,0.3)]"
                : "font-semibold text-[#5C6F89] hover:bg-white hover:text-[#15366A]"
            }`}
          >
            {CYCLE_LABELS[value]}
          </button>
        );
      })}
    </div>
  );
}
