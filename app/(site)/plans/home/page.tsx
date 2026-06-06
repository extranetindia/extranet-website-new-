export const dynamic = "force-dynamic";

import PlansPageSections from "@/components/plans/PlansPageSections";

export default function HomePlansRoutePage() {
  return (
    <section className="pt-14 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#134799]">Home Plans</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Residential plans with city-aware pricing and OTT flexibility.</h1>
          <p className="mt-4 text-slate-600">Use the city selector, billing cycle switcher, and plan filters to compare your best-fit home broadband option.</p>
        </div>
      </div>
      <PlansPageSections category="home" />
    </section>
  );
}
