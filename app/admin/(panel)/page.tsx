"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import {
  fetchDashboardData,
  formatLeadDate,
  formatLeadStatus,
  type DashboardData,
} from "@/lib/database/dashboard";
import { quickActions } from "@/lib/admin/mock-data";

function StatsSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <AdminStatsCard key={item} label="" value="" loading />
      ))}
    </>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-10 rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}

function StatusSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[0, 1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-6 w-8 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

const statusBadgeClass: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-100 text-slate-600",
  spam: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setError(null);
    const result = await fetchDashboardData();

    if (result.error || !result.data) {
      setError(
        result.error?.message ??
          "Unable to load dashboard data. Please refresh the page.",
      );
      setData(null);
      return;
    }

    setData(result.data);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadDashboard();
      setLoading(false);
    };
    void load();
  }, [loadDashboard]);

  const counts = data?.counts;

  const statCards = counts
    ? [
        {
          label: "Total Leads",
          value: String(counts.totalLeads),
          subtitle: "All contact submissions",
        },
        {
          label: "New Leads",
          value: String(counts.newLeads),
          subtitle: "Awaiting follow-up",
        },
        {
          label: "Total Plans",
          value: String(counts.totalPlans),
          subtitle: "Published broadband plans",
        },
        {
          label: "Total Cities",
          value: String(counts.totalCities),
          subtitle: "Service areas",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="mt-2 font-semibold text-red-800 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <StatsSkeleton />
        ) : (
          statCards.map((metric) => (
            <AdminStatsCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
            />
          ))
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Recent Leads</h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest contact form submissions.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-sm font-semibold text-blue-700 hover:text-[#134799]"
            >
              View all →
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Phone</th>
                  <th className="px-3 py-2 font-medium">Inquiry Type</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Created At</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-4">
                      <TableSkeleton />
                    </td>
                  </tr>
                ) : !data?.recentLeads.length ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-slate-500"
                    >
                      No leads yet. Submissions from the contact page will appear
                      here.
                    </td>
                  </tr>
                ) : (
                  data.recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-100">
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {lead.full_name}
                      </td>
                      <td className="px-3 py-3 text-slate-700">{lead.phone}</td>
                      <td className="max-w-[160px] truncate px-3 py-3 text-slate-700">
                        {lead.inquiry_type}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusBadgeClass[lead.status] ??
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatLeadStatus(lead.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                        {formatLeadDate(lead.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Lead Status Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Breakdown of all leads by status.
            </p>

            <ul className="mt-5 space-y-3">
              {loading ? (
                <StatusSkeleton />
              ) : (
                data?.statusSummary.map((item) => (
                  <li
                    key={item.status}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      {item.count}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
            <ul className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <li key={action}>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-[#134799]/20 hover:bg-text-[#134799] hover:text-blue-700"
                  >
                    {action}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
