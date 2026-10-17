import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Gauge, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { products } from "@/lib/products";
import { pressureQuoteChecklist, pressureSelection } from "@/lib/pressure-content";
import { pageAlternates, pageUrl } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).locale !== "en") notFound();
  return {
    title: "Industrial Pressure Gauge Manufacturer",
    description: "Compare Jingfeng Bourdon-tube, stainless steel, capsule and ammonia pressure gauges. Review sample specifications and prepare a configuration enquiry.",
    alternates: pageAlternates("en", "/pressure-gauges", ["en"]),
  };
}

export default async function PressureGaugesPage({ params }: Props) {
  if ((await params).locale !== "en") notFound();
  const gauges = products.filter((product) => product.category === "pressure");
  const breadcrumbs = [
    { name: "Home", url: pageUrl("en") },
    { name: "Products", url: pageUrl("en", "/products") },
    { name: "Pressure gauges", url: pageUrl("en", "/pressure-gauges") },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Hero: brand-gradient banner matching the homepage hero treatment */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-[#002565] via-[#0a3d8f] to-[#00cfff]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <Container className="relative py-16 sm:py-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-cyan-100/80">
              <Link href="/en" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/en/products" className="transition-colors hover:text-white">Products</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Pressure gauges</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
              Jingfeng · Manufacturer enquiries
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Industrial pressure gauges, selected for your process.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/90">
              Explore four pressure gauge configurations from Anhui Jingfeng Instrument Co., Ltd.
              Start with the measurement task, compare the photographed samples, then confirm the
              configuration with our team before ordering.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#compare"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-brand shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5"
              >
                Compare gauges
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/en/contact?product=pressure-gauge&source=pressure-gauges"
                data-track="quote_click"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Discuss your requirements
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Product comparison cards */}
      <Section id="compare">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Gauge className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-3xl font-bold text-brand">Find your starting point</h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink-soft">
                Four configurations · Photographed samples
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl leading-7 text-ink-soft">
            The ranges below describe catalogue photographs, not the complete available range or a
            final supply specification. Application suitability depends on the confirmed materials
            and operating conditions.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {gauges.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_4px_rgba(70,70,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0.8rem_2rem_rgba(0,37,101,0.15)]">
                <Link href={`/en/products/${product.slug}`} className="relative block border-b border-line bg-white">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={`${product.model} ${product.name.en}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                    {product.model}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-bold text-brand">
                    <Link href={`/en/products/${product.slug}`} className="transition-colors hover:text-link">
                      {product.name.en}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-7 text-ink-soft">{pressureSelection[product.slug].focus}</p>
                  <dl className="mt-5 rounded-xl bg-surface-muted px-5 py-4">
                    {product.specs.en.slice(0, 2).map(([label, value]) => (
                      <div key={label} className="flex flex-wrap justify-between gap-2 py-1.5 text-sm">
                        <dt className="text-ink-soft">{label}</dt>
                        <dd className="font-bold text-brand">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 flex-1 text-sm leading-6 text-ink-soft">
                    {pressureSelection[product.slug].confirm}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 font-bold text-link">
                    <Link href={`/en/products/${product.slug}`} className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors hover:text-brand">
                      View specifications
                    </Link>
                    <Link
                      href={`/en/contact?product=${product.slug}&source=pressure-gauges`}
                      data-track="quote_click"
                      data-product={product.slug}
                      className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors hover:text-brand"
                    >
                      Enquire about {product.model}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Enquiry checklist: alternating muted band */}
      <Section muted id="requirements">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h2 className="text-3xl font-bold text-brand">
              A clearer enquiry. A better starting specification.
            </h2>
          </div>
        </Reveal>
        <div className="mt-9 grid gap-10 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="rounded-2xl border border-line bg-surface p-8 shadow-sm lg:sticky lg:top-28">
              <FileText className="h-8 w-8 text-brand" strokeWidth={1.5} />
              <p className="mt-5 leading-7 text-ink">
                Send your operating conditions and installation requirements. Our team can review
                the requested configuration, discuss documentation and identify the details that
                need confirmation before a quotation.
              </p>
              <p className="mt-4 leading-7 text-ink-soft">
                For international enquiries, include the destination country, packaging
                requirements and any project documentation requirements. Availability, delivery
                terms, quantities and documentation are confirmed for each enquiry.
              </p>
              <Link
                href="/en/contact?source=pressure-gauges"
                data-track="quote_click"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong"
              >
                Start an enquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/about"
                className="mt-4 block text-sm font-bold text-link underline underline-offset-4"
              >
                About Jingfeng
              </Link>
            </div>
          </Reveal>
          <ul className="grid content-start gap-4">
            {pressureQuoteChecklist.map((item, index) => (
              <Reveal key={item} delay={index * 60}>
                <li className="flex gap-4 rounded-2xl border border-line bg-surface p-5 leading-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1.5 text-sm">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Guide CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-r from-brand-soft via-surface to-surface p-10 sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/5 blur-2xl"
            />
            <div className="relative max-w-2xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                <CheckCircle2 className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 text-3xl font-bold text-brand">Understand the selection decisions</h2>
              <p className="mt-4 leading-7 text-ink-soft">
                Use our selection guide to prepare questions about range, accuracy and service
                conditions. Final selection still requires confirmation for your process.
              </p>
              <Link
                href="/en/blog/selecting-pressure-gauge"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong"
              >
                Read the pressure gauge selection guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
