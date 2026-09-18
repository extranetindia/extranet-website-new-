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
      <article className="animate-pulse tele-card p-5">
        <div className="h-4 w-24 rounded bg-[#DCE3EC]" />
        <div className="mt-3 h-9 w-16 rounded bg-[#DCE3EC]" />
        <div className="mt-3 h-3 w-32 rounded bg-[#F4F7FC]" />
      </article>
    );
  }

  return (
    <article className="tele-card p-5">
      <p className="text-sm font-medium hover:text-[#11418D]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[#15366A]">{value}</p>
      {subtitle && (
        <p className="mt-2 text-xs font-medium text-[#11418D]">{subtitle}</p>
      )}
    </article>
  );
}
