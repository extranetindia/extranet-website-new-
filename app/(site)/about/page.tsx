import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Building2, Network, Users, Award } from "lucide-react";
import Link from "next/link";

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

export default function AboutPage() {
  return (
    <>
      {/* <PageHero
        badge="About Extranet"
        title={<>India&apos;s trusted enterprise ISP</>}
        description="Extranet India Private Limited builds and operates carrier-grade fiber networks for homes, businesses, and institutions — with transparency, reliability, and technical excellence at the core."
      /> */}

      <section className="bg-white pb-12 pt-24 sm:pb-16 sm:pt-28 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <h2 className="mb-4 text-2xl font-black text-slate-900 sm:text-3xl">Company overview</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Founded with a mission to democratize enterprise-grade connectivity,
              Extranet operates metro rings, long-haul fiber, and last-mile FTTH
              across India. We peer with Tier-1 carriers and major IXPs to deliver
              low-latency, high-availability internet.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From residential broadband to dedicated leased lines, every circuit
              is engineered for performance — backed by 24/7 NOC monitoring and
              TRAI-compliant service standards.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6"
              >
                <s.icon className="w-8 h-8 text-blue-700 mb-3" />
                <div className="text-2xl font-black text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">
            Mission & reliability
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            We believe every Indian deserves internet that works — predictably,
            securely, and at the speed promised.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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
                className="p-8 rounded-2xl bg-white border border-slate-200 border-t-4 border-t-blue-700"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/plans"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#134799] px-8 py-4 font-bold text-white transition-colors hover:bg-blue-800"
            >
              Explore our plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
