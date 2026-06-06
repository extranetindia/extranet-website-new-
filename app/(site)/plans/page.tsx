export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import PlanCategorySelection from "@/components/plans/PlanCategorySelection";

export const metadata: Metadata = {
  title: "Broadband Plans",
  description:
    "WiFi Only and WiFi + OTT Bundle plans with transparent pricing, unlimited data, and SLA-backed performance.",
};

export default function PlansPage() {
  return (
    <section className="pt-14 sm:pt-16">
      <PlanCategorySelection />
    </section>
  );
}
