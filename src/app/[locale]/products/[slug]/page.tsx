import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { getProduct, products } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { SpecTable } from "@/components/ui/SpecTable";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  if (!product) return { title: "Product" };
  return {
    title: product.name[loc],
    description: product.summary[loc],
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const dict = await getDictionary(loc);
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-12">
          <Link
            href={localizePath(loc, "/products")}
            className="text-sm font-medium text-ink-soft hover:text-brand"
          >
            ← {dict.nav.products}
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="flex h-72 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-brand-soft to-surface text-brand sm:h-80">
              <CategoryIcon category={product.category} className="h-24 w-24" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge color="brand">{product.model}</Badge>
                <Badge color="neutral">
                  {dict.categories[product.category].name}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                {product.name[loc]}
              </h1>
              <p className="mt-4 text-lg leading-7 text-ink-soft">
                {product.summary[loc]}
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {product.highlights[loc].map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-green" strokeWidth={2} />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={localizePath(loc, "/contact")}
                  className="inline-flex h-12 items-center rounded-lg bg-brand px-6 text-base font-medium text-white transition-colors hover:bg-brand-strong"
                >
                  {dict.products.inquire}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand">
              {dict.products.specs}
            </h2>
            <div className="mt-6">
              <SpecTable rows={product.specs[loc]} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand">{dict.products.docs}</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="#"
                  className="card card-hover flex items-center gap-3 p-4 text-sm font-medium text-ink"
                >
                  <Download className="h-5 w-5 text-brand" strokeWidth={1.5} />
                  {dict.products.downloadDatasheet}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="card card-hover flex items-center gap-3 p-4 text-sm font-medium text-ink"
                >
                  <Download className="h-5 w-5 text-brand" strokeWidth={1.5} />
                  {dict.products.downloadManual}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section muted>
          <h2 className="text-2xl font-bold text-brand">
            {dict.categories[product.category].name}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={localizePath(loc, `/products/${p.slug}`)}
                className="card card-hover block p-5"
              >
                <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <CategoryIcon category={p.category} className="h-10 w-10" />
                </div>
                <p className="text-xs font-medium text-brand">{p.model}</p>
                <h3 className="mt-1 text-base font-bold text-brand">
                  {p.name[loc]}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                  {p.summary[loc]}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
