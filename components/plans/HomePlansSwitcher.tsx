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
      <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const active = tab.value === selectedType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSelectType(tab.value)}
              className={`px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                active
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
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
