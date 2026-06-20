import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-4xl font-bold tracking-tight text-ink">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-3xl font-semibold tracking-tight text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-2xl font-semibold text-ink">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-base leading-7 text-ink-soft">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-brand link-underline hover:text-brand-strong"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc space-y-1 pl-6 text-ink-soft">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal space-y-1 pl-6 text-ink-soft">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-brand-strong">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-surface-muted p-4 text-sm">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-line bg-surface-muted px-3 py-2 text-left font-semibold text-ink">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-line px-3 py-2 text-ink-soft">{children}</td>
    ),
  };
}
