import Link from "next/link";
import Image from "next/image";
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
import { Reveal } from "@/components/ui/Reveal";

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
            <Reveal>
              <div className="relative h-72 overflow-hidden rounded-xl border border-line bg-surface sm:h-80">
                <Image
                  src={product.image}
                  alt={product.name[loc]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
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
                    className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_0.4rem_1rem_rgba(0,37,101,0.3)]"
                  >
                    {dict.products.inquire}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand">
              {dict.products.specs}
            </h2>
            <div className="mt-6">
              <SpecTable rows={product.specs[loc]} />
            </div>
          </Reveal>
          <Reveal delay={150}>
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
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section muted>
          <Reveal>
            <h2 className="text-2xl font-bold text-brand">
              {dict.categories[product.category].name}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full">
                <Link
                  href={localizePath(loc, `/products/${p.slug}`)}
                  className="card card-hover group block h-full overflow-hidden"
                >
                  <div className="relative h-44 border-b border-line bg-surface">
                    <Image
                      src={p.image}
                      alt={p.name[loc]}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-brand">{p.model}</p>
                    <h3 className="mt-1 text-base font-bold text-brand">
                      {p.name[loc]}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {p.summary[loc]}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
