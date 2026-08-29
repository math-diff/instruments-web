"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { localizePath } from "@/lib/i18n-config";
import { LangSwitch } from "./LangSwitch";

type NavItem = { key: string; label: string; path: string };

export function Header({
  locale,
  nav,
  brandName,
  quoteLabel,
  contactLabel,
  searchPlaceholder,
}: {
  locale: Locale;
  nav: { home: string; products: string; pricing: string; about: string; contact: string; blog: string; docs: string };
  brandName: string;
  quoteLabel: string;
  contactLabel: string;
  searchPlaceholder: string;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const items: NavItem[] = [
    { key: "products", label: nav.products, path: "/products" },
    { key: "pricing", label: nav.pricing, path: "/pricing" },
    { key: "about", label: nav.about, path: "/about" },
    { key: "blog", label: nav.blog, path: "/blog" },
    { key: "docs", label: nav.docs, path: "/docs" },
  ];

  const isActive = (path: string) => {
    const local = localizePath(locale, path);
    return pathname === local || pathname.startsWith(local + "/");
  };

  const searchForm = (
    <form
      action={localizePath(locale, "/products")}
      method="GET"
      className="relative w-full max-w-md"
      role="search"
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-soft" strokeWidth={2} />
      <input
        type="search"
        name="q"
        placeholder={searchPlaceholder}
        className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-[15px] text-ink placeholder:text-ink-soft shadow-[0_1px_4px_rgba(70,70,70,0.08)] outline-none transition-colors focus:border-link"
        aria-label={searchPlaceholder}
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-[0_2px_8px_rgba(70,70,70,0.06)]">
      {/* Top row: logo, search, meta links */}
      <div className="container-page flex h-[4.5rem] items-center gap-6">
        <Link
          href={localizePath(locale, "/")}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={brandName}
        >
          <span className="flex items-center rounded-[4px] border-[3px] border-brand px-2 py-[3px] text-xl font-bold leading-none tracking-tight text-brand">
            DEWE
          </span>
          <span className="hidden text-base font-bold text-brand sm:block">
            {brandName}
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">{searchForm}</div>

        <div className="ml-auto flex shrink-0 items-center gap-5">
          <Link
            href={localizePath(locale, "/blog")}
            className="hidden text-[15px] font-bold text-brand transition-colors hover:text-link lg:block"
          >
            {nav.blog}
          </Link>
          <LangSwitch current={locale} />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Bottom row: primary nav + actions */}
      <div className="hidden border-b border-line lg:block">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <nav className="flex items-center gap-7">
            {items.map((item) => (
              <Link
                key={item.key}
                href={localizePath(locale, item.path)}
                className={`inline-flex items-center gap-1 text-[15px] font-bold transition-colors ${
                  isActive(item.path)
                    ? "text-link"
                    : "text-brand hover:text-link"
                }`}
              >
                {item.label}
                <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            ))}
            <Link
              href={localizePath(locale, "/contact")}
              className={`inline-flex items-center gap-1 text-[15px] font-bold transition-colors ${
                isActive("/contact") ? "text-link" : "text-brand hover:text-link"
              }`}
            >
              {nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={localizePath(locale, "/pricing")}
              className="inline-flex h-10 items-center rounded-full border border-brand px-5 text-sm font-bold text-brand transition-colors hover:bg-brand-soft"
            >
              {quoteLabel}
            </Link>
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-brand-strong"
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {searchForm}
            <nav className="flex flex-col gap-1">
              {[...items, { key: "contact", label: nav.contact, path: "/contact" }].map(
                (item) => (
                  <Link
                    key={item.key}
                    href={localizePath(locale, item.path)}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-base font-bold ${
                      isActive(item.path)
                        ? "bg-brand-soft text-link"
                        : "text-brand hover:bg-surface-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link
                href={localizePath(locale, "/pricing")}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-base font-bold ${
                  isActive("/pricing")
                    ? "bg-brand-soft text-link"
                    : "text-brand hover:bg-surface-muted"
                }`}
              >
                {quoteLabel}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
