import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { localizePath } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const productLinks = (["pressure", "flow", "temperature", "level"] as const).map(
    (c) => ({
      label: dict.categories[c].name,
      href: localizePath(locale, `/products?cat=${c}`),
    }),
  );

  const companyLinks = [
    { label: dict.nav.about, href: localizePath(locale, "/about") },
    { label: dict.nav.contact, href: localizePath(locale, "/contact") },
    { label: dict.nav.pricing, href: localizePath(locale, "/pricing") },
  ];

  const resourceLinks = [
    { label: dict.nav.blog, href: localizePath(locale, "/blog") },
    { label: dict.nav.docs, href: localizePath(locale, "/docs") },
  ];

  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-lg font-bold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
                D
              </span>
              {dict.brand.name}
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">
              {dict.brand.tagline}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.5} />
                <span>{dict.footer.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.5} />
                <a href={`mailto:${dict.footer.email}`} className="hover:text-brand">
                  {dict.footer.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.5} />
                <a href={`tel:${dict.footer.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {dict.footer.phone}
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn title={dict.footer.products} links={productLinks} />
          <FooterColumn title={dict.footer.company} links={companyLinks} />
          <FooterColumn title={dict.footer.resources} links={resourceLinks} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row">
          <p>
            © {new Date().getFullYear()} {dict.brand.full}. {dict.footer.rights}
          </p>
          <Link
            href={localizePath(locale === "en" ? "zh" : "en", "/")}
            className="hover:text-brand"
          >
            {locale === "en" ? "中文" : "English"}
          </Link>
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
      <h4 className="mb-3 text-sm font-semibold text-ink">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-ink-soft hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
