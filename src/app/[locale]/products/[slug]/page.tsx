import { pageAlternates, pageUrl } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { pressureConfirmationFields, pressureSelection } from "@/lib/pressure-content";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { categoryPath, isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { getProduct, products, pick } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { SpecTable } from "@/components/ui/SpecTable";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductImageViewer } from "@/components/ProductImageViewer";

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
    title: loc === "en" && product.category === "pressure"
      ? `${product.slug === "pressure-gauge" ? "Bourdon Tube Pressure Gauge" : product.name.en} | ${product.model}`
      : pick(product.name, loc),
    description: pick(product.summary, loc),
    alternates: pageAlternates(loc, `/products/${slug}`),
    openGraph: {
      title: `${pick(product.name, loc)} | ${product.model}`,
      description: pick(product.summary, loc), url: pageUrl(loc, `/products/${slug}`),
      images: [{ url: product.image, alt: pick(product.name, loc) }],
    },
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

  const pressureContext = loc === "en" ? pressureSelection[product.slug] : undefined;
  const catalogueHref = loc === "en" ? categoryPath(loc, product.category) : localizePath(loc, "/products");
  const catalogueName = loc === "en" ? { pressure: "Pressure gauges", temperature: "Temperature instruments", level: "Level instruments" }[product.category] : dict.nav.products;
  const sampleConnection = product.specs.en.find(([label]) => label === "Process connection")?.[1];
  const breadcrumbs = [
    { name: dict.nav.home, url: pageUrl(loc) },
    { name: catalogueName, url: new URL(catalogueHref, pageUrl(loc)).href },
    { name: pick(product.name, loc), url: pageUrl(loc, `/products/${product.slug}`) },
  ];

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-ink-soft">
            <Link href={localizePath(loc, "/")}>{dict.nav.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={catalogueHref}>{catalogueName}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{pick(product.name, loc)}</span>
          </nav>
          <Button
            href={catalogueHref}
            variant="secondary"
            className="group w-fit border-line px-3.5 shadow-[0_0.15rem_0.55rem_rgba(0,37,101,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-link hover:shadow-[0_0.35rem_1rem_rgba(0,37,101,0.14)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white transition-transform duration-200 group-hover:-translate-x-0.5">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span>{catalogueName}</span>
          </Button>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <ProductImageViewer
                src={product.image}
                alt={pick(product.name, loc)}
                zoomLabel={dict.products.zoomImage}
                closeLabel={dict.products.closeImage}
              />
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
                  {loc === "en" && pressureContext ? `${product.model} ${product.slug === "pressure-gauge" ? "Bourdon Tube Pressure Gauge" : product.name.en}` : pick(product.name, loc)}
                </h1>
                <p className="mt-4 text-lg leading-7 text-ink-soft">
                  {pick(product.summary, loc)}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {pick(product.highlights, loc).map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-ink">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-green" strokeWidth={2} />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={localizePath(loc, `/contact?product=${product.slug}`)}
                    data-track="quote_click"
                    data-product={product.slug}
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
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-brand">
              {dict.products.overview}
            </h2>
            <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">
              {pick(product.description, loc)}
            </p>
            {pressureContext && <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">{pressureContext.application}</p>}
          </div>
        </Reveal>

        <div className="mt-12 border-t border-line pt-12">
          <Reveal className="max-w-4xl">
            <h2 className="text-2xl font-bold text-brand">
              {dict.products.specs}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              {dict.products.specsNote}
            </p>
            <div className="mt-6">
              <SpecTable rows={pick(product.specs, loc)} />
            </div>
          </Reveal>
        </div>
      </Section>

      {pressureContext && (
        <Section muted>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand">Specify {product.model} for your installation</h2>
              <p className="mt-4 leading-7 text-ink-soft">The specifications above describe the pictured catalogue sample. They are not a complete ordering specification or confirmation of every available option.</p>
              <p className="mt-4 leading-7 text-ink-soft">{pressureContext.confirm}</p>
              <p className="mt-4 leading-7 text-ink-soft">Request a configuration-specific drawing and the inspection, calibration or certification documents required by your project. Their availability and scope must be confirmed before ordering.</p>
              <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-white px-5">
                {[
                  ["Dial and mounting", "Dial diameter, mounting position, dimensions and installation clearance: confirm for the ordered configuration."],
                  ["Process connection", `${sampleConnection ? `Sample observation: ${sampleConnection}.` : "Connection dimensions have not been recorded for this sample."} Confirm the thread or flange standard, size, sealing face and pressure rating.`],
                  ["Materials and service limits", "Confirm each wetted component and seal, compatible medium, process and ambient temperatures, and steady, fluctuating and overload pressure limits."],
                  ["Drawings and documents", "Request a dimensioned drawing and the required inspection, calibration or approval evidence. Documents are supplied only where available for the specified configuration."],
                ].map(([label, value]) => <div key={label} className="py-4"><dt className="font-bold text-brand">{label}</dt><dd className="mt-2 text-sm leading-6 text-ink-soft">{value}</dd></div>)}
              </dl>
              <Link href={localizePath(loc, `/contact?product=${product.slug}`)} data-track="quote_click" data-product={product.slug} className="mt-6 inline-block font-bold text-link underline underline-offset-4">Request a {product.model} drawing and specification</Link>
              <Link href="/en/blog/selecting-pressure-gauge" className="mt-6 inline-block font-bold text-link underline underline-offset-4">Read the pressure gauge selection guide</Link>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-bold text-brand">Details to include in your enquiry</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-ink-soft">
                {pressureConfirmationFields.map((field) => <li key={field}>{field}</li>)}
                <li>Quantity, destination and required delivery date</li>
              </ul>
              <Link href={localizePath(loc, `/contact?product=${product.slug}`)} data-track="quote_click" data-product={product.slug} className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white">Discuss {product.model}</Link>
            </div>
          </div>
        </Section>
      )}

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
                      alt={pick(p.name, loc)}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-brand">{p.model}</p>
                    <h3 className="mt-1 text-base font-bold text-brand">
                      {pick(p.name, loc)}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {pick(p.summary, loc)}
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
