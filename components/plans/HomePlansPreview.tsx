// "use client";

// import PlanCards from "@/components/plans/PlanCards";
// import SectionPreview from "@/components/ui/SectionPreview";
// import { homeBroadbandPlans } from "@/lib/plans";

// export default function HomePlansPreview() {
//   return (
//     <SectionPreview
//       eyebrow="Broadband Plans"
//       title="Plans for every home and business"
//       description="Transparent pricing with unlimited data. Compare speeds and choose the plan that fits your needs."
//       href="/plans"
//       linkLabel="View all plans"
//       className="bg-white"
//     >
//       <PlanCards plans={homeBroadbandPlans} ctaHref="/contact" />
//     </SectionPreview>
//   );
// }

// import { supabase } from "@/lib/supabase/client";

// export default async function HomePlansPreview() {
//   const { data: plans, error } = await supabase
//     .from("plans")
//     .select("*");

//   return (
//     <div className="p-10 text-white">
//       <h1 className="text-3xl font-bold mb-6">
//         Supabase Connection Test
//       </h1>

//       {/* <pre className="bg-black p-6 rounded-xl overflow-auto text-sm">
//         {JSON.stringify({ plans, error }, null, 2)}
//       </pre> */}
//     </div>
//   );
// }

import { supabase } from "@/lib/supabase/client";
import PlanCards from "./PlanCards";

export default async function HomePlansPreview() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*");

  if (!plans?.length) return null;

  const formattedPlans = plans.map((plan) => ({
    ...plan,
    color: "blue",
    icon: null,
    period: "/month",
    tag: plan.popular ? "Most Popular" : null,
  }));

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <PlanCards
          plans={formattedPlans}
          ctaHref="/contact"
          ctaLabel="Get Started"
        />
      </div>
    </section>
  );
}