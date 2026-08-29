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
          className="group flex shrink-0 items-center gap-3"
          aria-label={brandName}
        >
          {/* gauge-style mark: gradient dial arc, ticks and a needle that
              swings slightly on hover */}
          <svg
            width="46"
            height="46"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <defs>
              <linearGradient
                id="jf-dial"
                x1="7"
                y1="31"
                x2="41"
                y2="31"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#002565" />
                <stop offset="1" stopColor="#00cfff" />
              </linearGradient>
            </defs>
            <path
              d="M7.1 30.2A18 18 0 1 1 40.9 30.2"
              stroke="url(#jf-dial)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line x1="14.8" y1="14.8" x2="13.4" y2="13.4" stroke="#3480cf" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="24" y1="11" x2="24" y2="9" stroke="#3480cf" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="33.2" y1="14.8" x2="34.6" y2="13.4" stroke="#3480cf" strokeWidth="1.5" strokeLinecap="round" />
            <g
              style={{ transformOrigin: "24px 24px" }}
              className="transition-transform duration-500 ease-out group-hover:rotate-[28deg]"
            >
              <line
                x1="24"
                y1="24"
                x2="31.5"
                y2="11"
                stroke="#002565"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <circle cx="24" cy="24" r="3" fill="#002565" />
            <circle cx="24" cy="24" r="1.1" fill="#ffffff" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-[1.5rem] font-bold tracking-[0.12em] text-brand">
              JINFENG
            </span>
            <span className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ink-soft">
              {brandName}
            </span>
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
                className={`nav-link relative inline-flex items-center gap-1 py-1 text-[15px] font-bold transition-colors ${
                  isActive(item.path)
                    ? "is-active text-link"
                    : "text-brand hover:text-link"
                }`}
              >
                {item.label}
                <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            ))}
            <Link
              href={localizePath(locale, "/contact")}
              className={`nav-link relative inline-flex items-center gap-1 py-1 text-[15px] font-bold transition-colors ${
                isActive("/contact")
                  ? "is-active text-link"
                  : "text-brand hover:text-link"
              }`}
            >
              {nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={localizePath(locale, "/pricing")}
              className="inline-flex h-10 items-center rounded-full border border-brand px-5 text-sm font-bold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-[0_0.3rem_0.8rem_rgba(0,37,101,0.18)]"
            >
              {quoteLabel}
            </Link>
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_0.3rem_0.8rem_rgba(0,37,101,0.35)]"
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
