"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface SectionPreviewProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionPreview({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  children,
  className = "bg-[#F8F9FB]",
  id,
}: SectionPreviewProps) {
  return (
    <section id={id} className={`relative overflow-x-clip py-10 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href={href}
              className="tele-btn tele-btn-outline inline-flex w-full px-6 sm:w-auto"
            >
              {linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
        {children}
      </div>
    </section>
  );
}
