import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import { localizePath } from "@/lib/i18n-config";
import { categories } from "@/lib/products";
import { LangSwitch } from "./LangSwitch";
import type { Dictionary } from "@/lib/i18n";

// Brand-colored circular social icons, matching the site's footer style.
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/YuefengYangJF/",
    // Facebook brand: blue circle, white f
    bg: "#1877F2",
    glyph: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yuefeng-yang-33a6b0269/",
    // LinkedIn brand: blue circle, white "in"
    bg: "#0A66C2",
    glyph: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/yangyuefeng_JF",
    // X brand: black circle, white glyph
    bg: "#000000",
    glyph: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const productLinks = categories.map((c) => ({
    label: dict.categories[c].name,
    href: localizePath(locale, `/products?cat=${c}`),
  }));

  const companyLinks = [
    { label: dict.nav.about, href: localizePath(locale, "/about") },
    { label: dict.nav.contact, href: localizePath(locale, "/contact") },
  ];

  const resourceLinks = [
    { label: dict.nav.blog, href: localizePath(locale, "/blog") },
    { label: dict.nav.docs, href: localizePath(locale, "/docs") },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title={dict.footer.products} links={productLinks} />
          <FooterColumn title={dict.footer.company} links={companyLinks} />
          <FooterColumn title={dict.footer.resources} links={resourceLinks} />
          <div>
            <h4 className="mb-4 text-lg font-bold text-brand">
              {dict.nav.contact}
            </h4>
            <ul className="space-y-2.5 text-[15px] leading-6 text-ink">
              <li>{dict.brand.full}</li>
              <li>{dict.footer.address}</li>
              <li>
                <a
                  href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                  className="text-ink hover:text-link"
                >
                  {dict.footer.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dict.footer.email}`}
                  className="font-bold text-link hover:text-brand hover:underline underline-offset-4"
                >
                  {dict.footer.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-85"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {dict.brand.name}
          </p>
          <LangSwitch current={locale} />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-lg font-bold text-brand">{title}</h4>
      <ul className="space-y-2.5 text-[15px]">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="font-bold text-link transition-colors hover:text-brand hover:underline underline-offset-4"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
