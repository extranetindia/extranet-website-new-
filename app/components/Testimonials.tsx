"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Khanna",
    role: "IT Manager",
    company: "TechSolutions India",
    city: "Bengaluru",
    rating: 5,
    text: "We switched from a national ISP to Extranet 2 years ago. The leased line has been rock solid — literally zero unplanned downtime. Their NOC responded to a configuration issue within 8 minutes at 2 AM.",
  },
  {
    name: "Priya Sharma",
    role: "Freelance Designer",
    company: "Self-employed",
    city: "Mumbai",
    rating: 5,
    text: "As someone who video calls clients internationally all day, upload speed matters. My 200 Mbps plan delivers exactly what they promise — I've never seen a buffering screen since joining Extranet.",
  },
  {
    name: "Amit Patel",
    role: "CEO",
    company: "DataDrive Analytics",
    city: "Ahmedabad",
    rating: 5,
    text: "Our data warehouse operations require moving terabytes daily. Extranet's 1 Gbps fiber with BGP routing has transformed our operations. The dedicated account manager is a bonus we didn't expect.",
  },
  {
    name: "Sunita Reddy",
    role: "Work-from-Home Parent",
    company: "Hyderabad",
    city: "Hyderabad",
    rating: 5,
    text: "My kids stream, my husband games, and I video conference — all at the same time. With Extranet's Power plan, nobody ever complains about lag. Plus the customer service is incredibly responsive.",
  },
  {
    name: "Vikram Singh",
    role: "Network Engineer",
    company: "FinServ Corp",
    city: "Delhi NCR",
    rating: 5,
    text: "The technical team at Extranet actually understands networking. When I had BGP questions, they patched me straight to a senior network engineer who walked through the configuration with me.",
  },
  {
    name: "Meera Krishnan",
    role: "Online Educator",
    company: "EduVenture India",
    city: "Chennai",
    rating: 5,
    text: "I run live classes for 500+ students daily. The connection stability from Extranet has allowed me to scale my business — before switching, frequent outages were costing me students.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a14]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-medium mb-4"
          >
            Customer Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              50,000+
            </span>{" "}
            Customers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Real reviews from real customers across India.
          </motion.p>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-[#080f1e]/80 border border-white/8 hover:border-blue-700/30 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Quote icon */}
              <Quote className="w-7 h-7 text-blue-800/60 shrink-0" />

              <StarRating rating={t.rating} />

              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="pt-4 border-t border-white/6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">
                    {t.role} · {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 border-t border-white/6"
        >
          {[
            { value: "4.8/5", label: "Average Rating", sub: "Based on 12,000+ reviews" },
            { value: "50,000+", label: "Active Customers", sub: "Across 500+ cities" },
            { value: "99.9%", label: "Satisfaction Score", sub: "NPS of 72" },
            { value: "< 4hr", label: "Avg Resolution Time", sub: "Industry-leading support" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{item.value}</div>
              <div className="text-sm font-medium text-blue-300 mb-0.5">{item.label}</div>
              <div className="text-xs text-slate-500">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
