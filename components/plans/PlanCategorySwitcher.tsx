"use client";

type PlanCategoryFilter = "wifi" | "wifi_ott";

interface PlanCategorySwitcherProps {
  selected: PlanCategoryFilter;
  onSelect: (category: PlanCategoryFilter) => void;
}

const tabs: Array<{ label: string; value: PlanCategoryFilter; hint: string }> = [
  { label: "WiFi Only", value: "wifi", hint: "Internet only" },
  { label: "WiFi + OTT", value: "wifi_ott", hint: "With streaming bundle" },
];

export default function PlanCategorySwitcher({
  selected,
  onSelect,
}: PlanCategorySwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Plan type"
      className="inline-flex w-full max-w-xl flex-wrap gap-1 rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-1 sm:w-auto"
    >
      {tabs.map((tab) => {
        const isActive = tab.value === selected;

        return (
          <button
            onClick={() => onSelect(tab.value)}
            type="button"
            aria-pressed={isActive}
            key={tab.value}
            className={`min-h-[48px] flex-1 rounded-lg px-5 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11418D]/40 sm:min-w-[190px] ${
              isActive
                ? "bg-white font-bold shadow-[0_4px_14px_rgba(21,54,106,0.14)] ring-1 ring-[#11418D]/25"
                : "font-semibold hover:bg-white/70"
            }`}
          >
            <span className={`block text-sm ${isActive ? "text-[#11418D]" : "text-[#33475f]"}`}>
              {tab.label}
            </span>
            <span className="block text-xs font-medium text-[#5C6F89]">{tab.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
