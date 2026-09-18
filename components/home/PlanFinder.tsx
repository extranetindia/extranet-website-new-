"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles, Wifi, Building2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface QuizPlan {
  id: string;
  name: string;
  speed: string;
  price: string | null;
  plan_type: string | null;
  home_plan_category: string | null;
  setup_fee: string | null;
  security_deposit: string | null;
  popular: boolean | null;
}

function speedMbps(speed: string): number {
  const match = String(speed).match(/(\d+(?:\.\d+)?)\s*(G)?\s*M?BPS/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  return match[2] ? value * 1000 : value;
}

function priceNum(price: string | null): number {
  const n = Number(String(price ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

type Audience = "home" | "business";
type Usage = "browse" | "stream" | "wfh" | "everything" | "small" | "growing" | "large";

const AUDIENCE_OPTIONS: Array<{ value: Audience; title: string; sub: string; icon: typeof Wifi }> = [
  { value: "home", title: "Home", sub: "Family, streaming, study & play", icon: Wifi },
  { value: "business", title: "Business / Office", sub: "Teams, billing & uptime", icon: Building2 },
];

const HOME_USAGE: Array<{ value: Usage; title: string; sub: string; need: number }> = [
  { value: "browse", title: "Browsing & study", sub: "Social, classes, video calls", need: 50 },
  { value: "wfh", title: "Work from home", sub: "Meetings, uploads, VPN", need: 100 },
  { value: "stream", title: "4K streaming & gaming", sub: "Netflix, Hotstar, BGMI", need: 150 },
  { value: "everything", title: "Everything, all at once", sub: "A house full of screens", need: 200 },
];

const BUSINESS_SIZE: Array<{ value: Usage; title: string; sub: string; need: number }> = [
  { value: "small", title: "Small office", sub: "1–10 people", need: 100 },
  { value: "growing", title: "Growing team", sub: "10–50 people", need: 300 },
  { value: "large", title: "Large site", sub: "50+ people / campus", need: 500 },
];

const DEVICE_OPTIONS: Array<{ value: string; title: string; need: number }> = [
  { value: "few", title: "1–5 devices", need: 50 },
  { value: "several", title: "6–10 devices", need: 150 },
  { value: "many", title: "10+ devices", need: 300 },
];

export default function PlanFinder() {
  const [plans, setPlans] = useState<QuizPlan[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [usage, setUsage] = useState<{ value: Usage; need: number } | null>(null);
  const [devices, setDevices] = useState<{ value: string; need: number } | null>(null);
  const [wantsOtt, setWantsOtt] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("plans")
        .select("id, name, speed, price, plan_type, home_plan_category, setup_fee, security_deposit, popular");
      if (mounted) {
        setPlans((data as QuizPlan[]) ?? []);
        setLoaded(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const totalSteps = audience === "business" ? 2 : 4;

  const result = useMemo(() => {
    if (!audience || !usage) return null;
    if (audience === "home" && (devices === null || wantsOtt === null)) return null;
    const category = wantsOtt ? "wifi_ott" : "wifi";
    const pool =
      audience === "home"
        ? plans.filter((p) => p.plan_type === "home" && (p.home_plan_category ?? "wifi") === category)
        : plans.filter((p) => p.plan_type === "business");
    if (pool.length === 0) return null;
    const need = audience === "home" ? Math.max(usage.need, devices?.need ?? 0) : usage.need;
    const meeting = pool
      .filter((p) => speedMbps(p.speed) >= need)
      .sort((a, b) => priceNum(a.price) - priceNum(b.price));
    if (meeting.length > 0) return { plan: meeting[0], exact: true };
    const fallback = [...pool].sort((a, b) => speedMbps(b.speed) - speedMbps(a.speed))[0];
    return { plan: fallback, exact: false };
  }, [audience, usage, devices, wantsOtt, plans]);

  const reset = () => {
    setStep(0);
    setAudience(null);
    setUsage(null);
    setDevices(null);
    setWantsOtt(null);
  };

  const showResult = audience !== null && result !== null && step >= totalSteps;

  return (
    <section aria-label="Find your perfect plan" id="finder" className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#15366A]">
          <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
          <div aria-hidden className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#C1170C]/20 blur-[110px]" />
          <div aria-hidden className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#11418D]/50 blur-[110px]" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
            <div className="flex flex-col justify-center">
              <p className="tele-eyebrow flex items-center gap-2 text-white/60">
                <Sparkles className="h-4 w-4 text-white/60" aria-hidden />
                Plan finder
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-[2rem]">
                Let&apos;s find your perfect internet plan.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
                Answer {audience === "business" ? "2" : "3"} quick questions and we&apos;ll match
                you with the right speed from our live plans — no guesswork, no overselling.
              </p>
              {!showResult && (
                <div className="mt-5 flex items-center gap-2" aria-hidden>
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < step ? "w-8 bg-[#C1170C]" : i === step ? "w-8 bg-white" : "w-4 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl bg-white p-5 sm:p-7">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <QuizStep key="s0" title="Who is this connection for?">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {AUDIENCE_OPTIONS.map((opt) => (
                        <OptionButton
                          key={opt.value}
                          title={opt.title}
                          sub={opt.sub}
                          icon={<opt.icon className="h-5 w-5" aria-hidden />}
                          onClick={() => {
                            setAudience(opt.value);
                            setUsage(null);
                            setDevices(null);
                            setWantsOtt(null);
                            setStep(1);
                          }}
                        />
                      ))}
                    </div>
                  </QuizStep>
                )}

                {step === 1 && audience && (
                  <QuizStep
                    key="s1"
                    title={audience === "home" ? "How do you spend time online?" : "How big is your team or site?"}
                    onBack={() => setStep(0)}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(audience === "home" ? HOME_USAGE : BUSINESS_SIZE).map((opt) => (
                        <OptionButton
                          key={opt.value}
                          title={opt.title}
                          sub={opt.sub}
                          onClick={() => {
                            setUsage({ value: opt.value, need: opt.need });
                            setStep(2);
                          }}
                        />
                      ))}
                    </div>
                  </QuizStep>
                )}

                {step === 2 && audience === "home" && (
                  <QuizStep key="s2" title="How many devices connect at once?" onBack={() => setStep(1)}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {DEVICE_OPTIONS.map((opt) => (
                        <OptionButton
                          key={opt.value}
                          title={opt.title}
                          onClick={() => {
                            setDevices({ value: opt.value, need: opt.need });
                            setStep(3);
                          }}
                        />
                      ))}
                    </div>
                  </QuizStep>
                )}

                {step === 2 && audience === "business" && result && (
                  <ResultCard key="r-biz" plan={result.plan} exact={result.exact} audience="business" onReset={reset} />
                )}

                {step === 3 && audience === "home" && (
                  <QuizStep key="s3" title="Want streaming apps bundled in?" onBack={() => setStep(2)}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <OptionButton
                        title="Yes, bundle OTT"
                        sub="Netflix, Prime Video & more"
                        onClick={() => {
                          setWantsOtt(true);
                          setStep(4);
                        }}
                      />
                      <OptionButton
                        title="No, internet only"
                        sub="Keep it lean & fast"
                        onClick={() => {
                          setWantsOtt(false);
                          setStep(4);
                        }}
                      />
                    </div>
                  </QuizStep>
                )}

                {step >= 4 && audience === "home" && result && (
                  <ResultCard key="r-home" plan={result.plan} exact={result.exact} audience="home" onReset={reset} />
                )}

                {step >= 2 && !result && !loaded && (
                  <div key="loading" className="space-y-3 py-4" aria-live="polite">
                    <div className="h-5 w-2/3 animate-pulse rounded-md bg-[#EDF1F6]" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="min-h-[64px] animate-pulse rounded-xl bg-[#F4F7FC]" />
                      <div className="min-h-[64px] animate-pulse rounded-xl bg-[#F4F7FC]" />
                    </div>
                    <p className="text-center text-xs font-semibold text-[#5C6F89]">
                      Pulling live plans…
                    </p>
                  </div>
                )}

                {step >= 2 && !result && loaded && plans.length > 0 && (
                  <div key="empty" className="py-6 text-center">
                    <p className="font-extrabold text-[#15366A]">Plans are being updated right now.</p>
                    <p className="mt-1 text-sm text-[#5C6F89]">Talk to us and we&apos;ll match you manually.</p>
                    <Link href="/contact" className="tele-btn tele-btn-primary mt-4 px-6">
                      Contact sales
                    </Link>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
        </div>
      </div>
    </section>
  );
}

function QuizStep({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
    >
      <div className="mb-4 flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#DCE3EC] text-[#5C6F89] transition-colors hover:border-[#11418D] hover:text-[#11418D]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
        )}
        <h3 className="text-lg font-extrabold tracking-tight text-[#15366A]">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function OptionButton({
  title,
  sub,
  icon,
  onClick,
}: {
  title: string;
  sub?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[64px] items-center gap-3 rounded-xl border border-[#DCE3EC] bg-white p-4 text-left transition-all duration-200 hover:border-[#11418D] hover:bg-[#F4F7FC] hover:shadow-[0_8px_20px_rgba(17,65,141,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11418D]/40"
    >
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#11418D]/10 text-[#11418D]">
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block text-[0.95rem] font-extrabold text-[#15366A]">{title}</span>
        {sub && <span className="mt-0.5 block text-xs text-[#5C6F89]">{sub}</span>}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-[#DCE3EC] transition-all group-hover:translate-x-0.5 group-hover:text-[#C1170C]" aria-hidden />
    </button>
  );
}

function ResultCard({
  plan,
  exact,
  audience,
  onReset,
}: {
  plan: QuizPlan;
  exact: boolean;
  audience: Audience;
  onReset: () => void;
}) {
  const price = String(plan.price ?? "").replace(/\s*\*+$/, "");
  const numeric = Number(price.replace(/[^\d.]/g, ""));
  const inclGst = Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric * 1.18).toLocaleString("en-IN") : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <p className="tele-eyebrow flex items-center gap-2 text-[#C1170C]">
        <Check className="h-4 w-4" aria-hidden />
        Your match
      </p>
      <div className="mt-3 rounded-xl border-2 border-[#11418D]/20 bg-[#F4F7FC] p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C1170C]">
          {plan.speed}{plan.plan_type === "home" && plan.home_plan_category === "wifi_ott" ? " + OTT" : ""}
        </p>
        <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#15366A]">{plan.name}</h3>
        <p className="mt-2 flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-[#11418D]">₹{price}</span>
          <span className="text-sm font-bold text-[#5C6F89]">/month · excl. GST</span>
        </p>
        {inclGst && <p className="mt-0.5 text-xs text-[#5C6F89]">₹{inclGst}/month inclusive of 18% GST</p>}
        {!exact && (
          <p className="mt-2 text-xs font-semibold text-[#5C6F89]">
            Our fastest option in this range — call us and we&apos;ll tailor it further.
          </p>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link href="/contact" className="tele-btn tele-btn-red flex-1 px-5">
            Get this plan
          </Link>
          <Link
            href={audience === "home" ? "/plans/home" : "/plans/business"}
            className="tele-btn tele-btn-outline flex-1 px-5"
          >
            Compare all
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 inline-flex items-center gap-1.5 text-[0.83rem] font-bold text-[#5C6F89] hover:text-[#11418D]"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden />
        Retake the quiz
      </button>
    </motion.div>
  );
}
