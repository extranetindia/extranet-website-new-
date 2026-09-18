"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
  crumbs?: Crumb[];
}

export default function PageHero({
  badge,
  title,
  description,
  children,
  crumbs,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#DCE3EC] bg-[#F4F7FC]">
      <div aria-hidden className="network-grid-light absolute inset-0" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[#11418D]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-11 sm:pt-12 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#5C6F89]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#11418D]">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-[#8ba0bb]" aria-hidden />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-[#11418D]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-[#11418D]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="tele-eyebrow flex items-center gap-2 text-[#C1170C]"
          >
            <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-[#15366A] sm:text-4xl lg:text-[2.9rem]"
        >
          {title}
        </motion.h1>
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="mt-4 block h-1 w-16 origin-left rounded-full bg-[#C1170C]"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#5C6F89] sm:text-lg"
        >
          {description}
        </motion.p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
