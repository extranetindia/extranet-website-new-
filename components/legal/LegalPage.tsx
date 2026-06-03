import type { ReactNode } from "react";

function formatLastUpdated(value: string) {
  if (!value || value === "TBD") {
    return value;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface LegalPageProps {
  title: string;
  summary: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPage({
  title,
  summary,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="mx-auto w-full max-w-[900px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
              Legal
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {summary}
            </p>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Last Updated: {formatLastUpdated(lastUpdated)}
            </p>
          </header>

          <div className="space-y-10 text-slate-700">{children}</div>
        </article>
      </div>
    </main>
  );
}
