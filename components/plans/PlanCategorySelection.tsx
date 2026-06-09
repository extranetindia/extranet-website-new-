import Link from "next/link";
import { Home, Building2 } from "lucide-react";

const cards = [
  {
    eyebrow: "HOME PLANS",
    title: "HOME BROADBAND",
    icon: Home,
    bullets: [
      "Speed up to 300 MBPS",
      "WiFi Router Included*",
      "Unlimited Data",
      // "Free Landline",
      "OTT Bundles Available",
    ],
    price: "₹399*/month",
    href: "/plans/home",
    accent: "from-[#134799] to-[#0f3b7f]",
    badgeTone: "bg-[#134799] text-white",
  },
  {
    eyebrow: "BUSINESS PLANS",
    title: "BUSINESS BROADBAND",
    icon: Building2,
    bullets: [
      "Speed up to 750 MBPS",
      "WiFi Router Included*",
      "Unlimited Data",
      "Static IP Available*",
      "SLA-backed 24/7 Support",
    ],
    price: "₹999*/month",
    href: "/plans/business",
    badgeTone: "bg-[#D2190D] text-white",
    accent: "from-[#D2190D] to-[#b8160c]",
  },
];

export default function PlanCategorySelection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D2190D]">Choose Your Plan</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Home Broadband or Business Broadband</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#134799]/30 hover:shadow-[0_24px_58px_rgba(19,71,153,0.14)] sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D2190D]">{card.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">{card.title}</h3>

                <div className="mt-6 flex justify-center lg:justify-start">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                    <Icon className="h-8 w-8 text-[#134799]" />
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#D2190D]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Starting From</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{card.price}</p>
                </div>

                <Link
                  href={card.href}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r ${card.accent} px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20`}
                >
                  Get Started
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
