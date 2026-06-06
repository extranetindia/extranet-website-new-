export const dynamic = "force-dynamic";

import PlansPageSections from "@/components/plans/PlansPageSections";

export default function BusinessPlansRoutePage() {
  return (
    <section className="pt-14 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D2190D]">Business Plans</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Dedicated fiber, static IP, and SLA-backed enterprise internet.</h1>
          <p className="mt-4 text-slate-600">Compare dedicated business plans with separate enterprise pricing, support, and GST-ready features.</p>
        </div>
      </div>
      <PlansPageSections category="business" />
    </section>
  );
}
