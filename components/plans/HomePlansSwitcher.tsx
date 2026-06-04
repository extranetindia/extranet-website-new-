"use client";

type PlanType = "home" | "business";

interface HomePlansSwitcherProps {
  selectedType: PlanType;
  onSelectType: (value: PlanType) => void;
}

const tabs: Array<{ label: string; value: PlanType }> = [
  { label: "Home Plans", value: "home" },
  { label: "Business Plans", value: "business" },
];

export default function HomePlansSwitcher({
  selectedType,
  onSelectType,
}: HomePlansSwitcherProps) {
  return (
    <div className="mx-auto flex justify-center">
      <div className="inline-flex gap-1 rounded-xl border border-slate-300 bg-white p-1 shadow-sm">
        {tabs.map((tab) => {
          const active = tab.value === selectedType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSelectType(tab.value)}
              className={`rounded-lg px-7 py-1.5 text-base font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799] ${
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
