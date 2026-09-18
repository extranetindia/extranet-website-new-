"use client";

import {
  HOME_PLAN_CATEGORY_LABELS,
  HOME_PLAN_CATEGORY_VALUES,
  type HomePlanCategoryValue,
} from "@/lib/plans/categories";

interface HomePlansSwitcherProps {
  selectedCategory: HomePlanCategoryValue;
  onSelectCategory: (value: HomePlanCategoryValue) => void;
}

const HINTS: Record<HomePlanCategoryValue, string> = {
  wifi: "Internet only",
  wifi_ott: "With streaming bundle",
};

const tabs: Array<{ label: string; value: HomePlanCategoryValue }> =
  HOME_PLAN_CATEGORY_VALUES.map((value) => ({
    label: HOME_PLAN_CATEGORY_LABELS[value],
    value,
  }));

export default function HomePlansSwitcher({
  selectedCategory,
  onSelectCategory,
}: HomePlansSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Home plan type"
      className="inline-flex w-full max-w-xl flex-wrap gap-1 rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-1 sm:w-auto"
    >
      {tabs.map((tab) => {
        const active = tab.value === selectedCategory;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelectCategory(tab.value)}
            className={`min-h-[48px] flex-1 rounded-lg px-5 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11418D]/40 sm:min-w-[190px] ${
              active
                ? "bg-white font-bold shadow-[0_4px_14px_rgba(21,54,106,0.14)] ring-1 ring-[#11418D]/25"
                : "font-semibold hover:bg-white/70"
            }`}
          >
            <span className={`block text-sm ${active ? "text-[#11418D]" : "text-[#33475f]"}`}>
              {tab.label}
            </span>
            <span className="block text-xs font-medium text-[#5C6F89]">{HINTS[tab.value]}</span>
          </button>
        );
      })}
    </div>
  );
}
