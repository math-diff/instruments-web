import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : (locale as Locale));
  return { title: dict.docs.title, description: dict.docs.subtitle };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const docs = listContent("docs", loc);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
            {dict.docs.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            {dict.docs.subtitle}
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={localizePath(loc, `/docs/${doc.slug}`)}
              className="card card-hover flex flex-col p-6"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <FileText className="h-5 w-5" strokeWidth={1.5} />
              </div>
              {doc.category && (
                <p className="text-xs font-medium uppercase tracking-wider text-brand">
                  {doc.category}
                </p>
              )}
              <h2 className="mt-1 text-lg font-bold text-brand">
                {doc.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                {doc.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                {dict.common.learnMore}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
