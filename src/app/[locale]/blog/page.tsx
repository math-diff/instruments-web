import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : (locale as Locale));
  return { title: dict.blog.title, description: dict.blog.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const posts = listContent("blog", loc);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {dict.blog.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            {dict.blog.subtitle}
          </p>
        </Container>
      </section>

      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-ink-soft">—</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={localizePath(loc, `/blog/${post.slug}`)}
                className="card card-hover flex flex-col p-6"
              >
                <time className="text-xs font-medium text-ink-soft">
                  {post.date}
                </time>
                <h2 className="mt-2 text-lg font-semibold text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag} color="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {dict.blog.readMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
