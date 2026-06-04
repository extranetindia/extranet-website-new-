"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { LegalPageRow } from "@/lib/database/schema";
import { fetchLegalPages, saveLegalPage } from "@/lib/database/legal-pages";

const PAGE_LABELS: Record<string, string> = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  refund: "Refund Policy",
  "acceptable-use": "Acceptable Use Policy",
  cancellation: "Cancellation Policy",
};

export default function AdminLegalPage() {
  const [pages, setPages] = useState<LegalPageRow[]>([]);
  const [activeSlug, setActiveSlug] = useState("terms");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    content: "",
    last_updated: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await fetchLegalPages();
    if (result.error || !result.data) {
      setError(result.error?.message ?? "Unable to load legal pages.");
      setPages([]);
      setLoading(false);
      return;
    }

    setPages(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadPages();
  }, [loadPages]);

  useEffect(() => {
    const page = pages.find((item) => item.slug === activeSlug);
    if (page) {
      setForm({
        slug: page.slug,
        title: page.title,
        content: page.content,
        last_updated: page.last_updated,
      });
      setError(null);
      setSuccess(null);
    }
  }, [activeSlug, pages]);

  const activePage = useMemo(
    () => pages.find((item) => item.slug === activeSlug) ?? null,
    [activeSlug, pages],
  );

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      slug: form.slug,
      title: form.title.trim(),
      content: form.content.trim(),
      last_updated: new Date().toISOString(),
    };

    const result = await saveLegalPage(payload);
    if (result.error || !result.data) {
      setError(result.error?.message ?? "Unable to save legal page.");
      setSaving(false);
      return;
    }

    setSuccess("Legal policy saved successfully.");
    setForm((current) => ({ ...current, last_updated: result.data?.last_updated ?? current.last_updated }));
    await loadPages();
    setSaving(false);
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Legal Policies</h1>
            <p className="mt-1 text-sm text-slate-500">
              Edit your published Terms, Privacy, Refund, Acceptable Use, and Cancellation content from one place.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Policy Pages
            </h2>
            <div className="mt-4 space-y-2">
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-10 rounded-xl bg-slate-200" />
                  ))}
                </div>
              ) : (
                pages.map((page) => {
                  const active = page.slug === activeSlug;
                  return (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => setActiveSlug(page.slug)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        active
                          ? "bg-[#134799] text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {PAGE_LABELS[page.slug] ?? page.title}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Edit policy</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the page title and content for the selected legal policy.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {activePage?.slug ?? "Loading..."}
              </span>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSave}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Page Slug</span>
                  <input
                    value={form.slug}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Last Updated</span>
                  <input
                    value={new Date(form.last_updated).toLocaleString()}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Page Title</span>
                <input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="block text-sm font-medium text-slate-700">Page Content</span>
                  <span className="text-xs text-slate-500">Use headings, paragraphs, and lists.</span>
                </div>
                <textarea
                  rows={18}
                  value={form.content}
                  onChange={(event) => updateField("content", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-sm text-slate-900 outline-none focus:border-blue-400"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {success && <p className="text-sm text-emerald-700">{success}</p>}
                </div>
                <button
                  type="submit"
                  disabled={saving || loading}
                  className="inline-flex items-center justify-center rounded-xl bg-[#134799] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#134799] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Policy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
