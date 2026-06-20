import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n-config";

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function dirFor(kind: "blog" | "docs", locale: Locale) {
  return path.join(CONTENT_ROOT, kind, locale);
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function listContent(
  kind: "blog" | "docs",
  locale: Locale,
): ContentMeta[] {
  const dir = dirFor(kind, locale);
  return readDir(dir)
    .map((slug) => {
      const file = path.join(dir, `${slug}.mdx`);
      const { data } = matter(fs.readFileSync(file, "utf8"));
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        category: data.category ? String(data.category) : undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getContent(kind: "blog" | "docs", locale: Locale, slug: string) {
  const dir = dirFor(kind, locale);
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    meta: {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      category: data.category ? String(data.category) : undefined,
    },
    content,
  };
}

export type DocTreeNode = {
  slug: string;
  title: string;
  children: DocTreeNode[];
};

export function docTree(locale: Locale): DocTreeNode[] {
  const items = listContent("docs", locale);
  const root: DocTreeNode[] = [];
  for (const item of items) {
    const parts = item.slug.split("/");
    let level = root;
    let prefix = "";
    for (let i = 0; i < parts.length; i++) {
      prefix = prefix ? `${prefix}/${parts[i]}` : parts[i];
      let node = level.find((n) => n.slug === prefix);
      if (!node) {
        const meta = items.find((m) => m.slug === prefix);
        node = {
          slug: prefix,
          title: meta?.title ?? parts[i].replace(/-/g, " "),
          children: [],
        };
        level.push(node);
      }
      level = node.children;
    }
  }
  return root;
}
