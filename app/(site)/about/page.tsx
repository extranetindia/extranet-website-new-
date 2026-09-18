import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FiberPulseMap from "@/components/home/FiberPulseMap";
import { Building2, Network, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Extranet India — enterprise ISP infrastructure, mission, and nationwide fiber network.",
};

const stats = [
  { icon: Network, value: "20,000+ km", label: "Fiber backbone" },
  { icon: Users, value: "10,000+", label: "Active subscribers" },
  { icon: Building2, value: "50+", label: "Cities served" },
  { icon: Award, value: "99.99%", label: "Enterprise SLA" },
];

export default async function AboutPage() {
  const { data: cities } = await supabase
    .from("cities")
    .select("name")
    .eq("active", true)
    .order("name", { ascending: true });

  return (
    <>
      <PageHero
        badge="About Extranet"
        title="India's trusted enterprise ISP"
        description="Extranet India Private Limited builds and operates carrier-grade fiber networks for homes, businesses, and institutions — with transparency, reliability, and technical excellence at the core."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <p className="tele-eyebrow flex items-center gap-2 text-[#C1170C]">
              <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
              Company overview
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#15366A] sm:text-3xl">
              Carrier-grade infrastructure, run by network engineers
            </h2>
            <p className="mt-4 leading-relaxed text-[#475569]">
              Founded with a mission to democratize enterprise-grade connectivity,
              Extranet operates metro rings, long-haul fiber, and last-mile FTTH
              across India. We peer with Tier-1 carriers and major IXPs to deliver
              low-latency, high-availability internet.
            </p>
            <p className="mt-4 leading-relaxed text-[#475569]">
              From residential broadband to dedicated leased lines, every circuit
              is engineered for performance — backed by 24/7 NOC monitoring and
              TRAI-compliant service standards.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="tele-card tele-card-hover p-5 sm:p-6"
              >
                <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] ${
                  i % 2 === 1 ? "bg-[#C1170C]/10 text-[#C1170C]" : "bg-[#11418D]/10 text-[#11418D]"
                }`}>
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className={`text-2xl font-extrabold tracking-tight ${i % 2 === 1 ? "text-[#C1170C]" : "text-[#11418D]"}`}>{s.value}</div>
                <div className="mt-0.5 text-sm font-semibold text-[#5C6F89]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FiberPulseMap sectors={(cities ?? []).map((c) => c.name).filter(Boolean)} />
        </div>
      </section>

      <section className="border-y border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="tele-eyebrow justify-center text-[#C1170C]">What we stand for</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#15366A] sm:text-3xl">
              Mission &amp; reliability
            </h2>
            <p className="mt-3 leading-relaxed text-[#5C6F89]">
              We believe every Indian deserves internet that works — predictably,
              securely, and at the speed promised.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Transparent service",
                body: "No speed throttling on unlimited plans. Published SLAs and proactive outage communication.",
              },
              {
                title: "Carrier-grade infrastructure",
                body: "Redundant paths, diverse POPs, and DDoS-ready edge security for business customers.",
              },
              {
                title: "People-first support",
                body: "Certified engineers — not scripts. Escalation to senior network staff when it matters.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="tele-card tele-card-hover overflow-hidden p-6 sm:p-7"
              >
                <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-[#C1170C]" />
                <h3 className="mb-2 text-lg font-extrabold text-[#15366A]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#5C6F89]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/plans"
              className="tele-btn tele-btn-primary px-8"
            >
              Explore our plans
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="tele-btn tele-btn-outline px-8"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
