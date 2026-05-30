"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SectionPreviewProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionPreview({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  children,
  className = "bg-slate-50",
}: SectionPreviewProps) {
  return (
    <section className={`relative py-12 sm:py-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-blue-700 uppercase tracking-wider"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-2xl font-black text-slate-900 mt-2 mb-3 sm:text-3xl md:text-4xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600"
            >
              {description}
            </motion.p>
          </div>
          <Link
            href={href}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition-colors hover:bg-blue-800 sm:w-auto shrink-0"
          >
            {linkLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
