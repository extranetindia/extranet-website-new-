import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PlansPageSections from "@/components/plans/PlansPageSections";

export const metadata: Metadata = {
  title: "Broadband Plans",
  description:
    "Home broadband and enterprise fiber plans with transparent pricing, unlimited data, and SLA-backed performance.",
};

export default function PlansPage() {
  return (
    <>
      <PageHero
        badge="Plans & Pricing"
        title={
          <>
            Internet plans built for{" "}
            <span className="text-blue-700">homes</span> and{" "}
            <span className="text-red-600">enterprises</span>
          </>
        }
        description="Choose symmetric fiber speeds with unlimited data, no hidden fees, and free installation in covered cities. Upgrade or cancel anytime."
      />
      <PlansPageSections />
    </>
  );
}
