import Link from "next/link";
import { MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default async function SectorsMarquee() {
  const { data } = await supabase
    .from("cities")
    .select("id, name")
    .eq("active", true)
    .order("name", { ascending: true });

  const sectors = (data ?? []).map((c) => c.name).filter(Boolean);
  if (sectors.length === 0) return null;

  const loop = [...sectors, ...sectors];

  return (
    <section aria-label="Areas we serve" className="tele-marquee overflow-hidden border-b border-[#DCE3EC] bg-[#15366A]">
      <div className="flex items-stretch">
        <Link
          href="/coverage"
          className="relative z-10 flex shrink-0 items-center gap-2 bg-[#C1170C] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white sm:px-6"
        >
          <span className="tele-live-dot inline-block h-2 w-2 rounded-full bg-white text-white" aria-hidden />
          Now live
        </Link>
        <div className="relative flex-1 overflow-hidden" aria-hidden={false}>
          <div className="tele-marquee-track flex w-max items-center">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= sectors.length}
                className="flex items-center gap-1.5 whitespace-nowrap px-5 text-[0.83rem] font-semibold text-white/85"
              >
                <MapPin className="h-3.5 w-3.5 text-white/50" aria-hidden />
                {name}
              </span>
            ))}
          </div>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#15366A] to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#15366A] to-transparent" />
        </div>
      </div>
    </section>
  );
}
