"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createLead, INQUIRY_TYPES } from "@/lib/database/leads";

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

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-black text-slate-900">Send us a message</h2>

          {success && (
            <div
              className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
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
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
                  className="mb-1.5 block text-sm font-medium text-slate-700"
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
                  className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 ease-in-out hover:border-[#134799]/35 focus:border-[#134799] focus:outline-none focus:ring-2 focus:ring-[#134799]/10 disabled:bg-slate-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
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
                  className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 ease-in-out hover:border-[#134799]/35 focus:border-[#134799] focus:outline-none focus:ring-2 focus:ring-[#134799]/10 disabled:bg-slate-50"
                  placeholder="+91"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
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
                className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 ease-in-out hover:border-[#134799]/35 focus:border-[#134799] focus:outline-none focus:ring-2 focus:ring-[#134799]/10 disabled:bg-slate-50"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-inquiry-type"
                className="mb-1.5 block text-sm font-medium text-slate-700"
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
                className="w-full min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 ease-in-out hover:border-[#134799]/35 focus:border-[#134799] focus:outline-none focus:ring-2 focus:ring-[#134799]/10 disabled:bg-slate-50"
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
                className="mb-1.5 block text-sm font-medium text-slate-700"
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
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 ease-in-out hover:border-[#134799]/35 focus:border-[#134799] focus:outline-none focus:ring-2 focus:ring-[#134799]/10 disabled:bg-slate-50"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[44px] rounded-xl bg-[#134799] px-8 py-3.5 font-bold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit inquiry"}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        {[
          { icon: Phone, label: "Phone", value: supportSettings.phone },
          { icon: Mail, label: "Email", value: supportSettings.email },
          { icon: Clock, label: "Hours", value: supportSettings.supportTimings },
        ].map((item) => (
          <div
            key={item.label}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-text-[#134799]">
              <item.icon className="h-5 w-5 text-[#134799]" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider hover:text-[#134799]">
                {item.label}
              </div>
              <div className="font-semibold text-slate-900">{item.value}</div>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <MapPin className="mb-3 h-5 w-5 text-[#134799]" />
          <h3 className="mb-3 font-bold text-slate-900">Office locations</h3>
          <ul className="space-y-3">
            <li>
              <div className="text-sm font-semibold text-slate-900">Corporate Office</div>
              <div className="text-sm text-slate-600">{supportSettings.officeAddress}</div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-[#134799] to-[#0f3b7f] p-6 text-white">
          <h3 className="mb-2 text-lg font-bold">Ready to connect?</h3>
          <p className="mb-4 text-sm text-white/80">
            Browse plans or check coverage before you reach out.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/plans"
              className="rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-[#134799] transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-[#0f3b7f]"
            >
              View plans
            </Link>
            <Link
              href="/coverage"
              className="rounded-lg border border-white/30 py-2.5 text-center text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-white/10 hover:border-white/50"
            >
              Check coverage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
