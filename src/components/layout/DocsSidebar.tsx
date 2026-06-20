import Link from "next/link";
import type { DocTreeNode } from "@/lib/content";
import { localizePath } from "@/lib/i18n-config";
import type { Locale } from "@/lib/i18n-config";

export function DocsSidebar({
  tree,
  locale,
  activeSlug,
}: {
  tree: DocTreeNode[];
  locale: Locale;
  activeSlug: string;
}) {
  return (
    <nav className="space-y-1">
      {tree.map((node) => (
        <NodeLink
          key={node.slug}
          node={node}
          locale={locale}
          activeSlug={activeSlug}
          depth={0}
        />
      ))}
    </nav>
  );
}

function NodeLink({
  node,
  locale,
  activeSlug,
  depth,
}: {
  node: DocTreeNode;
  locale: Locale;
  activeSlug: string;
  depth: number;
}) {
  const href = localizePath(locale, `/docs/${node.slug}`);
  const isActive = node.slug === activeSlug;
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <Link
        href={href}
        className={`block rounded-md py-2 text-sm transition-colors ${
          isActive
            ? "bg-brand-soft font-medium text-brand"
            : "text-ink-soft hover:bg-surface-muted hover:text-ink"
        } ${depth > 0 ? "pl-4" : ""}`}
      >
        {node.title}
      </Link>
      {hasChildren && (
        <div className="ml-3 border-l border-line pl-2">
          {node.children.map((child) => (
            <NodeLink
              key={child.slug}
              node={child}
              locale={locale}
              activeSlug={activeSlug}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
