"use client";

import { useState, useEffect } from "react";
import { saveSettings, getSettings } from "@/lib/database/settings";
import type { SettingsRow } from "@/lib/database/schema";
import { invalidateSettingsCache } from "@/lib/hooks/useCompanySettings";

interface SettingsForm {
  companyName: string;
  logoUrl: string;
  themeMode: "system" | "light" | "dark";
  facebook: string;
  twitter: string;
  linkedin: string;
}

interface CompanyInfoForm {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  supportEmail: string;
  gstNumber: string;
  websiteUrl: string;
  logoUrl: string;
}

const initialSettingsForm: SettingsForm = {
  companyName: "Extranet India Private Limited",
  logoUrl: "/logo.png",
  themeMode: "system",
  facebook: "",
  twitter: "",
  linkedin: "",
};

const initialCompanyInfoForm: CompanyInfoForm = {
  companyName: "Extranet",
  companyAddress: "Bangalore, India",
  companyPhone: "+91-80-XXXX-XXXX",
  companyEmail: "info@extranet.in",
  supportEmail: "support@extranet.in",
  gstNumber: "29AABCE0000Z1",
  websiteUrl: "https://extranet.in",
  logoUrl: "",
};

export default function AdminSettingsPage() {
  const [settingsForm, setSettingsForm] = useState(initialSettingsForm);
  const [companyForm, setCompanyForm] = useState<CompanyInfoForm>(initialCompanyInfoForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load company settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const { data } = await getSettings();
      if (data) {
        setCompanyForm({
          companyName: data.company_name || initialCompanyInfoForm.companyName,
          companyAddress: data.company_address || initialCompanyInfoForm.companyAddress,
          companyPhone: data.company_phone || initialCompanyInfoForm.companyPhone,
          companyEmail: data.company_email || initialCompanyInfoForm.companyEmail,
          supportEmail: data.support_email || initialCompanyInfoForm.supportEmail,
          gstNumber: data.gst_number || initialCompanyInfoForm.gstNumber,
          websiteUrl: data.website_url || initialCompanyInfoForm.websiteUrl,
          logoUrl: data.logo_url || initialCompanyInfoForm.logoUrl,
        });
      }
      setLoading(false);
    };
    void loadSettings();
  }, []);

  const handleSaveCompanyInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);

    try {
      const { error } = await saveSettings({
        company_name: companyForm.companyName,
        company_address: companyForm.companyAddress,
        company_phone: companyForm.companyPhone,
        company_email: companyForm.companyEmail,
        support_email: companyForm.supportEmail,
        gst_number: companyForm.gstNumber,
        website_url: companyForm.websiteUrl,
        logo_url: companyForm.logoUrl || null,
      });

      if (error) {
        setSaveMessage({ type: "error", text: `Error saving settings: ${error.message}` });
      } else {
        setSaveMessage({ type: "success", text: "Company information saved successfully!" });
        // Invalidate cache so hooks will refetch
        invalidateSettingsCache();
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Company Information Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Company Information</h2>
        <p className="mt-1 text-sm text-slate-600">
          Update company details that will be displayed across the website and admin panel.
        </p>

        {saveMessage && (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
              saveMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSaveCompanyInfo}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Company Name *
            </span>
            <input
              type="text"
              value={companyForm.companyName}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyName: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              required
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Website URL
            </span>
            <input
              type="url"
              value={companyForm.websiteUrl}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, websiteUrl: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="https://example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Company Address
            </span>
            <textarea
              value={companyForm.companyAddress}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyAddress: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              rows={3}
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Company Phone
            </span>
            <input
              type="tel"
              value={companyForm.companyPhone}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyPhone: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="+91-XXXX-XXXX"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Company Email
            </span>
            <input
              type="email"
              value={companyForm.companyEmail}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyEmail: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="info@example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Support Email
            </span>
            <input
              type="email"
              value={companyForm.supportEmail}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, supportEmail: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="support@example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              GST Number
            </span>
            <input
              type="text"
              value={companyForm.gstNumber}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, gstNumber: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="29XXXXXXXXXXXXXXXXX"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Logo URL (optional)
            </span>
            <input
              type="url"
              value={companyForm.logoUrl}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, logoUrl: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="https://example.com/logo.png"
              disabled={loading || saving}
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading || saving}
              className="rounded-xl bg-[#134799] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Company Information"}
            </button>
          </div>
        </form>
      </section>

      {/* General Settings Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>
        <p className="mt-1 text-sm text-slate-600">
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
              value={settingsForm.companyName}
              onChange={(event) =>
                setSettingsForm((previous) => ({
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
              value={settingsForm.logoUrl}
              onChange={(event) =>
                setSettingsForm((previous) => ({
                  ...previous,
                  logoUrl: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Theme Mode (placeholder)
            </span>
            <select
              value={settingsForm.themeMode}
              onChange={(event) =>
                setSettingsForm((previous) => ({
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
              value={settingsForm.facebook}
              onChange={(event) =>
                setSettingsForm((previous) => ({
                  ...previous,
                  facebook: event.target.value,
                }))
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
              value={settingsForm.twitter}
              onChange={(event) =>
                setSettingsForm((previous) => ({
                  ...previous,
                  twitter: event.target.value,
                }))
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
              value={settingsForm.linkedin}
              onChange={(event) =>
                setSettingsForm((previous) => ({
                  ...previous,
                  linkedin: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              placeholder="https://linkedin.com/company/..."
            />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-[#134799] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0f3b7f] hover:shadow-lg hover:shadow-blue-900/20"
            >
              Save Settings
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
