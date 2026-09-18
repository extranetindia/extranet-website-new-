"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, MessageCircle, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

interface SupportContentProps {
  supportSettings: {
    phone: string;
    email: string;
    whatsapp: string;
    officeAddress: string;
    supportTimings: string;
  };
}

const faqs = [
  {
    q: "How do I check if fiber is available at my address?",
    a: "Use the pincode checker on our Coverage page or contact sales with your full address for a site survey.",
  },
  {
    q: "What is included in unlimited data plans?",
    a: "All listed WiFi Only and WiFi + OTT Bundle plans include unlimited data with no speed throttling under fair usage policy.",
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
    a: "Yes. WiFi Only Power plans include 2 static IPs; WiFi + OTT Bundle plans include larger pools and BGP options where applicable.",
  },
];

export default function SupportContent({ supportSettings }: SupportContentProps) {
  const { settings: companySettings } = useCompanySettings();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Use company settings with fallbacks to support settings
  const displayPhone = companySettings?.company_phone || supportSettings.phone;
  const displayEmail = companySettings?.support_email || supportSettings.email;

  const supportCards = [
    {
      icon: Headphones,
      title: "24/7 Customer Care",
      description: `Billing, plan changes, and general inquiries. ${supportSettings.supportTimings}`,
      action: `Call ${displayPhone}`,
      href: `tel:${displayPhone.replace(/\s+/g, "")}`,
    },
    {
      icon: MessageCircle,
      title: "Email Support",
      description: "Average response under 4 hours on business days.",
      action: displayEmail,
      href: `mailto:${displayEmail}`,
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="grid gap-5 sm:grid-cols-2">
        {supportCards.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 5) * 0.06 }}
            className="tele-card tele-card-hover group block p-6"
          >
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${
              i % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
            }`}>
              <card.icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-extrabold text-[#15366A]">{card.title}</h3>
            <p className="mb-3 mt-1.5 text-sm leading-relaxed text-[#5C6F89]">{card.description}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C1170C] group-hover:underline">
              {card.action}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <p className="tele-eyebrow text-center text-[#C1170C]">Self-help</p>
        <h2 className="mt-2 text-center text-2xl font-extrabold tracking-tight text-[#15366A] sm:text-[1.7rem]">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-2.5">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                openFaq === i ? "border-[#11418D]/40" : "border-[#DCE3EC]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-4 text-left text-[0.95rem] font-bold text-[#15366A] hover:bg-[#F8F9FB] sm:px-5"
              >
                {faq.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#C1170C] transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
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

        <div className="mt-6 flex flex-col items-stretch gap-3 rounded-xl bg-[#15366A] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="font-extrabold text-white">Still need help?</h3>
            <p className="mt-0.5 text-sm text-white/75">
              Raise a request and our team will get back within one business day.
            </p>
          </div>
          <Link href="/contact" className="tele-btn tele-btn-red shrink-0 px-6">
            Contact us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
