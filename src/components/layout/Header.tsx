"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { localizePath } from "@/lib/i18n-config";
import { LangSwitch } from "./LangSwitch";

type NavItem = { key: string; label: string; path: string };

export function Header({
  locale,
  nav,
  brandName,
  quoteLabel,
}: {
  locale: Locale;
  nav: { home: string; products: string; pricing: string; about: string; contact: string; blog: string; docs: string };
  brandName: string;
  quoteLabel: string;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const items: NavItem[] = [
    { key: "products", label: nav.products, path: "/products" },
    { key: "pricing", label: nav.pricing, path: "/pricing" },
    { key: "about", label: nav.about, path: "/about" },
    { key: "blog", label: nav.blog, path: "/blog" },
    { key: "docs", label: nav.docs, path: "/docs" },
    { key: "contact", label: nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => {
    const local = localizePath(locale, path);
    return pathname === local || pathname.startsWith(local + "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={localizePath(locale, "/")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
            D
          </span>
          <span>{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.key}
              href={localizePath(locale, item.path)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-brand"
                  : "text-ink-soft hover:text-brand"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch current={locale} />
          <Link
            href={localizePath(locale, "/contact")}
            className="inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            {quoteLabel}
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {items.map((item) => (
              <Link
                key={item.key}
                href={localizePath(locale, item.path)}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-base font-medium ${
                  isActive(item.path)
                    ? "bg-brand-soft text-brand"
                    : "text-ink hover:bg-surface-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between">
              <LangSwitch current={locale} />
              <Link
                href={localizePath(locale, "/contact")}
                onClick={() => setOpen(false)}
                className="inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-white"
              >
                {quoteLabel}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
