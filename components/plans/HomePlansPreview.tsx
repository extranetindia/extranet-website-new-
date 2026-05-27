"use client";

import PlanCards from "@/components/plans/PlanCards";
import SectionPreview from "@/components/ui/SectionPreview";
import { homeBroadbandPlans } from "@/lib/plans";

export default function HomePlansPreview() {
  return (
    <SectionPreview
      eyebrow="Broadband Plans"
      title="Plans for every home and business"
      description="Transparent pricing with unlimited data. Compare speeds and choose the plan that fits your needs."
      href="/plans"
      linkLabel="View all plans"
      className="bg-white"
    >
      <PlanCards plans={homeBroadbandPlans} ctaHref="/contact" />
    </SectionPreview>
  );
}
