"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";

const testimonials = [
  {
    name: "Rajesh Khanna",
    role: "IT Manager",
    city: "Bengaluru",
    rating: 5,
    text: "The leased line has been rock solid — zero unplanned downtime. NOC responded within 8 minutes at 2 AM.",
  },
  {
    name: "Priya Sharma",
    role: "Freelance Designer",
    city: "Mumbai",
    rating: 5,
    text: "200 Mbps delivers exactly what they promise — no buffering on international video calls.",
  },
  {
    name: "Amit Patel",
    role: "CEO, DataDrive Analytics",
    city: "Ahmedabad",
    rating: 5,
    text: "1 Gbps fiber with BGP transformed our data operations. Dedicated account manager is excellent.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <SectionPreview
      eyebrow="Customer Stories"
      title="Trusted by 10,000+ customers"
      description="Real reviews from homes and businesses across India."
      href="/support"
      linkLabel="Customer support"
      className="bg-slate-50"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col gap-4"
          >
            <Quote className="w-7 h-7 text-blue-200 shrink-0" />
            <StarRating rating={t.rating} />
            <p className="text-slate-600 text-sm leading-relaxed flex-1">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500">
                  {t.role} · {t.city}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionPreview>
  );
}
