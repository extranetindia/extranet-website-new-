import Link from "next/link";
import { Home, Building2, Check, ArrowRight } from "lucide-react";

const cards = [
  {
    eyebrow: "For homes",
    title: "Home Broadband",
    description: "Fibre-to-the-home for streaming, gaming, work and study.",
    icon: Home,
    bullets: [
      "Speed up to 300 MBPS",
      "WiFi Router Included*",
      "Unlimited Data",
      "OTT Bundles Available",
    ],
    price: "₹399*/month",
    priceNote: "Starting price, excl. GST",
    priceBox: "bg-[#F4F7FC]",
    priceTone: "text-[#11418D]",
    href: "/plans/home",
    cta: "View home plans",
    topBar: "bg-[#11418D]",
    iconWrap: "bg-[#11418D]/10 text-[#11418D]",
    btn: "tele-btn-primary",
  },
  {
    eyebrow: "For offices",
    title: "Business Internet",
    description: "High-capacity links with static IP options and priority support.",
    icon: Building2,
    bullets: [
      "Speed up to 750 MBPS",
      "WiFi Router Included*",
      "Unlimited Data",
      "Static IP Available*",
      "SLA-backed 24/7 Support",
    ],
    price: "₹999*/month",
    priceNote: "Starting price, excl. GST",
    priceBox: "bg-[#FEF2F2]",
    priceTone: "text-[#C1170C]",
    href: "/plans/business",
    cta: "View business plans",
    topBar: "bg-[#C1170C]",
    iconWrap: "bg-[#C1170C]/10 text-[#C1170C]",
    btn: "tele-btn-red",
  },
];

export default function PlanCategorySelection() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="tele-eyebrow flex items-center gap-2 text-[#C1170C]">
              <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
              Choose your connection
            </p>
            <h2 className="mt-3 text-[1.65rem] font-extrabold leading-tight text-[#15366A] sm:text-4xl">
              Home broadband or business internet
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#5C6F89] sm:text-base">
              Two purpose-built ranges on the same fibre network — pick the one that
              matches how you get online.
            </p>
          </div>
          <Link href="/plans" className="tele-btn tele-btn-outline hidden shrink-0 px-6 md:inline-flex">
            Compare all plans
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="tele-card tele-card-hover relative flex flex-col overflow-hidden"
              >
                <span aria-hidden className={`h-1.5 w-full ${card.topBar}`} />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#5C6F89]">
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#15366A]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#5C6F89]">
                        {card.description}
                      </p>
                    </div>
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconWrap}`}>
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                  </div>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {card.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-[#33475f]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#11418D]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-4 border-t border-[#EDF1F6] pt-5 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between">
                    <div className={`rounded-xl px-4 py-3 ${card.priceBox}`}>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5C6F89]">
                        Starting from
                      </p>
                      <p className={`mt-1 text-[1.7rem] font-extrabold tracking-tight ${card.priceTone}`}>
                        {card.price}
                      </p>
                      <p className="text-xs text-[#5C6F89]">{card.priceNote}</p>
                    </div>
                    <Link
                      href={card.href}
                      className={`tele-btn ${card.btn} px-6`}
                    >
                      {card.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 text-center md:hidden">
          <Link href="/plans" className="tele-btn tele-btn-outline w-full px-6">
            Compare all plans
          </Link>
        </div>
      </div>
    </section>
  );
}
