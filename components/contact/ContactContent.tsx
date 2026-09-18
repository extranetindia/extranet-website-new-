"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createLead, INQUIRY_TYPES } from "@/lib/database/leads";
import { useCompanySettings } from "@/lib/hooks/useCompanySettings";

interface ContactContentProps {
  supportSettings: {
    phone: string;
    email: string;
    whatsapp: string;
    officeAddress: string;
    supportTimings: string;
  };
}

interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
}

const initialForm: ContactFormState = {
  fullName: "",
  phone: "",
  email: "",
  inquiryType: INQUIRY_TYPES[0],
  message: "",
};

export default function ContactContent({ supportSettings }: ContactContentProps) {
  const { settings: companySettings } = useCompanySettings();
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const fullName = form.fullName.trim();
    const phone = form.phone.trim();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    setSubmitting(true);

    const { error: submitError } = await createLead({
      full_name: fullName,
      phone,
      email: form.email.trim() || null,
      inquiry_type: form.inquiryType,
      message: form.message.trim() || null,
    });

    setSubmitting(false);

    if (submitError) {
      setError(
        submitError.message ||
          "We could not submit your inquiry. Please try again or call us directly.",
      );
      return;
    }

    setSuccess(true);
    setForm(initialForm);
  };

  // Use company settings with fallbacks to support settings
  const displayPhone = companySettings?.company_phone || supportSettings.phone;
  const displayEmail = companySettings?.support_email || supportSettings.email;
  const displayAddress = companySettings?.company_address || supportSettings.officeAddress;

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-3">
        <div className="tele-card p-5 sm:p-8">
          <p className="tele-eyebrow text-[#C1170C]">Request a callback</p>
          <h2 className="mb-2 mt-2 text-2xl font-extrabold tracking-tight text-[#15366A]">Send us a message</h2>
          <p className="mb-6 text-sm leading-relaxed text-[#5C6F89]">
            Share your details and our team will reach out — usually within one business day.
          </p>

          {success && (
            <div
              className="mb-5 flex items-start gap-3 rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                Thank you! Your inquiry has been received. Our team will contact you
                shortly.
              </p>
            </div>
          )}

          {error && (
            <div
              className="mb-5 flex items-start gap-3 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-full-name"
                  className="mb-1.5 block text-sm font-bold text-[#33475f]"
                >
                  Full name
                </label>
                <input
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  disabled={submitting}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      fullName: event.target.value,
                    }))
                  }
                  className="w-full min-h-[44px] tele-input disabled:bg-slate-50 disabled:opacity-70"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-sm font-bold text-[#33475f]"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  disabled={submitting}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full min-h-[44px] tele-input disabled:bg-slate-50 disabled:opacity-70"
                  placeholder="+91"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-bold text-[#33475f]"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                disabled={submitting}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    email: event.target.value,
                  }))
                }
                className="w-full min-h-[44px] tele-input disabled:bg-slate-50 disabled:opacity-70"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-inquiry-type"
                className="mb-1.5 block text-sm font-bold text-[#33475f]"
              >
                Inquiry type
              </label>
              <select
                id="contact-inquiry-type"
                name="inquiryType"
                required
                value={form.inquiryType}
                disabled={submitting}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    inquiryType: event.target.value,
                  }))
                }
                className="w-full min-h-[44px] tele-input disabled:bg-slate-50 disabled:opacity-70"
              >
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-bold text-[#33475f]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                disabled={submitting}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
                className="tele-input resize-none disabled:bg-slate-50 disabled:opacity-70"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="tele-btn tele-btn-primary w-full px-8 sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit inquiry"}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        {[
          { icon: Phone, label: "Phone", value: displayPhone },
          { icon: Mail, label: "Email", value: displayEmail },
          { icon: Clock, label: "Hours", value: supportSettings.supportTimings },
        ].map((item, i) => (
          <div
            key={item.label}
            className="tele-card flex gap-4 p-5"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${
              i % 2 === 1 ? "bg-[#C1170C]/10" : "bg-[#11418D]/10"
            }`}>
              <item.icon className={`h-5 w-5 ${i % 2 === 1 ? "text-[#C1170C]" : "text-[#11418D]"}`} />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5C6F89]">
                {item.label}
              </div>
              <div className="mt-0.5 font-bold text-[#15366A]">{item.value}</div>
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-[#DCE3EC] bg-[#F4F7FC] p-5">
          <MapPin className="mb-3 h-5 w-5 text-[#11418D]" aria-hidden />
          <h3 className="mb-3 font-extrabold text-[#15366A]">Office locations</h3>
          <ul className="space-y-3">
            <li>
              <div className="text-sm font-bold text-[#15366A]">Corporate Office</div>
              <div className="text-sm leading-relaxed text-[#5C6F89]">{displayAddress}</div>
            </li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-[#15366A] p-6 text-white">
          <div aria-hidden className="network-grid-dark absolute inset-0 opacity-50" />
          <div className="relative">
          <h3 className="mb-2 text-lg font-extrabold text-white">Ready to connect?</h3>
          <p className="mb-4 text-sm leading-relaxed text-white/75">
            Browse plans or check coverage before you reach out.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/plans"
              className="tele-btn bg-white px-5 text-[#11418D] hover:bg-[#F4F7FC]"
            >
              View plans
            </Link>
            <Link
              href="/coverage"
              className="tele-btn border border-white/30 px-5 text-white hover:bg-white/10"
            >
              Check coverage
            </Link>
          </div>
          </div>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1170C]" />
        </div>
      </div>
    </div>
  );
}

