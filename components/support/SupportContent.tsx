"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  MessageCircle,
  FileText,
  AlertCircle,
  ChevronDown,
  Phone,
} from "lucide-react";
import Link from "next/link";

const supportCards = [
  {
    icon: Headphones,
    title: "24/7 Customer Care",
    description: "Billing, plan changes, and general inquiries.",
    action: "Call +91 9540900888",
    href: "tel:+91 9540900888",
  },
  {
    icon: MessageCircle,
    title: "Email Support",
    description: "Average response under 4 hours on business days.",
    action: "support@extranet.in",
    href: "mailto:support@extranet.in",
  },
  {
    icon: FileText,
    title: "Raise a Ticket",
    description: "Technical issues tracked with SLA-based resolution.",
    action: "Open ticket portal",
    href: "#",
  },
  {
    icon: AlertCircle,
    title: "Report Outage",
    description: "Notify our NOC of service degradation in your area.",
    action: "Report now",
    href: "#",
  },
];

const faqs = [
  {
    q: "How do I check if fiber is available at my address?",
    a: "Use the pincode checker on our Coverage page or contact sales with your full address for a site survey.",
  },
  {
    q: "What is included in unlimited data plans?",
    a: "All listed residential and business plans include unlimited data with no speed throttling under fair usage policy.",
  },
  {
    q: "How long does installation take?",
    a: "Standard FTTH installation is completed within 3–5 business days after feasibility confirmation in covered areas.",
  },
  {
    q: "Can I upgrade my plan mid-cycle?",
    a: "Yes. Upgrades are applied immediately; billing is prorated on your next invoice.",
  },
  {
    q: "Do you offer static IP addresses?",
    a: "Yes. Residential Power plans include 2 static IPs; enterprise plans include larger pools and BGP options.",
  },
];

export default function SupportContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {supportCards.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <card.icon className="w-8 h-8 text-blue-700 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{card.description}</p>
            <span className="text-sm font-semibold text-blue-700">{card.action}</span>
          </motion.a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50"
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 text-white p-8">
          <Phone className="w-10 h-10 text-blue-400 mb-4" />
          <h2 className="text-2xl font-black mb-2">Complaint & help request</h2>
          <p className="text-slate-400 text-sm mb-6">
            For unresolved issues, register a formal complaint. TRAI-compliant
            resolution timelines apply.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Account / Customer ID"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
              <option>Billing issue</option>
              <option>Speed / connectivity</option>
              <option>Installation delay</option>
              <option>Other</option>
            </select>
            <textarea
              rows={4}
              placeholder="Describe your issue"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-sm transition-colors"
            >
              Submit request
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-4">
            Need sales instead?{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
