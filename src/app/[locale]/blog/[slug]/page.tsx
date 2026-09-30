import { contentAlternates, pageUrl, SITE_URL } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { formatDate } from "@/lib/date";
import { isLocale, locales, localizePath, type Locale } from "@/lib/i18n-config";
import { getContent, hasOwnContent, listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    listContent("blog", locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const post = getContent("blog", loc, slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: contentAlternates("blog", loc, slug),
    openGraph: { title: post.meta.title, description: post.meta.description, type: "article", url: pageUrl(hasOwnContent("blog", loc) ? loc : "en", `/blog/${slug}`) },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const dict = await getDictionary(loc);
  const post = getContent("blog", loc, slug);
  if (!post) notFound();

  const contentLocale = hasOwnContent("blog", loc) ? loc : "en";
  const { default: Post } = await import(`@/content/blog/${contentLocale}/${slug}.mdx`);
  const breadcrumbs = [
    { name: dict.nav.home, url: pageUrl(loc) },
    { name: dict.nav.blog, url: pageUrl(loc, "/blog") },
    { name: post.meta.title, url: pageUrl(contentLocale, `/blog/${slug}`) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article",
        headline: post.meta.title, description: post.meta.description,
        mainEntityOfPage: pageUrl(contentLocale, `/blog/${slug}`), inLanguage: contentLocale,
        ...(post.meta.date ? { datePublished: post.meta.date } : {}),
        publisher: { "@id": `${SITE_URL}/#organization` },
      }} />
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-xs text-ink-soft">
            {breadcrumbs.map((item, index) => <span key={item.url}>{index > 0 && <span aria-hidden="true"> / </span>}{index < breadcrumbs.length - 1 ? <Link href={new URL(item.url).pathname}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</span>)}
          </nav>
          <Link
            href={localizePath(loc, "/blog")}
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.blog.backToList}
          </Link>
          <div className="mt-6 max-w-3xl">
            {post.meta.category && (
              <Badge color="brand">{post.meta.category}</Badge>
            )}
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              {post.meta.title}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">{post.meta.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-ink-soft">
              <time dateTime={post.meta.date}>
                {dict.blog.publishedOn} {formatDate(post.meta.date, loc)}
              </time>
              {post.meta.tags && post.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.meta.tags.map((tag) => (
                    <Badge key={tag} color="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl">
          <Post />
        </article>
      </Section>
    </>
  );
}
