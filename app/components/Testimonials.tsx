"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionPreview from "@/components/ui/SectionPreview";
import MobileCarousel from "@/components/ui/MobileCarousel";

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
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <Quote className="h-7 w-7 shrink-0 text-blue-200" />
      <StarRating rating={testimonial.rating} />
      <p className="flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {testimonial.name}
          </div>
          <div className="text-xs text-slate-500">
            {testimonial.role} · {testimonial.city}
          </div>
        </div>
      </div>
    </motion.div>
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
      <MobileCarousel
        ariaLabel="Customer testimonials"
        slideClassName="w-[88%] max-w-[340px] shrink-0 snap-start snap-always"
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </MobileCarousel>

      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </SectionPreview>
  );
}
