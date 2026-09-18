"use client";

import { useState } from "react";
import { PhoneCall, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { createLead } from "@/lib/database/leads";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

export default function QuickCallback() {
  const { settings } = useCompanySettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayPhone = settings?.company_phone || "+91 9540901195";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please share your phone number.");
      return;
    }
    setSubmitting(true);
    const { error: submitError } = await createLead({
      full_name: name.trim(),
      phone: phone.trim(),
      email: null,
      inquiry_type: "New connection — Home",
      message: "Callback requested from homepage strip.",
    });
    setSubmitting(false);
    if (submitError) {
      setError("Something went wrong. Please call us directly instead.");
      return;
    }
    setDone(true);
  };

  return (
    <section aria-label="Request a callback" className="border-t border-[#DCE3EC] bg-[#F8F9FB] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#11418D]">
          <div aria-hidden className="network-grid-dark absolute inset-0 opacity-40" />
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#C1170C]/25 blur-[100px]" />
          <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <p className="tele-eyebrow flex items-center gap-2 text-white/60">
                <PhoneCall className="h-4 w-4" aria-hidden />
                Prefer to talk?
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-[2rem]">
                Get a callback from our broadband experts.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
                Drop your number — we&apos;ll help you pick the right plan and check
                feasibility at your address. Or just call{" "}
                <a href={`tel:${displayPhone.replace(/\s+/g, "")}`} className="font-extrabold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white">
                  {displayPhone}
                </a>
                .
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 sm:p-6">
              {done ? (
                <div className="flex items-start gap-3 py-2" role="status">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden />
                  <div>
                    <p className="font-extrabold text-[#15366A]">Request received, {name.trim().split(" ")[0]}!</p>
                    <p className="mt-1 text-sm text-[#5C6F89]">
                      Our team will call you back shortly. For anything urgent, dial {displayPhone}.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => void submit(e)} className="flex flex-col gap-3">
                  {error && (
                    <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {error}
                    </p>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="qc-name" className="mb-1.5 block text-sm font-bold text-[#33475f]">
                        Your name
                      </label>
                      <input
                        id="qc-name"
                        type="text"
                        value={name}
                        disabled={submitting}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="tele-input disabled:opacity-60"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="qc-phone" className="mb-1.5 block text-sm font-bold text-[#33475f]">
                        Phone number
                      </label>
                      <input
                        id="qc-phone"
                        type="tel"
                        value={phone}
                        disabled={submitting}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 …"
                        className="tele-input disabled:opacity-60"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="tele-btn tele-btn-red w-full">
                    {submitting ? "Requesting…" : "Request callback"}
                    {!submitting && <ArrowRight className="h-4 w-4" aria-hidden />}
                  </button>
                  <p className="text-center text-xs text-[#5C6F89]">No spam, ever. One helpful call, that&apos;s it.</p>
                </form>
              )}
            </div>
          </div>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
        </div>
      </div>
    </section>
  );
}
