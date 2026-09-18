"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Boxes, Image as ImageIcon, MapPin, Inbox, ArrowRight } from "lucide-react";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import {
  fetchDashboardData,
  formatLeadDate,
  formatLeadStatus,
  type DashboardData,
} from "@/lib/database/dashboard";

const quickActions = [
  { label: "Manage Plans", description: "Add, edit & price broadband plans", href: "/admin/plans", icon: Boxes },
  { label: "Edit Hero Banner", description: "Swap the homepage artwork", href: "/admin/hero", icon: ImageIcon },
  { label: "Manage Coverage", description: "Add sectors & service areas", href: "/admin/coverage", icon: MapPin },
  { label: "Review Leads", description: "Follow up on new enquiries", href: "/admin/leads", icon: Inbox },
];

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
        <div key={index} className="h-10 rounded-lg bg-[#F4F7FC]" />
      ))}
    </div>
  );
}

function StatusSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[0, 1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-[#DCE3EC]" />
          <div className="h-6 w-8 rounded bg-[#F4F7FC]" />
        </div>
      ))}
    </div>
  );
}

const statusBadgeClass: Record<string, string> = {
  new: "bg-[#11418D]/10 text-[#11418D]",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-emerald-100 text-emerald-800",
  closed: "bg-[#F4F7FC] text-[#5C6F89]",
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
        <article className="tele-card p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-[#15366A]">Recent Leads</h2>
              <p className="mt-1 text-sm hover:text-[#11418D]">
                Latest contact form submissions.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-sm font-semibold text-[#11418D] transition-all duration-200 ease-in-out hover:text-[#0e3675]"
            >
              View all →
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#DCE3EC] hover:text-[#11418D]">
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
                      className="px-3 py-8 text-center hover:text-[#11418D]"
                    >
                      No leads yet. Submissions from the contact page will appear
                      here.
                    </td>
                  </tr>
                ) : (
                  data.recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[#EDF1F6]">
                      <td className="px-3 py-3 font-medium text-[#15366A]">
                        {lead.full_name}
                      </td>
                      <td className="px-3 py-3 text-[#475569]">{lead.phone}</td>
                      <td className="max-w-[160px] truncate px-3 py-3 text-[#475569]">
                        {lead.inquiry_type}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusBadgeClass[lead.status] ??
                            "bg-[#F4F7FC] text-[#5C6F89]"
                          }`}
                        >
                          {formatLeadStatus(lead.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[#5C6F89]">
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
          <article className="tele-card p-5">
            <h2 className="text-base font-semibold text-[#15366A]">
              Lead Status Summary
            </h2>
            <p className="mt-1 text-sm hover:text-[#11418D]">
              Breakdown of all leads by status.
            </p>

            <ul className="mt-5 space-y-3">
              {loading ? (
                <StatusSkeleton />
              ) : (
                data?.statusSummary.map((item) => (
                  <li
                    key={item.status}
                    className="flex items-center justify-between rounded-xl border border-[#EDF1F6] bg-[#F8F9FB] px-3 py-2.5"
                  >
                    <span className="text-sm font-medium text-[#475569]">
                      {item.label}
                    </span>
                    <span className="text-lg font-bold text-[#15366A]">
                      {item.count}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </article>

          <article className="tele-card p-5">
            <h2 className="text-base font-semibold text-[#15366A]">Quick Actions</h2>
            <ul className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <li key={action.href}>
                  <Link
                    href={action.href}
                    className="group flex items-center gap-3 rounded-xl border border-[#DCE3EC] bg-[#F8F9FB] px-3 py-2.5 transition-all duration-200 ease-in-out hover:border-[#11418D]/30 hover:bg-white hover:shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#11418D]/10 text-[#11418D]">
                      <action.icon size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#15366A] group-hover:text-[#11418D]">
                        {action.label}
                      </span>
                      <span className="block truncate text-xs text-[#5C6F89]">
                        {action.description}
                      </span>
                    </span>
                    <ArrowRight size={15} className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#11418D]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
