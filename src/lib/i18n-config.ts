export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export function localizePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized === "/" ? "/" : normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
