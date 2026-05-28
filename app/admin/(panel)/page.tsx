import AdminStatsCard from "@/components/admin/AdminStatsCard";
import {
  dashboardMetrics,
  quickActions,
  recentActivities,
} from "@/lib/admin/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardMetrics.map((metric) => (
          <AdminStatsCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">
            Analytics Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Placeholder chart for ISP engagement and plan conversion trends.
          </p>
          <div className="mt-5 h-72 rounded-xl border border-slate-200 bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="flex h-full items-end gap-2">
              {[32, 48, 44, 66, 58, 74, 62, 78, 84, 71, 89, 96].map((item) => (
                <div key={item} className="flex-1 rounded-t bg-blue-600/80" style={{ height: `${item}%` }} />
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
          <ul className="mt-4 space-y-2">
            {quickActions.map((action) => (
              <li key={action}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {action}
                </button>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
        <ul className="mt-4 divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-start justify-between gap-3 py-3">
              <p className="text-sm text-slate-700">{activity.message}</p>
              <span className="shrink-0 text-xs font-medium text-slate-400">
                {activity.time}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
