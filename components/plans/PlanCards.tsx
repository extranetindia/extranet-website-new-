"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import { Check } from "lucide-react";
import { Check, Zap } from "lucide-react";
import type { PlanDefinition } from "@/lib/plans";

const colorMap = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "bg-blue-50 text-blue-700",
    card: "border-slate-200 hover:border-blue-300 hover:shadow-blue-100/50",
    btn: "bg-blue-700 hover:bg-blue-800 shadow-blue-900/20",
    check: "text-blue-600",
  },
  red: {
    badge: "bg-red-50 text-red-700 border-red-200",
    icon: "bg-red-50 text-red-600",
    card: "border-red-200 hover:border-red-300 ring-2 ring-red-100 shadow-lg shadow-red-100/40",
    btn: "bg-red-600 hover:bg-red-700 shadow-red-900/20",
    check: "text-red-600",
  },
};

interface PlanCardsProps {
  plans: PlanDefinition[];
  ctaHref?: string;
  ctaLabel?: string;
  columns?: 2 | 3;
}

export default function PlanCards({
  plans,
  ctaHref = "/contact",
  ctaLabel = "Get Started",
  columns = 3,
}: PlanCardsProps) {
  const gridClass =
    columns === 2
      ? "grid md:grid-cols-2 gap-6 lg:gap-8"
      : "grid md:grid-cols-3 gap-8 lg:gap-10 items-start";

  return (
    <div className={gridClass}>
      {plans.map((plan, i) => {
        // const c = colorMap[plan.color];
        const c = colorMap.blue;
        // const isPopular = plan.tag === "Most Popular";
        const isPopular = plan.popular;
        // const Icon = plan.icon;
        // import { Zap } from "lucide-react";
        return (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`relative rounded-2xl bg-white border ${c.card} p-8 flex flex-col gap-6 transition-all duration-300 h-full min-h-[650px] ${isPopular ? "md:-mt-2 md:mb-2" : ""}`}
          >
            {plan.tag && (
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${c.badge}`}
              >
                {plan.tag}
              </div>
            )}
            <div>
              <div
                className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center mb-4`}
              >
                <Zap className="w-5 h-5" />
                {/* const Icon = plan.icon; */}
                {/* <Icon className="w-5 h-5" /> */}
                {/* <plan.icon className="w-5 h-5" /> */}
                {/* {plan.icon} */}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm">{plan.description}</p>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">{plan.speed}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-500 font-medium">{plan.period}</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${c.check}`} />
                  <span className="text-slate-600">{feat}</span>
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm text-center transition-all duration-200 shadow-lg hover:scale-[1.01] ${c.btn}`}
            >
              {ctaLabel}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
