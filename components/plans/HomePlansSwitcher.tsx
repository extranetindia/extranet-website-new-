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
    <div className="mx-auto flex w-full max-w-md justify-center px-1 sm:max-w-lg">
      <div className="inline-flex w-full items-stretch gap-2">
        {tabs.map((tab) => {
          const active = tab.value === selectedCategory;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSelectCategory(tab.value)}
              className={`flex-1 min-h-[44px] rounded-full px-3 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799] sm:px-5 sm:text-base ${
                active
                  ? "border border-[#F26522] bg-white text-[#F26522]"
                  : "bg-transparent text-slate-700 hover:text-slate-900"
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
