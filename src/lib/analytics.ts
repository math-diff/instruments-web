import { categoryTopics, isLocale } from "./i18n-config";

const topicPages = new Set(Object.values(categoryTopics).map((path) => path.slice(1)));
const staticPages = new Set(["", "products", ...topicPages, "about", "contact", "blog", "docs", "privacy"]);
const articles = new Set([
  "blog/selecting-pressure-gauge", "blog/local-vs-remote-temperature",
  "blog/level-gauge-selection", "blog/hazardous-area-certifications",
  "docs/installing-rtd-thermocouple", "docs/installing-magnetic-level-gauge",
  "docs/installing-bimetal-thermometer", "docs/getting-started", "docs/faq",
]);

/** Exact public routes only. Never forward query strings or unknown/user-supplied paths. */
export function analyticsPath(path: string, productSlugs: readonly string[]): string | null {
  if (!path.startsWith("/") || /[?#%\\]/.test(path)) return null;
  const parts = path.replace(/\/$/, "").split("/").slice(1);
  const locale = parts.shift();
  if (!locale || !isLocale(locale)) return null;
  const rest = parts.join("/");
  if (topicPages.has(rest) && locale !== "en") return null;
  if (staticPages.has(rest) || articles.has(rest) ||
    (parts.length === 2 && parts[0] === "products" && productSlugs.includes(parts[1]))) {
    return `/${locale}${rest ? `/${rest}` : ""}`;
  }
  return null;
}

export function analyticsProduct(value: string | null | undefined, productSlugs: readonly string[]): string | undefined {
  return value && productSlugs.includes(value) ? value : undefined;
}

export function validMeasurementId(value: string | undefined): string | null {
  return value && /^G-[A-Z0-9]+$/.test(value) ? value : null;
}

const searchHosts = new Set([
  "google.com", "google.ae", "google.com.sa", "google.com.my",
  "google.com.sg", "google.co.th", "google.co.id", "bing.com",
].flatMap((host) => [host, `www.${host}`]));

/** Retain acquisition origin only; referring paths and search queries never leave the browser. */
export function analyticsReferrer(value: string): string {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port || !searchHosts.has(url.hostname)) return "";
    return `https://${url.hostname}`;
  } catch { return ""; }
}
