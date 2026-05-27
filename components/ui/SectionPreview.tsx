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
    <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
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
              className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-900/15 shrink-0"
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
