"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { defaultLocale, locales, type Locale } from "@/lib/i18n-config";

export function LangSwitch({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";

  function switchTo(target: Locale) {
    if (target === current) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    const next = "/" + segments.join("/");
    window.location.assign(next === "/" ? `/${target}` : next);
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
      <Globe className="ml-1.5 mr-1 h-4 w-4 text-ink-soft" strokeWidth={1.5} />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            l === current
              ? "bg-brand text-white"
              : "text-ink-soft hover:text-brand"
          }`}
          aria-pressed={l === current}
        >
          {l === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}

export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

export function FooterLangLink({ current }: { current: Locale }) {
  const other: Locale = current === "en" ? "zh" : "en";
  return (
    <Link
      href={`/${other}`}
      className="text-ink-soft transition-colors hover:text-brand"
    >
      {other === "en" ? "English" : "中文"}
    </Link>
  );
}
