"use client";

import { motion } from "framer-motion";

type PlanCategoryFilter = "wifi" | "wifi_ott";

interface PlanCategorySwitcherProps {
  selected: PlanCategoryFilter;
  onSelect: (category: PlanCategoryFilter) => void;
}

const tabs: Array<{ label: string; value: PlanCategoryFilter }> = [
  { label: "WiFi Only", value: "wifi" },
  { label: "WiFi + OTT", value: "wifi_ott" },
];

export default function PlanCategorySwitcher({
  selected,
  onSelect,
}: PlanCategorySwitcherProps) {
  return (
    <div className="flex justify-center px-4">
      <div className="relative inline-flex items-center gap-1 rounded-full bg-slate-100 p-1.5">
        {/* Animated white background pill */}
        {tabs.map((tab) => {
          const isActive = tab.value === selected;
          if (!isActive) return null;

          return (
            <motion.div
              key={`bg-${tab.value}`}
              layoutId="category-pill"
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              className="absolute inset-1.5 rounded-full bg-white shadow-sm"
            />
          );
        })}

        {/* Buttons */}
        <div className="relative flex gap-1">
          {tabs.map((tab) => {
            const isActive = tab.value === selected;
            return (
              <motion.button
                key={tab.value}
                onClick={() => onSelect(tab.value)}
                type="button"
                className={`relative min-h-[44px] px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799] focus-visible:ring-offset-2 sm:px-8 sm:text-base ${
                  isActive
                    ? "text-[#E86A33]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
