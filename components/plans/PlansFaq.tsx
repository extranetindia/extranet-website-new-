"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HOME_FAQS = [
  {
    q: "Are prices inclusive of GST?",
    a: "Listed prices exclude 18% GST. Every plan card also shows the GST-inclusive per-period price so there are no surprises on your bill.",
  },
  {
    q: "Is the data really unlimited?",
    a: "Yes. All WiFi Only and WiFi + OTT plans include unlimited data with no speed throttling under our fair-usage policy.",
  },
  {
    q: "What speed will I actually get?",
    a: "Plan speeds are “up to” maximums measured on a wired connection. Actual WiFi speeds vary with your router, device and distance — our installer tests signal strength in every room.",
  },
  {
    q: "How long does installation take, and what does it cost?",
    a: "Standard installation completes within 3–5 business days after feasibility is confirmed. Any one-time setup fee and refundable security deposit are shown on each plan card.",
  },
  {
    q: "What's the difference between WiFi Only and WiFi + OTT?",
    a: "WiFi Only is pure high-speed internet. WiFi + OTT bundles premium streaming apps — like Netflix, Prime Video, Hotstar and Sony LIV, depending on the bundle — into one broadband bill.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Anytime. Upgrades apply immediately and billing is prorated on your next invoice.",
  },
];

const BUSINESS_FAQS = [
  {
    q: "Are prices inclusive of GST?",
    a: "Listed prices exclude 18% GST. Every plan card also shows the GST-inclusive per-period price, and GST invoices are issued for input-tax credit.",
  },
  {
    q: "Do business plans include static IPs?",
    a: "Yes — static IP options are available on business plans, with larger pools and BGP options for enterprises that need them. Mention it when you request a quote.",
  },
  {
    q: "What kind of support do businesses get?",
    a: "SLA-backed 24×7 support from certified NOC engineers — not scripts — with escalation to senior network staff when it matters.",
  },
  {
    q: "How long does a business installation take?",
    a: "Timelines depend on feasibility at your premises. Share your address and our team will confirm a survey slot and a committed installation window.",
  },
  {
    q: "Can we get a custom quote for multiple offices?",
    a: "Absolutely. Use the contact form or call sales with your locations and bandwidth needs, and we'll build a multi-site quote.",
  },
  {
    q: "Can we upgrade bandwidth mid-cycle?",
    a: "Yes. Upgrades apply immediately and billing is prorated on your next invoice.",
  },
];

export default function PlansFaq({ variant }: { variant: "home" | "business" }) {
  const faqs = variant === "home" ? HOME_FAQS : BUSINESS_FAQS;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl sm:mt-12">
      <p className="tele-eyebrow text-center text-[#C1170C]">Good to know</p>
      <h2 className="mt-2 text-center text-2xl font-extrabold tracking-tight text-[#15366A]">
        {variant === "home" ? "Home plan FAQs" : "Business plan FAQs"}
      </h2>
      <div className="mt-6 space-y-2.5">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className={`overflow-hidden rounded-xl border bg-white transition-colors ${
              open === i ? "border-[#11418D]/40" : "border-[#DCE3EC]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-4 text-left text-[0.95rem] font-bold text-[#15366A] hover:bg-[#F8F9FB] sm:px-5"
            >
              {faq.q}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#C1170C] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-[#EDF1F6] px-4 py-4 text-sm leading-relaxed text-[#475569] sm:px-5">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
