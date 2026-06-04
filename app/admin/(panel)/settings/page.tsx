"use client";

import { useState } from "react";

interface SettingsForm {
  companyName: string;
  logoUrl: string;
  themeMode: "system" | "light" | "dark";
  facebook: string;
  twitter: string;
  linkedin: string;
}

const initialForm: SettingsForm = {
  companyName: "Extranet India Private Limited",
  logoUrl: "/logo.png",
  themeMode: "system",
  facebook: "",
  twitter: "",
  linkedin: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState(initialForm);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>
      <p className="mt-1 text-sm text-slate-500">
        Configure company profile, branding, and social placeholders.
      </p>

      <form
        className="mt-6 grid gap-4 md:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Company Name
          </span>
          <input
            value={form.companyName}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                companyName: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Logo URL
          </span>
          <input
            value={form.logoUrl}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, logoUrl: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Theme Mode (placeholder)
          </span>
          <select
            value={form.themeMode}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                themeMode: event.target.value as SettingsForm["themeMode"],
              }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <div className="hidden md:block" />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Facebook URL
          </span>
          <input
            value={form.facebook}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, facebook: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            placeholder="https://facebook.com/..."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Twitter URL
          </span>
          <input
            value={form.twitter}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, twitter: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            placeholder="https://x.com/..."
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            LinkedIn URL
          </span>
          <input
            value={form.linkedin}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, linkedin: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            placeholder="https://linkedin.com/company/..."
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-[#134799] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#134799]"
          >
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}
