"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

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
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const cycleValues = useMemo(() => CYCLE_VALUES, []);

  useLayoutEffect(() => {
    const activeIndex = cycleValues.findIndex((value) => value === selectedCycle);
    if (activeIndex === -1) return;

    const activeButton = buttonRefs.current[activeIndex];
    if (!activeButton) return;

    setIndicatorWidth(activeButton.offsetWidth);
  }, [cycleValues, selectedCycle]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-2 bg-transparent p-0">
      {cycleValues.map((value, index) => {
        const active = value === selectedCycle;

        return (
          <button
            key={value}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            aria-pressed={active}
            onClick={() => onSelectCycle(value)}
            className="relative px-4 py-2.5 text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134799]"
          >
            <span className={active ? "font-semibold text-[#134799]" : "font-medium text-slate-500 hover:text-slate-700"}>
              {CYCLE_LABELS[value]}
            </span>
            {active ? (
              <motion.span
                layoutId="billing-cycle-underline"
                className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] rounded-full bg-[#134799]"
                style={{ width: indicatorWidth || "auto" }}
                animate={{ x: "-50%", width: indicatorWidth }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
