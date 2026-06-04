"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-24 pb-10 network-grid-light sm:pt-28 sm:pb-14 md:pb-16">
      <div className="absolute top-0 right-0 w-[480px] h-[320px] bg-[#134799]/8 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[280px] bg-red-500/6 blur-[80px] rounded-full" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-text-[#134799] border border-[#134799]/20 text-[#134799] text-sm font-semibold mb-5"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-4 max-w-4xl text-3xl font-black tracking-tight text-slate-900 sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:mb-8 sm:text-lg"
        >
          {description}
        </motion.p>
        {children}
      </div>
    </section>
  );
}
