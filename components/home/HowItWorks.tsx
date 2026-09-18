"use client";

import { motion } from "framer-motion";
import { ClipboardList, Radar, Wrench, HeadphonesIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: ClipboardList,
    step: "Step 1",
    title: "Tell us what you need",
    body: "Pick a plan online or call +91 95409 01195 — it takes two minutes.",
  },
  {
    icon: Radar,
    step: "Step 2",
    title: "We confirm feasibility",
    body: "Our team verifies fibre reachability at your address, free of charge.",
  },
  {
    icon: Wrench,
    step: "Step 3",
    title: "Get installed in 3–5 days",
    body: "A trained engineer sets up your router and tests every room's signal.",
  },
  {
    icon: HeadphonesIcon,
    step: "Step 4",
    title: "Stay supported 24×7",
    body: "Real engineers on call, proactive outage alerts, easy upgrades.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-label="How getting connected works" className="border-y border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Getting connected"
          title="Online in four simple steps"
          description="No paperwork marathons, no mystery charges — just a clean path from hello to high-speed."
        />
        <ol className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 5) * 0.07 }}
              className="tele-card tele-card-hover relative overflow-hidden p-5 sm:p-6"
            >
              <span aria-hidden className={`absolute -right-1 top-2 text-7xl font-extrabold leading-none sm:text-8xl ${
                i % 2 === 1 ? "text-[#C1170C]/10" : "text-[#11418D]/10"
              }`}>
                {i + 1}
              </span>
              <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] ${
                i % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
              }`}>
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#C1170C]">{item.step}</p>
              <h3 className="mt-1 font-extrabold text-[#15366A]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5C6F89]">{item.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
