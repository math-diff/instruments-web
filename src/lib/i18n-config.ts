export const locales = [
  "en",
  "ar",
  "fr",
  "de",
  "hi",
  "it",
  "sk",
  "ms",
  "ru",
  "sv",
  "tr",
  "zh",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type LocaleMeta = {
  /** native language name shown in the switcher */
  native: string;
  /** short uppercase code for compact displays */
  short: string;
  dir: "ltr" | "rtl";
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  zh: { native: "中文", short: "ZH", dir: "ltr" },
  en: { native: "English", short: "EN", dir: "ltr" },
  ar: { native: "العربية", short: "AR", dir: "rtl" },
  fr: { native: "Français", short: "FR", dir: "ltr" },
  de: { native: "Deutsch", short: "DE", dir: "ltr" },
  hi: { native: "हिन्दी", short: "HI", dir: "ltr" },
  it: { native: "Italiano", short: "IT", dir: "ltr" },
  sk: { native: "Slovenčina", short: "SK", dir: "ltr" },
  ms: { native: "Bahasa Melayu", short: "MS", dir: "ltr" },
  ru: { native: "Русский", short: "RU", dir: "ltr" },
  sv: { native: "Svenska", short: "SV", dir: "ltr" },
  tr: { native: "Türkçe", short: "TR", dir: "ltr" },
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export function localizePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized === "/" ? "/" : normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
