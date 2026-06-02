interface LegalContentRendererProps {
  content: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }

    const escaped = escapeHtml(line);

    if (/^###\s+/.test(line)) {
      closeList();
      html.push(`<h3>${escapeHtml(line.replace(/^###\s+/, ""))}</h3>`);
      continue;
    }

    if (/^##\s+/.test(line)) {
      closeList();
      html.push(`<h2>${escapeHtml(line.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }

    if (/^#\s+/.test(line)) {
      closeList();
      html.push(`<h1>${escapeHtml(line.replace(/^#\s+/, ""))}</h1>`);
      continue;
    }

    if (/^([-*]|\d+\.)\s+/.test(line)) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${escapeHtml(line.replace(/^([-*]|\d+\.)\s+/, ""))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${escaped}</p>`);
  }

  closeList();
  return html.join("");
}

export default function LegalContentRenderer({ content }: LegalContentRendererProps) {
  return (
    <div
      className="space-y-8 text-slate-700"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
}
