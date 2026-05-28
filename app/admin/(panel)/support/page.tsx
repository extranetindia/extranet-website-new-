"use client";

import { useState } from "react";
import { initialSupportSettings } from "@/lib/admin/mock-data";

export default function AdminSupportPage() {
  const [form, setForm] = useState(initialSupportSettings);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Support Settings</h2>
      <p className="mt-1 text-sm text-slate-500">
        Configure customer care details shown across the public website.
      </p>

      <form
        className="mt-6 grid gap-4 md:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone Number
          </span>
          <input
            value={form.phone}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, phone: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Email Address
          </span>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, email: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            WhatsApp Number
          </span>
          <input
            value={form.whatsapp}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, whatsapp: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Support Timings
          </span>
          <input
            value={form.supportTimings}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                supportTimings: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Office Address
          </span>
          <textarea
            rows={3}
            value={form.officeAddress}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                officeAddress: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Save Support Settings
          </button>
        </div>
      </form>
    </section>
  );
}
