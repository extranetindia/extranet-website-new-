"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Clock } from "lucide-react";

const stats = [
  { value: "10 Gbps", label: "Max Speed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "500+", label: "Cities Covered" },
  { value: "24/7", label: "Expert Support" },
];

const badges = [
  { icon: Zap, text: "Up to 1 Gbps" },
  { icon: Shield, text: "Enterprise Security" },
  { icon: Clock, text: "99.9% Uptime" },
];

function NetworkOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-400/15 blur-2xl" />
      {[280, 380, 480, 580].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-blue-300/40"
          style={{ width: size, height: size }}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.03, 1] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute rounded-full border border-red-300/30"
        style={{ width: 340, height: 340 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-500"
          style={{
            left: `calc(50% + ${170 * Math.cos((angle * Math.PI) / 180)}px)`,
            top: `calc(50% + ${170 * Math.sin((angle * Math.PI) / 180)}px)`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-red-50 border border-blue-200 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 network-grid-light">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-500/8 blur-[80px] rounded-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden xl:block opacity-80">
        <NetworkOrb />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            India&apos;s Premium ISP — Trusted by 50,000+ customers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-slate-900"
          >
            Lightning-Fast{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Internet
            </span>
            <br />
            for{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Every Indian
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl"
          >
            Extranet India delivers enterprise-grade fiber and broadband with
            guaranteed speeds, zero throttling, and round-the-clock technical
            support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 shadow-sm"
              >
                <badge.icon className="w-4 h-4 text-blue-600" />
                {badge.text}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/plans"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg transition-all shadow-lg shadow-blue-900/20 hover:scale-[1.02]"
            >
              View Plans & Pricing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/coverage"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-lg transition-all shadow-sm"
            >
              Check Coverage
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
