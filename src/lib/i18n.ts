import "server-only";
import type { Locale } from "@/lib/i18n-config";

type DictionaryShape = Record<string, unknown>;

/** canonical dictionary shape, derived from the English message file */
export type Dictionary = typeof import("@/messages/en.json");

const loaders: Record<Locale, () => Promise<DictionaryShape>> = {
  zh: () => import("@/messages/zh.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
  ar: () => import("@/messages/ar.json").then((m) => m.default),
  fr: () => import("@/messages/fr.json").then((m) => m.default),
  de: () => import("@/messages/de.json").then((m) => m.default),
  hi: () => import("@/messages/hi.json").then((m) => m.default),
  it: () => import("@/messages/it.json").then((m) => m.default),
  sk: () => import("@/messages/sk.json").then((m) => m.default),
  ms: () => import("@/messages/ms.json").then((m) => m.default),
  ru: () => import("@/messages/ru.json").then((m) => m.default),
  sv: () => import("@/messages/sv.json").then((m) => m.default),
  tr: () => import("@/messages/tr.json").then((m) => m.default),
};

/** merge `override` over `base`; arrays and scalars replace, objects recurse */
function deepMerge(
  base: DictionaryShape,
  override: DictionaryShape,
): DictionaryShape {
  const out: DictionaryShape = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const prev = out[key];
    if (
      value && typeof value === "object" && !Array.isArray(value) &&
      prev && typeof prev === "object" && !Array.isArray(prev)
    ) {
      out[key] = deepMerge(prev as DictionaryShape, value as DictionaryShape);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") return loaders.en() as Promise<Dictionary>;
  // missing keys fall back to English; complete translations simply override
  const [base, override] = await Promise.all([loaders.en(), loaders[locale]()]);
  return deepMerge(base, override) as Dictionary;
}
