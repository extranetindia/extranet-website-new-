"use client";

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
      {/* Central glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/15 blur-2xl" />

      {/* Animated rings */}
      {[280, 380, 480, 580].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-blue-500/20"
          style={{ width: size, height: size }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Red accent ring */}
      <motion.div
        className="absolute rounded-full border border-red-500/15"
        style={{ width: 340, height: 340 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
          style={{
            left: `calc(50% + ${170 * Math.cos((angle * Math.PI) / 180)}px)`,
            top: `calc(50% + ${170 * Math.sin((angle * Math.PI) / 180)}px)`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Center icon */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 to-red-600/20 border border-blue-500/30 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden network-grid"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020509] via-[#050a14] to-[#050a14]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 blur-[100px] rounded-full" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-600/6 blur-[80px] rounded-full" />

      {/* Network visualization on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden xl:block">
        <NetworkOrb />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            India&apos;s Premium ISP — Trusted by 50,000+ customers
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-white">Lightning-Fast</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent text-glow-blue">
              Internet
            </span>{" "}
            <span className="text-white">for</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Every Indian
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl"
          >
            Extranet India delivers enterprise-grade fiber and broadband internet
            with guaranteed speeds, zero throttling, and round-the-clock technical
            support. From homes to data centers — we connect India.
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300"
              >
                <badge.icon className="w-4 h-4 text-blue-400" />
                {badge.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#plans"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg transition-all duration-200 shadow-xl shadow-blue-900/40 hover:shadow-blue-800/50 hover:scale-[1.02]"
            >
              View Plans & Pricing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#coverage"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 text-white font-semibold text-lg transition-all duration-200"
            >
              Check Coverage
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="text-center sm:text-left"
              >
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a14] to-transparent" />
    </section>
  );
}
