import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default async function OttStrip() {
  const { data } = await supabase
    .from("ott_packages")
    .select("id, name, apps")
    .eq("is_active", true)
    .order("name", { ascending: true });

  const packages = (data ?? []).filter((p) => Array.isArray(p.apps) && p.apps.length > 0);
  if (packages.length === 0) return null;

  const allApps = Array.from(new Set(packages.flatMap((p) => (p.apps as string[]).map(String))));

  return (
    <section aria-label="OTT bundles" id="ott" className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0E2B57]">
          <div aria-hidden className="network-grid-dark absolute inset-0 opacity-40" />
          <div aria-hidden className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#C1170C]/20 blur-[110px]" />
          <div aria-hidden className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#11418D]/50 blur-[110px]" />
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-[#C1170C]" />
          <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
            <div>
              <p className="tele-eyebrow flex items-center gap-2 text-white/60">
                <Clapperboard className="h-4 w-4" aria-hidden />
                WiFi + OTT bundles
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-[2rem]">
                Your broadband now comes with movie night included.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
                Upgrade any WiFi + OTT plan and stream premium apps on the house —
                billed in one simple broadband invoice.
              </p>
              <Link href="/plans/home" className="tele-btn tele-btn-red mt-5 px-6">
                See OTT plans
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-2">
                {allApps.map((app) => (
                  <span
                    key={app}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-white backdrop-blur"
                  >
                    {app}
                  </span>
                ))}
              </div>
              <ul className="mt-1 grid gap-2 sm:grid-cols-3">
                {packages.slice(0, 3).map((pkg) => (
                  <li key={pkg.id} className="rounded-xl border border-white/15 bg-white/[0.07] p-3.5">
                    <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-white/60">
                      {pkg.name}
                    </p>
                    <p className="mt-1 text-[0.83rem] font-bold leading-snug text-white">
                      {(pkg.apps as string[]).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
