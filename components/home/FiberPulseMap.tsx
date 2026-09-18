"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Route, ShieldCheck, HeadphonesIcon } from "lucide-react";

interface NodeDef {
  x: number;
  y: number;
  dy: number;
  d: string;
}

const NODES: NodeDef[] = [
  { x: 140, y: 115, dy: -14, d: "M400,225 Q265,160 140,115" },
  { x: 300, y: 70, dy: -14, d: "M400,225 Q350,140 300,70" },
  { x: 520, y: 80, dy: -14, d: "M400,225 Q460,140 520,80" },
  { x: 662, y: 150, dy: -14, d: "M400,225 Q545,180 662,150" },
  { x: 615, y: 325, dy: 26, d: "M400,225 Q515,285 615,325" },
  { x: 185, y: 330, dy: 26, d: "M400,225 Q290,285 185,330" },
];

const PULSE_COLORS = ["#ffffff", "#FF7A71", "#ffffff", "#34D399", "#FF7A71", "#ffffff"];
const PULSE_DURATIONS = [5.6, 4.3, 6.4, 4.9, 5.9, 4.5];

const ASSURANCES = [
  { icon: Route, value: "20,000+ km", label: "Fibre backbone" },
  { icon: ShieldCheck, value: "99.99%", label: "Uptime SLA" },
  { icon: HeadphonesIcon, value: "24×7", label: "NOC engineers" },
];

function shortenSector(name: string) {
  return name.split(",")[0].trim();
}

/**
 * Living backbone visualization — pulses travel fibre paths between the
 * NOC core and live sectors. Motion is slow and sonar-like: corporate
 * calm, never arcade. Sector names come from the coverage database.
 */
export default function FiberPulseMap({ sectors }: { sectors: string[] }) {
  const labels = (() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const name of sectors) {
      const short = shortenSector(name);
      if (short && !seen.has(short)) {
        seen.add(short);
        out.push(short);
      }
      if (out.length >= NODES.length) break;
    }
    while (out.length < NODES.length) out.push("");
    return out;
  })();

  return (
    <motion.section
      aria-label="Extranet fibre backbone"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-[#15366A]"
    >
      <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -left-28 top-0 h-96 w-96 rounded-full bg-[#11418D]/60 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#C1170C]/20 blur-[120px]" />

      <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <svg
            viewBox="0 0 800 440"
            className="h-auto w-full"
            role="img"
            aria-label="Illustrative map of the Extranet fibre network connecting the Greater Noida operations centre to live sectors"
          >
            {/* Range rings */}
            {[70, 120, 170].map((r) => (
              <circle key={r} cx={400} cy={225} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            ))}

            {/* Fibre paths */}
            {NODES.map((node, i) => (
              <path key={i} d={node.d} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
            ))}

            {/* Travelling pulses */}
            <g className="fiber-pulses">
              {NODES.map((node, i) => (
                <circle
                  key={i}
                  r={3.5}
                  fill={PULSE_COLORS[i % PULSE_COLORS.length]}
                  opacity={0.95}
                  className="fiber-pulse"
                  style={{
                    offsetPath: `path("${node.d}")`,
                    animationDuration: `${PULSE_DURATIONS[i % PULSE_DURATIONS.length]}s`,
                    animationDelay: `${(i * 0.9).toFixed(1)}s`,
                  }}
                />
              ))}
            </g>

            {/* Sector nodes */}
            {NODES.map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth={1.5}
                  className="fiber-ring"
                  style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
                />
                <circle cx={node.x} cy={node.y} r={4} fill="#ffffff" />
                {labels[i] ? (
                  <text
                    x={node.x}
                    y={node.y + node.dy}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.75)"
                    fontSize={12.5}
                    fontWeight={700}
                  >
                    {labels[i]}
                  </text>
                ) : null}
              </g>
            ))}

            {/* NOC core */}
            <circle cx={400} cy={225} r={11} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            {[0, 1.4].map((delay) => (
              <circle
                key={delay}
                cx={400}
                cy={225}
                r={11}
                fill="none"
                stroke="#C1170C"
                strokeWidth={2}
                className="fiber-ring"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
            <circle cx={400} cy={225} r={5.5} fill="#C1170C" />
            <text x={400} y={258} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={800}>
              Extranet NOC
            </text>
            <text x={400} y={274} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={11}>
              Greater Noida
            </text>
          </svg>
          <p className="mt-2 text-center text-[0.7rem] font-medium tracking-wide text-white/40">
            Illustrative map · sector names live from our coverage database
          </p>
        </div>

        <div>
          <p className="tele-eyebrow flex items-center gap-2 text-white/60">
            <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
            Network operations
          </p>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-[1.7rem]">
            A living fibre backbone, watched around the clock.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Every connection rides diverse fibre paths back to our network
            operations centre — with automatic failover and engineers on shift,
            day and night.
          </p>
          <ul className="mt-6 grid grid-cols-3 gap-3">
            {ASSURANCES.map((item) => (
              <li key={item.label} className="rounded-xl border border-white/15 bg-white/[0.07] p-3.5">
                <item.icon className="h-5 w-5 text-[#FF7A71]" aria-hidden />
                <p className="mt-2 text-lg font-extrabold tracking-tight text-white">{item.value}</p>
                <p className="text-[0.7rem] font-semibold leading-snug text-white/60">{item.label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/coverage" className="tele-btn tele-btn-red px-6">
              Check availability
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/plans" className="tele-btn border border-white/25 px-6 text-white hover:bg-white/10">
              View plans
            </Link>
          </div>
        </div>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
    </motion.section>
  );
}
