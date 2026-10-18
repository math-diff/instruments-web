import type { MetadataRoute } from "next";
import { categoryTopics, locales } from "@/lib/i18n-config";
import { products } from "@/lib/products";
import { listContent } from "@/lib/content";
import { contentLocales, pageUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of Object.values(categoryTopics)) {
    entries.push({ url: pageUrl("en", path), changeFrequency: "monthly", priority: 0.9 });
  }
  for (const locale of ["en", "zh"] as const) {
    entries.push({ url: pageUrl(locale, "/privacy"), changeFrequency: "yearly", priority: 0.2 });
  }
  const staticPaths = ["", "/products", "/about", "/contact"];
  const productPaths = products.map((product) => `/products/${product.slug}`);

  for (const path of [...staticPaths, ...productPaths]) {
    const languages = Object.fromEntries(locales.map((locale) => [locale, pageUrl(locale, path)]));
    for (const locale of locales) {
      entries.push({
        url: pageUrl(locale, path),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.7,
        alternates: { languages },
      });
    }
  }

  for (const kind of ["blog", "docs"] as const) {
    const translatedLocales = contentLocales(kind);
    const languages = Object.fromEntries(translatedLocales.map((locale) => [locale, pageUrl(locale, `/${kind}`)]));
    for (const locale of translatedLocales) {
      entries.push({ url: pageUrl(locale, `/${kind}`), changeFrequency: "weekly", priority: 0.7, alternates: { languages } });
      for (const item of listContent(kind, locale)) {
        const path = `/${kind}/${item.slug}`;
        const published = item.updated || item.date ? new Date(item.updated || item.date) : undefined;
        entries.push({
          url: pageUrl(locale, path),
          ...(published && !Number.isNaN(published.getTime()) ? { lastModified: published } : {}),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(contentLocales(kind, item.slug).map((language) => [language, pageUrl(language, path)])),
          },
        });
      }
    }
  }

  return entries;
}
