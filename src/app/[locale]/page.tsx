import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Gauge as GaugeIcon,
  Layers,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n-config";
import { listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, Badge } from "@/components/ui/Card";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import type { Category } from "@/lib/products";

const featureIcons = [GaugeIcon, ShieldCheck, Cpu, Layers];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const posts = listContent("blog", loc).slice(0, 3);

  const categoryItems: Category[] = [
    "pressure",
    "flow",
    "temperature",
    "level",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-soft to-surface" />
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">
              {dict.home.heroEyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {dict.home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={localizePath(loc, "/products")}
                size="lg"
                className="group"
              >
                {dict.home.heroCtaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                href={localizePath(loc, "/contact")}
                size="lg"
                variant="secondary"
              >
                {dict.home.heroCtaSecondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Section muted>
        <SectionHeader
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
          center
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryItems.map((cat) => (
            <Link
              key={cat}
              href={localizePath(loc, `/products?cat=${cat}`)}
              className="card card-hover block p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <CategoryIcon category={cat} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-ink">
                {dict.categories[cat].name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {dict.categories[cat].desc}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeader
          eyebrow={dict.brand.name}
          title={dict.home.featuresTitle}
          subtitle={dict.home.featuresSubtitle}
          center
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.features.map((feat, i) => {
            const Icon = featureIcons[i] ?? CheckCircle2;
            return (
              <Card key={feat.title} hover className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-ink">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {feat.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Applications */}
      <Section muted>
        <SectionHeader
          title={dict.home.applicationsTitle}
          subtitle={dict.home.applicationsSubtitle}
          center
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.applications.map((app) => (
            <Card key={app.name} className="text-center">
              <h3 className="text-lg font-semibold text-brand">{app.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{app.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section>
        <SectionHeader
          title={dict.home.certsTitle}
          subtitle={dict.home.certsSubtitle}
          center
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {dict.certs.map((cert) => (
            <Badge key={cert} color="neutral">
              {cert}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Blog preview */}
      {posts.length > 0 && (
        <Section muted>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              title={dict.home.blogTitle}
              subtitle={dict.home.blogSubtitle}
            />
            <Button
              href={localizePath(loc, "/blog")}
              variant="ghost"
              className="shrink-0"
            >
              {dict.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={localizePath(loc, `/blog/${post.slug}`)}
                className="card card-hover flex flex-col p-6"
              >
                <time className="text-xs font-medium text-ink-soft">
                  {post.date}
                </time>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-soft">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {dict.blog.readMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="bg-brand">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {dict.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/90">
            {dict.home.ctaSubtitle}
          </p>
          <Link
            href={localizePath(loc, "/contact")}
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-white px-6 text-base font-medium text-brand transition-transform hover:scale-[1.02]"
          >
            {dict.home.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
