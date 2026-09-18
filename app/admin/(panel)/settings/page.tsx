"use client";

import { useState, useEffect } from "react";
import { saveSettings, getSettings } from "@/lib/database/settings";
import type { SettingsRow } from "@/lib/database/schema";
import { invalidateSettingsCache } from "@/lib/hooks/useCompanySettings";

interface CompanyInfoForm {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  supportEmail: string;
  gstNumber: string;
  websiteUrl: string;
  logoUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
}

const initialCompanyInfoForm: CompanyInfoForm = {
  companyName: "Extranet",
  companyAddress: "Bangalore, India",
  companyPhone: "+91-80-XXXX-XXXX",
  companyEmail: "info@extranet.in",
  supportEmail: "support@extranet.in",
  gstNumber: "29AABCE0000Z1",
  websiteUrl: "https://extranet.in",
  logoUrl: "",
  announcementEnabled: false,
  announcementText: "",
};

export default function AdminSettingsPage() {
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
          announcementEnabled: data.announcement_enabled || false,
          announcementText: data.announcement_text || "",
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
        announcement_enabled: companyForm.announcementEnabled,
        announcement_text: companyForm.announcementText || null,
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
      <section className="tele-card p-5">
        <h2 className="text-lg font-semibold text-[#15366A]">Company Information</h2>
        <p className="mt-1 text-sm text-[#5C6F89]">
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
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Company Name *
            </span>
            <input
              type="text"
              value={companyForm.companyName}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyName: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              required
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Website URL
            </span>
            <input
              type="url"
              value={companyForm.websiteUrl}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, websiteUrl: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="https://example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Company Address
            </span>
            <textarea
              value={companyForm.companyAddress}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyAddress: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              rows={3}
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Company Phone
            </span>
            <input
              type="tel"
              value={companyForm.companyPhone}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyPhone: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="+91-XXXX-XXXX"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Company Email
            </span>
            <input
              type="email"
              value={companyForm.companyEmail}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, companyEmail: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="info@example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Support Email
            </span>
            <input
              type="email"
              value={companyForm.supportEmail}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, supportEmail: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="support@example.com"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              GST Number
            </span>
            <input
              type="text"
              value={companyForm.gstNumber}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, gstNumber: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="29XXXXXXXXXXXXXXXXX"
              disabled={loading || saving}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#475569]">
              Logo URL (optional)
            </span>
            <input
              type="url"
              value={companyForm.logoUrl}
              onChange={(e) =>
                setCompanyForm((prev) => ({ ...prev, logoUrl: e.target.value }))
              }
              className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
              placeholder="https://example.com/logo.png"
              disabled={loading || saving}
            />
          </label>

          {/* Announcement Section */}
          <div className="md:col-span-2 border-t pt-6 mt-6">
            <h3 className="text-base font-semibold text-[#15366A] mb-4">Announcement Bar Settings</h3>
            
            <label className="block mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={companyForm.announcementEnabled}
                  onChange={(e) =>
                    setCompanyForm((prev) => ({ ...prev, announcementEnabled: e.target.checked }))
                  }
                  className="w-4 h-4 rounded border-[#DCE3EC] text-[#11418D] focus:ring-[#11418D]/30 cursor-pointer"
                  disabled={loading || saving}
                />
                <span className="text-sm font-medium text-[#475569]">Enable Announcement Bar</span>
              </div>
            </label>

            {companyForm.announcementEnabled && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#475569]">
                  Announcement Message
                </span>
                <textarea
                  value={companyForm.announcementText}
                  onChange={(e) =>
                    setCompanyForm((prev) => ({ ...prev, announcementText: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
                  placeholder="Enter your announcement message here..."
                  rows={2}
                  disabled={loading || saving}
                />
              </label>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading || saving}
              className="rounded-xl bg-[#11418D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0e3675] hover:shadow-lg hover:shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Company Information"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
