import Link from "next/link";

const cards = [
  {
    title: "Home Broadband Plans",
    description: "Plans starting from the current lowest home plan, OTT options, router support, and billing flexibility.",
    bullets: [
      "Available speeds for home usage",
      "Free Router + Landline",
      "OTT bundle availability",
      "Monthly / Quarterly / Half-Yearly / Annual",
    ],
    href: "/plans/home",
    accent: "from-[#134799] to-[#0f3b7f]",
  },
  {
    title: "Business Internet Plans",
    description: "Dedicated bandwidth, static IPs, SLA-backed uptime, and enterprise-ready support for growing teams.",
    bullets: [
      "Dedicated bandwidth",
      "Static IP support",
      "SLA-backed uptime",
      "Enterprise support",
      "Monthly / Quarterly / Half-Yearly / Annual",
    ],
    href: "/plans/business",
    accent: "from-[#D2190D] to-[#b8160c]",
  },
];

export default function PlanCategorySelection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#134799]">Choose Your Plan</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Home Comfort or Corporate Edge?</h2>
          <p className="mt-4 text-lg text-slate-600">Whether you are streaming at home or running a business, we have a plan built exactly for you.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#134799]/30 hover:shadow-[0_24px_60px_rgba(19,71,153,0.14)] sm:p-8"
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${card.accent} px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white`}>
                {card.title}
              </div>
              <p className="mt-5 text-slate-600">{card.description}</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {card.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#134799]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#134799] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0f3b7f]"
              >
                Explore {card.title.includes("Business") ? "Business Plans" : "Home Plans"} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
