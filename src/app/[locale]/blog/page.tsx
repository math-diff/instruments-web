import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { listContent } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

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
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              {dict.blog.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {dict.blog.subtitle}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-ink-soft">—</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90} className="h-full">
                <Link
                  href={localizePath(loc, `/blog/${post.slug}`)}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <time className="text-xs font-medium text-ink-soft">
                    {formatDate(post.date, loc)}
                  </time>
                  <h2 className="mt-2 text-lg font-bold text-brand transition-colors group-hover:text-link">
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
                  <span className="more-link mt-4 text-sm">
                    {dict.blog.readMore}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
