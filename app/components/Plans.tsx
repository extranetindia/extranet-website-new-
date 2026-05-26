"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    speed: "50 Mbps",
    price: "₹499",
    period: "/month",
    color: "blue",
    tag: null,
    description: "Perfect for light browsing and streaming",
    features: [
      "50 Mbps symmetric speed",
      "Unlimited data",
      "1 static IP included",
      "Email & chat support",
      "99.5% uptime SLA",
      "Free installation",
    ],
  },
  {
    name: "Power",
    icon: Star,
    speed: "200 Mbps",
    price: "₹999",
    period: "/month",
    color: "red",
    tag: "Most Popular",
    description: "Ideal for families and work-from-home professionals",
    features: [
      "200 Mbps symmetric speed",
      "Unlimited data, zero throttling",
      "2 static IPs included",
      "Priority 24/7 support",
      "99.9% uptime SLA",
      "Free router + installation",
      "OTT bundle included",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    speed: "1 Gbps",
    price: "₹2,999",
    period: "/month",
    color: "blue",
    tag: "Best Value",
    description: "For businesses that demand maximum performance",
    features: [
      "1 Gbps dedicated fiber",
      "Unlimited data, SLA-backed",
      "5 static IPs + BGP routing",
      "Dedicated account manager",
      "99.99% uptime SLA",
      "Free hardware + installation",
      "Advanced DDoS protection",
      "Monthly network reports",
    ],
  },
];

const colorMap = {
  blue: {
    badge: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    icon: "bg-blue-900/40 text-blue-400",
    card: "border-blue-800/30 hover:border-blue-600/50",
    glow: "hover:shadow-blue-900/30",
    btn: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-blue-900/40",
    check: "text-blue-400",
  },
  red: {
    badge: "bg-red-900/40 text-red-300 border-red-700/40",
    icon: "bg-red-900/30 text-red-400",
    card: "border-red-700/50 hover:border-red-500/70 ring-1 ring-red-700/30",
    glow: "hover:shadow-red-900/30 shadow-red-900/20",
    btn: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-red-900/40",
    check: "text-red-400",
  },
};

export default function Plans() {
  return (
    <section id="plans" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#040810]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-medium mb-4"
          >
            Simple, Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Plans for Every Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            No hidden fees. No contracts. Switch or cancel anytime. All plans
            include unlimited data.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => {
            const c = colorMap[plan.color as keyof typeof colorMap];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl bg-[#080f1e]/80 border ${c.card} p-7 flex flex-col gap-6 transition-all duration-300 shadow-xl ${c.glow} hover:shadow-2xl ${plan.tag === "Most Popular" ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {plan.tag && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${c.badge}`}
                  >
                    {plan.tag}
                  </div>
                )}

                {/* Plan header */}
                <div>
                  <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center mb-4`}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>

                {/* Speed + Price */}
                <div>
                  <div className="text-3xl font-black text-white mb-1">
                    {plan.speed}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-400 font-medium">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${c.check}`} />
                      <span className="text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-sm text-center transition-all duration-200 shadow-lg hover:scale-[1.02] ${c.btn}`}
                >
                  Get Started
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          All plans include free installation within city limits. Enterprise plans can
          be customized.{" "}
          <a href="#contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
            Talk to sales
          </a>
        </motion.p>
      </div>
    </section>
  );
}
