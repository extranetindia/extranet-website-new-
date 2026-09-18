"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import type { SupabasePlanCard } from "@/lib/plans/format-plan";

function shortFee(value: string | null | undefined): string {
  if (!value) return "—";
  const trimmed = String(value).trim().toLowerCase();
  if (trimmed === "0" || trimmed === "free" || trimmed === "waived") return "Free";
  return String(value).trim();
}

/**
 * Side-by-side comparison of the currently displayed (city-priced,
 * billing-cycle-aware) plans. Collapsed by default to protect page rhythm.
 */
export default function PlanCompareTable({
  plans,
  ctaHref,
}: {
  plans: SupabasePlanCard[];
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  if (plans.length < 2) return null;

  const rows: Array<{ label: string; render: (plan: SupabasePlanCard) => React.ReactNode }> = [
    {
      label: "Speed",
      render: (p) => <span className="font-extrabold text-[#C1170C]">{String(p.speed).toUpperCase()}</span>,
    },
    {
      label: `Price ${plans[0]?.period ?? "/month"}`,
      render: (p) => <span className="font-extrabold text-[#11418D]">₹{String(p.price ?? "—").replace(/\s*\*+$/, "")}</span>,
    },
    {
      label: "Setup fee",
      render: (p) => shortFee(p.setupFee),
    },
    {
      label: "Deposit",
      render: (p) => shortFee(p.securityDeposit),
    },
    {
      label: "OTT",
      render: (p) =>
        (p.ottApps ?? []).length > 0 ? (
          <span className="inline-flex flex-wrap gap-1">
            {(p.ottApps ?? []).slice(0, 3).map((app) => (
              <span key={app} className="rounded-full bg-[#11418D]/10 px-2 py-0.5 text-[0.7rem] font-bold text-[#11418D]">
                {app}
              </span>
            ))}
          </span>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-[#DCE3EC] bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#F8F9FB] sm:px-6"
      >
        <span>
          <span className="block text-[0.95rem] font-extrabold text-[#15366A]">
            Compare all {plans.length} plans side by side
          </span>
          <span className="mt-0.5 block text-xs text-[#5C6F89]">
            Speed, price, setup fee and deposit at a glance
            <span className="font-bold md:hidden"> · swipe sideways →</span>
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#C1170C] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="overflow-x-auto border-t border-[#DCE3EC]">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#F4F7FC]">
                <th scope="col" className="sticky left-0 bg-[#F4F7FC] px-5 py-3 text-left text-xs font-extrabold uppercase tracking-[0.12em] text-[#5C6F89]">
                  Plan
                </th>
                {plans.map((plan) => (
                  <th key={plan.id ?? plan.name} scope="col" className="px-4 py-3 text-left">
                    <span className="block text-[0.83rem] font-extrabold text-[#15366A]">
                      {plan.name}
                      {(plan.popular ?? plan.tag === "Most Popular") && (
                        <Star className="ml-1 inline h-3.5 w-3.5 fill-[#C1170C] text-[#C1170C]" aria-label="Most popular" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-[#EDF1F6]">
                  <th scope="row" className="sticky left-0 bg-white px-5 py-3 text-left text-xs font-extrabold uppercase tracking-[0.12em] text-[#5C6F89]">
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.id ?? plan.name} className="px-4 py-3 font-medium text-[#33475f]">
                      {row.render(plan)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-[#EDF1F6] bg-[#F8F9FB]">
                <th scope="row" className="sticky left-0 bg-[#F8F9FB] px-5 py-3" />
                {plans.map((plan) => (
                  <td key={plan.id ?? plan.name} className="px-4 py-3">
                    <Link
                      href={ctaHref}
                      className="tele-btn tele-btn-outline min-h-[40px] w-full px-4 text-[0.8rem]"
                    >
                      Select
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
