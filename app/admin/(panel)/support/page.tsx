"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupportSettings, saveSupportSettings } from "@/lib/database/support";
import { initialSupportSettings } from "@/lib/admin/mock-data";

export default function AdminSupportPage() {
  const [form, setForm] = useState(initialSupportSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error: fetchError } = await getSupportSettings();

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setForm({
      phone: data?.phone ?? initialSupportSettings.phone,
      email: data?.email ?? initialSupportSettings.email,
      whatsapp: data?.whatsapp ?? initialSupportSettings.whatsapp,
      supportTimings: data?.support_timings ?? initialSupportSettings.supportTimings,
      officeAddress: data?.office_address ?? initialSupportSettings.officeAddress,
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const { error: saveError } = await saveSupportSettings({
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      support_timings: form.supportTimings.trim() || null,
      office_address: form.officeAddress.trim() || null,
    });

    if (saveError) {
      setError(saveError.message);
    } else {
      setSuccess("Support settings updated successfully.");
    }

    setSaving(false);
  };

  return (
    <section className="tele-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#15366A]">Support Settings</h2>
          <p className="mt-1 text-sm hover:text-[#11418D]">
            Configure customer care details shown across the public website.
          </p>
        </div>
        {loading && (
          <span className="rounded-full bg-[#F4F7FC] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#5C6F89]">
            Loading...
          </span>
        )}
      </div>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#475569]">Phone Number</span>
          <input
            value={form.phone}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, phone: event.target.value }))
            }
            className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#475569]">Email Address</span>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, email: event.target.value }))
            }
            className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#475569]">WhatsApp Number</span>
          <input
            value={form.whatsapp}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, whatsapp: event.target.value }))
            }
            className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#475569]">Support Timings</span>
          <input
            value={form.supportTimings}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                supportTimings: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[#475569]">Office Address</span>
          <textarea
            rows={3}
            value={form.officeAddress}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                officeAddress: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-sm outline-none focus:border-[#11418D]"
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600">{success}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center justify-center rounded-xl bg-[#11418D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0e3675] hover:shadow-lg hover:shadow-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Support Settings"}
          </button>
        </div>
      </form>
    </section>
  );
}
