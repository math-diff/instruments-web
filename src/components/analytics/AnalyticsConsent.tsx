"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { analyticsPath, analyticsProduct, analyticsReferrer, validMeasurementId } from "@/lib/analytics";

type Consent = "accepted" | "rejected" | null;
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag }
}
const storageKey = "jf-analytics-consent-v1";
const changeEvent = "jf-analytics-consent";
let memoryConsent: Consent = null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "accepted" || value === "rejected" ? value : memoryConsent;
  } catch { return memoryConsent; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}
function saveConsent(value: Exclude<Consent, null>) {
  memoryConsent = value;
  try { localStorage.setItem(storageKey, value); } catch { /* Session-only preference if storage is blocked. */ }
  window.dispatchEvent(new Event(changeEvent));
}
function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0]).filter((name) => /^_ga(?:_|$)/.test(name));
  const labels = window.location.hostname.split(".");
  const domains = ["", ...labels.map((_, i) => labels.slice(i).join(".")).filter((domain) => domain.includes("."))];
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
  }
}

export function AnalyticsConsent({ locale, productSlugs }: { locale: Locale; productSlugs: string[] }) {
  const measurementId = validMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  return measurementId ? <ConfiguredAnalytics locale={locale} productSlugs={productSlugs} measurementId={measurementId} /> : null;
}

function ConfiguredAnalytics({ locale, productSlugs, measurementId }: { locale: Locale; productSlugs: string[]; measurementId: string }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const pathname = usePathname();
  const zh = locale === "zh";
  const slugKey = JSON.stringify([...new Set(productSlugs)].sort());
  const knownProducts = useMemo<readonly string[]>(() => JSON.parse(slugKey), [slugKey]);

  useEffect(() => () => {
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  }, [measurementId]);

  useEffect(() => {
    const controls = window as unknown as Record<string, unknown>;
    const disableKey = `ga-disable-${measurementId}`;
    controls[disableKey] = consent !== "accepted";
    if (consent !== "accepted") {
      if (consent === "rejected") {
        window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        clearAnalyticsCookies();
      }
      return;
    }
    const initialLoad = !window.gtag;
    window.dataLayer ??= [];
    if (!window.gtag) {
      // Google tag's documented command queue consumes Arguments objects.
      // eslint-disable-next-line prefer-rest-params
      window.gtag = function () { window.dataLayer?.push(arguments); };
    }
    window.gtag("consent", initialLoad ? "default" : "update", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    if (initialLoad) window.gtag("js", new Date());
    const referrer = analyticsReferrer(document.referrer);
    window.gtag("config", measurementId, {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      ignore_referrer: !referrer, page_referrer: referrer, page_location: window.location.origin,
      page_title: "Jingfeng Instruments",
    });
    const scriptId = `jf-google-tag-${measurementId}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.referrerPolicy = "no-referrer";
      document.head.appendChild(script);
    }

    function track(event: string, product?: string) {
      if (readConsent() !== "accepted") return;
      const path = analyticsPath(window.location.pathname, knownProducts);
      if (!path) return;
      window.gtag?.("event", event, {
        send_to: measurementId, page_path: path, page_location: `${window.location.origin}${path}`,
        page_title: path, page_referrer: referrer, ignore_referrer: !referrer,
        ...(product ? { product_slug: product } : {}),
      });
    }
    function click(event: MouseEvent) {
      const element = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!element) return;
      if (element.getAttribute("data-track") === "quote_click") {
        track("quote_click", analyticsProduct(element.getAttribute("data-product"), knownProducts));
      }
      if (!(element instanceof HTMLAnchorElement)) return;
      if (element.protocol === "mailto:") track("email_click");
      else if (element.origin === window.location.origin && element.pathname.startsWith("/downloads/")) track("download_click");
    }
    function submit(event: Event) {
      if (event.target instanceof HTMLFormElement && event.target.matches("form[data-inquiry-form]")) {
        track("form_submit_attempt", analyticsProduct(event.target.getAttribute("data-product"), knownProducts));
      }
    }
    document.addEventListener("click", click);
    document.addEventListener("submit", submit);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("submit", submit);
    };
  }, [consent, measurementId, knownProducts]);

  useEffect(() => {
    if (consent !== "accepted") return;
    const path = analyticsPath(pathname, knownProducts);
    const referrer = analyticsReferrer(document.referrer);
    if (path) window.gtag?.("event", "page_view", {
      send_to: measurementId, page_path: path, page_location: `${window.location.origin}${path}`,
      page_title: path, page_referrer: referrer, ignore_referrer: !referrer,
    });
  }, [consent, pathname, measurementId, knownProducts]);

  const choose = (value: Exclude<Consent, null>) => { saveConsent(value); setPreferencesOpen(false); };
  if (consent && !preferencesOpen) return <button type="button" onClick={() => setPreferencesOpen(true)} className="fixed bottom-3 left-3 z-50 rounded-full border border-line bg-white px-3 py-2 text-xs text-brand shadow-sm">{zh ? "隐私偏好" : "Privacy preferences"}</button>;
  return (
    <section aria-label={zh ? "访问统计偏好" : "Analytics preferences"} className="fixed bottom-4 left-4 right-4 z-50 max-w-lg rounded-2xl border border-line bg-white p-5 text-ink shadow-xl">
      <h2 className="font-bold text-brand">{zh ? "是否允许访问统计？" : "Allow optional analytics?"}</h2>
      <p className="mt-2 text-sm leading-6">{zh ? "经你同意，我们使用 Google Analytics 统计页面访问、询价点击和提交尝试。我们不向统计服务发送表单内容或网址查询参数。拒绝不会影响询价。" : "With your permission, Google Analytics measures page visits, enquiry clicks and submission attempts. We do not send form contents or URL query parameters to analytics. You can enquire without accepting."}</p>
      <Link href={`/${zh ? "zh" : "en"}/privacy`} className="mt-2 inline-block text-sm text-link underline">{zh ? "了解隐私说明" : "Read our privacy notice"}</Link>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("rejected")} className="rounded-full border border-brand px-5 py-2 text-sm font-bold text-brand">{zh ? "拒绝统计" : "Reject analytics"}</button>
        <button type="button" onClick={() => choose("accepted")} className="rounded-full border border-brand px-5 py-2 text-sm font-bold text-brand">{zh ? "允许统计" : "Allow analytics"}</button>
      </div>
    </section>
  );
}
