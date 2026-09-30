import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n-config";
import { hasOwnContent, listContent } from "@/lib/content";

export const SITE_URL = "https://jf-international.vercel.app";

/** Explicit language prefixes avoid Accept-Language redirects in search results. */
export function pageUrl(locale: Locale, path = "") {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export function pageAlternates(
  locale: Locale,
  path = "",
  availableLocales: readonly Locale[] = locales,
): NonNullable<Metadata["alternates"]> {
  const canonicalLocale = availableLocales.includes(locale) ? locale : defaultLocale;
  return {
    canonical: pageUrl(canonicalLocale, path),
    languages: Object.fromEntries([
      ...availableLocales.map((language) => [language, pageUrl(language, path)]),
      ["x-default", pageUrl(defaultLocale, path)],
    ]),
  };
}

export function contentLocales(kind: "blog" | "docs", slug?: string): Locale[] {
  return locales.filter(
    (locale) => hasOwnContent(kind, locale) &&
      (!slug || listContent(kind, locale).some((item) => item.slug === slug)),
  );
}

export function contentAlternates(kind: "blog" | "docs", locale: Locale, slug?: string) {
  return pageAlternates(locale, `/${kind}${slug ? `/${slug}` : ""}`, contentLocales(kind, slug));
}
