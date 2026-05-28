// "use client";

// import Link from "next/link";
// import PlanCards from "@/components/plans/PlanCards";
// import { homeBroadbandPlans, businessEnterprisePlans } from "@/lib/plans";

// export default function PlansPageSections() {
//   return (
//     <>
//       <section id="home-broadband" className="py-20 bg-white scroll-mt-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-12">
//             <h2 className="text-3xl font-black text-slate-900 mb-3">
//               Home Broadband Plans
//             </h2>
//             <p className="text-slate-600 max-w-2xl">
//               FTTH fiber for streaming, gaming, remote work, and smart homes. All
//               residential plans include unlimited data.
//             </p>
//           </div>
//           <PlanCards plans={homeBroadbandPlans} ctaLabel="Subscribe Now" />
//         </div>
//       </section>

//       <section id="enterprise" className="py-20 bg-slate-50 scroll-mt-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-12">
//             <h2 className="text-3xl font-black text-slate-900 mb-3">
//               Business & Enterprise Plans
//             </h2>
//             <p className="text-slate-600 max-w-2xl">
//               Dedicated circuits, BGP routing, redundancy, and compliance-ready
//               networking for offices and multi-site operations.
//             </p>
//           </div>
//           <PlanCards
//             plans={businessEnterprisePlans}
//             ctaLabel="Request Quote"
//             ctaHref="/contact"
//           />
//           <p className="text-center text-sm text-slate-500 mt-10">
//             Need a custom SLA or multi-location rollout?{" "}
//             <Link
//               href="/contact"
//               className="text-blue-700 font-semibold hover:underline"
//             >
//               Contact enterprise sales
//             </Link>
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

import { supabase } from "@/lib/supabase/client";
import PlanCards from "./PlanCards";

export default async function PlansPageSections() {
  const { data: plans, error } = await supabase
    .from("plans")
    .select("*");

  console.log(plans, error);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* <h1 className="text-4xl font-bold mb-10">
        Supabase Plans
      </h1> */}

      {/* <pre className="mb-10 bg-black text-white p-6 rounded-xl overflow-auto">
        {JSON.stringify(plans, null, 2)}
      </pre> */}

      {plans && <PlanCards plans={plans} />}
    </section>
  );
}