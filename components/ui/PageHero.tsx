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
    <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 network-grid-light">
      <div className="absolute top-0 right-0 w-[480px] h-[320px] bg-blue-600/8 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[280px] bg-red-500/6 blur-[80px] rounded-full" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-5"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-5 max-w-4xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-8"
        >
          {description}
        </motion.p>
        {children}
      </div>
    </section>
  );
}
