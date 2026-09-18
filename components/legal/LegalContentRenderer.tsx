import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalContentRendererProps {
  content: string;
}

export default function LegalContentRenderer({ content }: LegalContentRendererProps) {
  return (
    <article className="space-y-6 text-[#475569]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-[#15366A]" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-[#15366A]" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="mt-6 text-xl font-extrabold tracking-tight text-[#15366A]" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mt-4 leading-8 text-[#475569]" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="mt-4 list-disc space-y-2 pl-6" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-6" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-7 text-[#475569]" {...props}>
              {children}
            </li>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-[#15366A]" {...props}>
              {children}
            </strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
