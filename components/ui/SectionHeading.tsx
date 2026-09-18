"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

/**
 * Shared enterprise section heading — eyebrow → title → supporting copy.
 * Keeps typography hierarchy identical across all public sections.
 * The red rule draws itself in as the section arrives — quiet confidence.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  const titleCls = tone === "dark" ? "text-white" : "text-[#15366A]";
  const descCls = tone === "dark" ? "text-white/75" : "text-[#5C6F89]";

  return (
    <div className={`flex max-w-2xl flex-col ${alignCls}`}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.3 }}
        className="tele-eyebrow flex items-center gap-2 text-[#C1170C]"
      >
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block h-[2px] w-7 origin-left rounded-full bg-[#C1170C]"
        />
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`mt-3 text-[1.65rem] font-extrabold leading-[1.15] sm:text-4xl ${titleCls}`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={`mt-3 text-[0.95rem] leading-relaxed sm:text-base ${descCls}`}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
