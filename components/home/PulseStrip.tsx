import { Activity } from "lucide-react";

const PULSES = [
  "All systems operational",
  "99.99% uptime SLA",
  "24×7 network operations centre",
  "TRAI-compliant network",
  "20,000+ km fibre backbone",
  "Unlimited data · No throttling",
];

/**
 * Breaking-news style network ticker — agency-marquee energy,
 * but every claim is a real published service standard.
 */
export default function PulseStrip() {
  const loop = [...PULSES, ...PULSES];

  return (
    <section aria-label="Network status" className="tele-marquee overflow-hidden bg-[#C1170C] py-2.5">
      <div className="tele-marquee-track flex w-max items-center" style={{ animationDuration: "28s" }}>
        {loop.map((pulse, i) => (
          <span
            key={`${pulse}-${i}`}
            aria-hidden={i >= PULSES.length}
            className="flex items-center gap-2.5 whitespace-nowrap px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-white"
          >
            <Activity className="h-3.5 w-3.5" aria-hidden />
            {pulse}
            <span aria-hidden className="tele-live-dot ml-4 inline-block h-1.5 w-1.5 rounded-full bg-white text-white" />
          </span>
        ))}
      </div>
    </section>
  );
}
