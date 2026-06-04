interface AdminStatsCardProps {
  label: string;
  value: string;
  subtitle?: string;
  loading?: boolean;
}

export default function AdminStatsCard({
  label,
  value,
  subtitle,
  loading = false,
}: AdminStatsCardProps) {
  if (loading) {
    return (
      <article className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="mt-3 h-9 w-16 rounded bg-slate-200" />
        <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium hover:text-[#134799]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      {subtitle && (
        <p className="mt-2 text-xs font-medium text-[#134799]">{subtitle}</p>
      )}
    </article>
  );
}
