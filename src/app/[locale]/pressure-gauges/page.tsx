import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PressureComparison } from "@/components/sections/PressureComparison";
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
    openGraph: {
      title: "Industrial Pressure Gauge Manufacturer",
      description: "Compare four Jingfeng pressure gauge samples, review their observed specifications and prepare a configuration enquiry.",
      url: pageUrl("en", "/pressure-gauges"), type: "website",
      images: [{ url: "/products/stainless-pressure-gauge.jpg", alt: "JF-1545 pressure gauge sample" }],
    },
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
      <section className="border-b border-line bg-surface-muted py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-ink-soft">
            <Link href="/en">Home</Link><span aria-hidden="true">/</span>
            <Link href="/en/products">Products</Link><span aria-hidden="true">/</span>
            <span aria-current="page">Pressure gauges</span>
          </nav>
          <p className="text-sm font-bold uppercase tracking-wider text-link">Jingfeng · Manufacturer enquiries</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-brand sm:text-5xl">Industrial pressure gauges, selected for your process.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">Explore four pressure gauge configurations from Anhui Jingfeng Instrument Co., Ltd. Start with the measurement task, compare the photographed samples, then confirm the configuration with our team before ordering.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#compare" className="rounded-full bg-brand px-6 py-3 font-bold text-white">Compare gauges</a>
            <Link href="/en/contact" data-track="quote_click" className="rounded-full border border-brand px-6 py-3 font-bold text-brand">Discuss your requirements</Link>
          </div>
        </Container>
      </section>
      <Section id="compare" className="scroll-mt-24 lg:scroll-mt-36">
        <h2 className="text-3xl font-bold text-brand">Find your starting point</h2>
        <p className="mt-4 max-w-3xl leading-7 text-ink-soft">The ranges below describe catalogue photographs, not the complete available range or a final supply specification. Application suitability depends on the confirmed materials and operating conditions.</p>
        <PressureComparison />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {gauges.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <Link href={`/en/products/${product.slug}`} className="block">
                <div className="relative h-60 border-b border-line bg-white">
                  <Image src={product.image} alt={`${product.model} ${product.name.en}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6" />
                </div>
                <div className="p-6 pb-0">
                  <p className="text-sm font-bold text-link">{product.model}</p>
                  <h3 className="mt-2 text-2xl font-bold text-brand">{product.name.en}</h3>
                </div>
              </Link>
              <div className="p-6 pt-3">
                <p className="leading-7 text-ink-soft">{pressureSelection[product.slug].focus}</p>
                <dl className="mt-5 border-y border-line py-4">
                  {product.specs.en.slice(0, 2).map(([label, value]) => (
                    <div key={label} className="flex flex-wrap justify-between gap-2 py-1 text-sm"><dt className="text-ink-soft">{label}</dt><dd className="font-semibold text-brand">{value}</dd></div>
                  ))}
                </dl>
                <p className="mt-4 text-sm leading-6 text-ink-soft">{pressureSelection[product.slug].confirm}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-bold text-link">
                  <Link href={`/en/products/${product.slug}`} className="underline underline-offset-4">View specifications</Link>
                  <Link href={`/en/contact?product=${product.slug}&source=pressure-gauges`} data-track="quote_click" data-product={product.slug} className="underline underline-offset-4">Enquire about {product.model}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-brand">From a catalogue sample to an ordered configuration</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            ["1. Describe the process", "Record the medium, normal and maximum pressure, process temperature, ambient conditions and the reading you need. Include pulsation, surges and vibration."],
            ["2. Confirm the construction", "Specify dial diameter, mounting position, thread or flange standard, connection size, pressure rating, wetted components and seals. Use a dimensioned drawing for a replacement."],
            ["3. Agree the documentation", "Request the model-specific drawing, specification and project-required inspection or calibration documents with your enquiry. Availability and scope are confirmed with the quotation."],
          ].map(([title, text]) => <div key={title} className="rounded-xl border border-line p-6"><h3 className="text-xl font-bold text-brand">{title}</h3><p className="mt-4 leading-7 text-ink-soft">{text}</p></div>)}
        </div>
      </Section>
      <Section muted id="requirements" className="scroll-mt-24 lg:scroll-mt-36">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-brand">A clearer enquiry. A better starting specification.</h2>
            <p className="mt-5 leading-7 text-ink-soft">Send your operating conditions and installation requirements. Our team can review the requested configuration, discuss documentation and identify the details that need confirmation before a quotation.</p>
            <p className="mt-4 leading-7 text-ink-soft">For international enquiries, include the destination country, packaging requirements and any project documentation requirements. Availability, delivery terms, quantities and documentation are confirmed for each enquiry.</p>
            <Link href="/en/about" className="mt-6 inline-block font-bold text-link underline underline-offset-4">About Jingfeng</Link>
          </div>
          <ul className="grid gap-3">
            {pressureQuoteChecklist.map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-line bg-surface p-4 text-sm leading-6"><span className="font-bold text-link">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}
          </ul>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-brand">Understand the selection decisions</h2>
        <p className="mt-4 max-w-3xl leading-7 text-ink-soft">Use our selection guide to prepare questions about range, accuracy and service conditions. Final selection still requires confirmation for your process.</p>
        <Link href="/en/blog/selecting-pressure-gauge" className="mt-6 inline-block font-bold text-link underline underline-offset-4">Read the pressure gauge selection guide</Link>
      </Section>
    </>
  );
}
