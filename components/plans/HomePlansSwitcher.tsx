"use client";

type PlanType = "home" | "business";

interface HomePlansSwitcherProps {
  selectedType: PlanType;
  onSelectType: (value: PlanType) => void;
}

const tabs: Array<{ label: string; value: PlanType }> = [
  { label: "WIFI Only", value: "home" },
  { label: "WIFI + OTT", value: "business" },
];

export default function HomePlansSwitcher({
  selectedType,
  onSelectType,
}: HomePlansSwitcherProps) {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center px-1 sm:max-w-lg">
      <div className="inline-flex w-full items-stretch gap-1 rounded-2xl border border-slate-300 bg-white p-1 shadow-sm">
        {tabs.map((tab) => {
          const active = tab.value === selectedType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSelectType(tab.value)}
              className={`flex-1 min-h-[44px] rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799] sm:px-5 sm:text-base ${
                active
                  ? "bg-[#134799] text-white shadow-sm hover:bg-[#0f3b7f]"
                  : "text-slate-700 hover:bg-[rgba(19,71,153,0.1)] hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
