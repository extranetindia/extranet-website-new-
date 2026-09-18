export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PlanCategorySelection from "@/components/plans/PlanCategorySelection";
import SpeedWall from "@/components/plans/SpeedWall";

export const metadata: Metadata = {
  title: "Broadband Plans",
  description:
    "WiFi Only and WiFi + OTT Bundle plans with transparent pricing, unlimited data, and SLA-backed performance.",
};

export default function PlansPage() {
  return (
    <>
      <PageHero
        badge="Broadband plans"
        title="Choose the connection that fits"
        description="Transparent city-wise pricing across home and business ranges — unlimited data, no confusing fine print."
        crumbs={[{ label: "Plans" }]}
      />
      <SpeedWall />
      <PlanCategorySelection />
    </>
  );
}
