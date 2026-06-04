"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, MessageCircle, ChevronDown, Phone } from "lucide-react";

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

export default function SupportContent({ supportSettings }: SupportContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const supportCards = [
    {
      icon: Headphones,
      title: "24/7 Customer Care",
      description: "Billing, plan changes, and general inquiries.",
      action: `Call ${supportSettings.phone}`,
      href: `tel:${supportSettings.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: MessageCircle,
      title: "Email Support",
      description: "Average response under 4 hours on business days.",
      action: supportSettings.email,
      href: `mailto:${supportSettings.email}`,
    },
    // {
    //   icon: Phone,
    //   title: "WhatsApp Support",
    //   description: "Chat with our support team instantly.",
    //   action: `WhatsApp ${supportSettings.whatsapp}`,
    //   href: `https://wa.me/${supportSettings.whatsapp.replace(/\D/g, "")}`,
    // },
  ];

  return (
    <div className="space-y-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {supportCards.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="block p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#134799]/30 hover:shadow-md transition-all"
          >
            <card.icon className="w-8 h-8 text-blue-700 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{card.description}</p>
            <span className="text-sm font-semibold text-blue-700">{card.action}</span>
          </motion.a>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start gap-6">
        <div className="w-full max-w-6xl mx-auto lg:mx-auto">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Frequently asked questions</h2> 
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className="w-full rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    // className="flex min-h-[44px] w-full items-center justify-center gap-3 px-4 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:px-5"
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50"
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
                        {/* <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed"> */}
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
        </div>

        {/* <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">Office and support hours</h3>
          <p className="mt-4 text-sm text-slate-600">{supportSettings.officeAddress}</p>
          <p className="mt-4 text-sm text-slate-500">{supportSettings.supportTimings}</p>
        </div> */}
      </div>
    </div>
  );
}
