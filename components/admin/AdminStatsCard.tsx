interface AdminStatsCardProps {
  label: string;
  value: string;
  delta: string;
}

export default function AdminStatsCard({
  label,
  value,
  delta,
}: AdminStatsCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-xs font-medium text-blue-700">{delta}</p>
    </article>
  );
}
