"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{value.toLocaleString("en-IN")}</span>;
}

export default function StatsCounters({ sectorCount }: { sectorCount: number }) {
  const stats = [
    { value: 20000, suffix: "+ km", label: "Fibre backbone", sub: "Metro rings + long-haul" },
    { value: 10000, suffix: "+", label: "Active subscribers", sub: "Homes & businesses" },
    { value: Math.max(sectorCount, 1), suffix: "", label: "Sectors live", sub: "Across Greater Noida" },
    { value: 99.99, suffix: "%", label: "Uptime SLA", sub: "Enterprise-grade NOC", decimals: true },
  ];

  return (
    <dl className="grid grid-cols-2 gap-y-6 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center px-4 text-center ${
            i > 0 ? "lg:border-l lg:border-white/15" : ""
          } ${i % 2 === 1 ? "border-l border-white/15" : ""} ${
            i === 2 ? "max-lg:border-l-0 max-lg:border-t max-lg:border-white/15 max-lg:pt-6" : ""
          } ${i === 3 ? "max-lg:border-t max-lg:border-white/15 max-lg:pt-6" : ""}`}
        >
          <dd className="order-first text-[1.65rem] font-extrabold tabular-nums tracking-tight text-white sm:text-3xl">
            {stat.decimals ? (
              stat.value.toFixed(2)
            ) : (
              <CountUp to={stat.value} />
            )}
            <span className="text-[#FF7A71]">{stat.suffix}</span>
          </dd>
          <dt className="mt-1 text-sm font-extrabold text-white">{stat.label}</dt>
          <p className="text-xs text-white/65">{stat.sub}</p>
        </div>
      ))}
    </dl>
  );
}
