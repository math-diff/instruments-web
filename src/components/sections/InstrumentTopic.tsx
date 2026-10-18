import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { products } from "@/lib/products";
import { instrumentTopics, type InstrumentTopic } from "@/lib/instrument-topics";
import { pageAlternates, pageUrl } from "@/lib/seo";

export function instrumentTopicMetadata(category: InstrumentTopic): Metadata {
  const topic = instrumentTopics[category];
  return {
    title: topic.title, description: topic.description,
    alternates: pageAlternates("en", topic.path, ["en"]),
    openGraph: { title: topic.title, description: topic.description, url: pageUrl("en", topic.path), type: "website" },
  };
}

export function InstrumentTopicPage({ category }: { category: InstrumentTopic }) {
  const topic = instrumentTopics[category];
  const catalogue = products.filter((product) => product.category === category);
  const breadcrumbs = [
    { name: "Home", url: pageUrl("en") }, { name: "Products", url: pageUrl("en", "/products") },
    { name: topic.label, url: pageUrl("en", topic.path) },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="border-b border-line bg-surface-muted py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-ink-soft">
            <Link href="/en">Home</Link><span aria-hidden="true">/</span><Link href="/en/products">Products</Link>
            <span aria-hidden="true">/</span><span aria-current="page">{topic.label}</span>
          </nav>
          <p className="text-sm font-bold uppercase tracking-wider text-link">Jingfeng · {topic.label}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-brand sm:text-5xl">{topic.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">{topic.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#instruments" className="rounded-full bg-brand px-6 py-3 font-bold text-white">Explore instruments</a>
            <Link href="/en/contact" data-track="quote_click" className="rounded-full border border-brand px-6 py-3 font-bold text-brand">Discuss the measurement point</Link>
          </div>
        </Container>
      </section>
      <Section>
        <h2 className="text-3xl font-bold text-brand">Choose the measurement approach</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {topic.decisions.map(([title, text]) => <div key={title} className="rounded-xl border border-line p-6"><h3 className="text-xl font-bold text-brand">{title}</h3><p className="mt-4 leading-7 text-ink-soft">{text}</p></div>)}
        </div>
      </Section>
      <Section muted id="instruments" className="scroll-mt-24 lg:scroll-mt-36">
        <h2 className="text-3xl font-bold text-brand">Compare the catalogue samples</h2>
        <p className="mt-4 max-w-3xl leading-7 text-ink-soft">The observations below describe photographed samples. Confirm the ordered range, materials, dimensions, output and operating limits against a configuration-specific specification.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalogue.map((product) => (
            <article key={product.slug} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <Link href={`/en/products/${product.slug}`} className="block">
                <div className="relative h-52 border-b border-line"><Image src={product.image} alt={`${product.model} ${product.name.en}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-6" /></div>
                <div className="p-6 pb-0"><p className="text-sm font-bold text-link">{product.model}</p><h3 className="mt-2 text-xl font-bold text-brand">{product.name.en}</h3></div>
              </Link>
              <div className="flex flex-1 flex-col p-6 pt-3">
                <p className="leading-7 text-ink-soft">{product.summary.en}</p>
                <dl className="my-5 border-y border-line py-3">{product.specs.en.slice(0, 2).map(([label, value]) => <div key={label} className="py-2 text-sm"><dt className="text-ink-soft">{label}</dt><dd className="mt-1 font-medium text-brand">{value}</dd></div>)}</dl>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-link">
                  <Link href={`/en/products/${product.slug}`} className="underline underline-offset-4">View {product.model}</Link>
                  <Link href={`/en/contact?product=${product.slug}`} data-track="quote_click" data-product={product.slug} className="underline underline-offset-4">Request a configuration</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div><h2 className="text-3xl font-bold text-brand">Prepare a useful enquiry</h2><p className="mt-5 leading-7 text-ink-soft">Send a drawing or describe the measurement point with the following details. Request the drawings and inspection, calibration or approval documents needed for your project; availability and scope are confirmed with the quotation.</p><Link href="/en/contact" data-track="quote_click" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white">Send your requirements</Link></div>
          <ul className="list-disc space-y-3 ps-5 leading-7 text-ink-soft">{topic.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </Section>
      <Section muted>
        <h2 className="text-3xl font-bold text-brand">Selection and installation resources</h2>
        <ul className="mt-6 space-y-4">{topic.resources.map(([label, href]) => <li key={href}><Link href={href} className="font-bold text-link underline underline-offset-4">{label}</Link></li>)}</ul>
        <Link href="/en/products" className="mt-8 inline-block text-sm font-bold text-link underline underline-offset-4">Explore all instrument families</Link>
      </Section>
    </>
  );
}
