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
    <main className="bg-[#F8F9FB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="tele-card mx-auto w-full max-w-[900px] p-5 sm:p-8 md:p-10">
          <header className="mb-10">
            <p className="tele-eyebrow flex items-center gap-2 text-[#C1170C]">
              <span aria-hidden className="inline-block h-[2px] w-7 rounded-full bg-[#C1170C]" />
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#15366A] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#5C6F89]">
              {summary}
            </p>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5C6F89]">
              Last Updated: {formatLastUpdated(lastUpdated)}
            </p>
          </header>

          <div className="space-y-10 text-[#475569]">{children}</div>
        </article>
      </div>
    </main>
  );
}
