import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { docTree, getContent, listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { DocsSidebar } from "@/components/layout/DocsSidebar";

export async function generateStaticParams() {
  const locales = ["en", "zh"] as const;
  return locales.flatMap((locale) =>
    listContent("docs", locale).map((doc) => ({ locale, slug: doc.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const doc = getContent("docs", loc, slug);
  if (!doc) return { title: "Docs" };
  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const dict = await getDictionary(loc);
  const doc = getContent("docs", loc, slug);
  if (!doc) notFound();

  const tree = docTree(loc);
  const { default: Doc } = await import(`@/content/docs/${loc}/${slug}.mdx`);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-10">
          <Link
            href={localizePath(loc, "/docs")}
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.docs.backToDocs}
          </Link>
          <div className="mt-4 max-w-3xl">
            {doc.meta.category && <Badge color="brand">{doc.meta.category}</Badge>}
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {doc.meta.title}
            </h1>
            <p className="mt-3 text-lg text-ink-soft">{doc.meta.description}</p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <DocsSidebar tree={tree} locale={loc} activeSlug={slug} />
            </div>
          </aside>
          <article className="lg:col-span-3">
            <div className="max-w-3xl">
              <Doc />
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
