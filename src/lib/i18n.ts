import "server-only";
import type { Locale } from "@/lib/i18n-config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  zh: () => import("@/messages/zh.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
