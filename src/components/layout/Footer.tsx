import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import { localizePath } from "@/lib/i18n-config";
import { categories } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";

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
    { label: dict.nav.pricing, href: localizePath(locale, "/pricing") },
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
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {dict.brand.name}
          </p>
          <Link
            href={localizePath(locale === "en" ? "zh" : "en", "/")}
            className="font-bold text-link hover:text-brand hover:underline underline-offset-4"
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
