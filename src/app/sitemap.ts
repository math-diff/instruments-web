import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n-config";
import { products } from "@/lib/products";
import { listContent } from "@/lib/content";

const BASE = "https://jf-international.vercel.app";

function url(locale: string, path: string) {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE}${prefix}${path === "" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/about", "/contact", "/blog", "/docs"];
  const productPaths = products.map((p) => `/products/${p.slug}`);

  const entries: MetadataRoute.Sitemap = [];

  for (const path of [...staticPaths, ...productPaths]) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = url(l, path);
    entries.push({
      url: url(defaultLocale, path),
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.7,
      alternates: { languages },
    });
  }

  for (const l of locales) {
    for (const post of listContent("blog", l)) {
      entries.push({
        url: url(l, `/blog/${post.slug}`),
        lastModified: new Date(post.date || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const doc of listContent("docs", l)) {
      entries.push({
        url: url(l, `/docs/${doc.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
