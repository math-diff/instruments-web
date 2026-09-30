export const LEGACY_SITE_URL = "https://jf-international.vercel.app";

/** One origin for metadata, structured data, robots and inquiry redirects. */
export function siteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const url = new URL(value?.trim() || LEGACY_SITE_URL);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path or credentials");
  }
  return url.origin;
}

export const SITE_URL = siteOrigin();

export function migrationHosts(value = process.env.SITE_REDIRECT_HOSTS) {
  const canonicalHost = new URL(SITE_URL).hostname;
  const candidates = [new URL(LEGACY_SITE_URL).hostname, ...(value || "").split(",")];
  return [...new Set(candidates.map((host) => host.trim().toLowerCase()).filter(Boolean))]
    .filter((host) => host !== canonicalHost && host.length <= 253 && host.includes(".") &&
      host.split(".").every((label) => label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)));
}
