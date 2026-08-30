import type { Locale } from "@/lib/i18n-config";

const tagFor: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en-GB",
  ar: "ar",
  fr: "fr-FR",
  de: "de-DE",
  hi: "hi-IN",
  it: "it-IT",
  sk: "sk-SK",
  ms: "ms-MY",
  ru: "ru-RU",
  sv: "sv-SE",
  tr: "tr-TR",
};

/** localized human date, e.g. 18 sept. 2024 */
export function formatDate(date: string, locale: Locale): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  try {
    return new Intl.DateTimeFormat(tagFor[locale], {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return date;
  }
}
