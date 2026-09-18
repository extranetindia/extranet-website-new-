export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, FileCheck, Globe2, HeadphonesIcon } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { PlanRow } from "@/lib/database/schema";
import PageHero from "@/components/ui/PageHero";
import PlansPageSections from "@/components/plans/PlansPageSections";

const ASSURANCES = [
  {
    icon: Globe2,
    title: "Static IP options",
    body: "Public IPs with PTR records, larger pools and BGP where applicable.",
  },
  {
    icon: HeadphonesIcon,
    title: "SLA-backed 24×7 support",
    body: "Certified NOC engineers with escalation to senior network staff.",
  },
  {
    icon: FileCheck,
    title: "GST invoicing",
    body: "Clean monthly GST invoices for painless input-tax credit claims.",
  },
];

export default async function BusinessPlansRoutePage() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHero
        badge="Business internet"
        title="Connectivity your operations can rely on"
        description="Dedicated fibre capacity, static IP options and SLA-backed support for offices, retail and institutions. Select your city for current business pricing."
        crumbs={[{ label: "Plans", href: "/plans" }, { label: "Business Internet" }]}
      />
      <div className="bg-white">
        <PlansPageSections category="business" plans={plans as PlanRow[]} />
      </div>
      <section aria-label="Why businesses choose Extranet" className="border-t border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {ASSURANCES.map((item) => (
              <div key={item.title} className="tele-card tele-card-hover p-5 sm:p-6">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#C1170C]/10 text-[#C1170C]">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-extrabold text-[#15366A]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5C6F89]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-stretch gap-3 rounded-xl bg-[#15366A] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="font-extrabold text-white">Need leased line or multi-site connectivity?</h3>
              <p className="mt-0.5 text-sm text-white/75">
                Share your locations — we&apos;ll build a custom enterprise quote.
              </p>
            </div>
            <Link href="/contact" className="tele-btn tele-btn-red shrink-0 px-6">
              Request business quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
