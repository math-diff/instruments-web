import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Gauge as GaugeIcon,
  Layers,
  Globe,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n-config";
import { listContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { HeroSlider, type HeroSlide } from "@/components/sections/HeroSlider";
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

  const slides: HeroSlide[] = [
    {
      title: dict.home.heroTitle,
      text: dict.home.heroSubtitle,
      ctaLabel: dict.home.heroCtaPrimary,
      href: localizePath(loc, "/products"),
      theme: "navy",
    },
    {
      title: dict.home.categoriesTitle,
      text: dict.home.categoriesSubtitle,
      ctaLabel: dict.common.viewAll,
      href: localizePath(loc, "/products"),
      theme: "steel",
    },
    {
      title: dict.home.ctaTitle,
      text: dict.home.ctaSubtitle,
      ctaLabel: dict.home.ctaButton,
      href: localizePath(loc, "/contact"),
      theme: "cyan",
    },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSlider slides={slides} />

      {/* Centered CTA, echoing the WIKA newsletter button */}
      <div className="bg-surface py-12 text-center">
        <Link
          href={localizePath(loc, "/contact")}
          className="inline-flex h-12 items-center rounded-full bg-brand px-8 text-base font-bold text-white transition-colors hover:bg-brand-strong"
        >
          {dict.home.heroCtaSecondary}
        </Link>
      </div>

      {/* Categories */}
      <Section muted>
        <SectionHeader
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryItems.map((cat) => (
            <Link
              key={cat}
              href={localizePath(loc, `/products?cat=${cat}`)}
              className="card card-hover flex flex-col p-6"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[0.6rem] bg-brand-soft text-brand">
                <CategoryIcon category={cat} className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-brand">
                {dict.categories[cat].name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                {dict.categories[cat].desc}
              </p>
              <span className="more-link mt-4 text-sm">
                {dict.common.learnMore}
                <ArrowRight className="h-4 w-4" />
              </span>
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
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.features.map((feat, i) => {
            const Icon = featureIcons[i] ?? CheckCircle2;
            return (
              <div key={feat.title} className="card h-full p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[0.6rem] bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-brand">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Applications + sales contact, WIKA 2/3 + 1/3 row */}
      <Section muted>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeader
              title={dict.home.applicationsTitle}
              subtitle={dict.home.applicationsSubtitle}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dict.applications.map((app) => (
                <div key={app.name} className="card p-6">
                  <h3 className="text-lg font-bold text-brand">{app.name}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-[0.8rem] bg-brand p-8 text-white shadow-[0_0.4rem_1.6rem_rgba(0,37,101,0.25)]">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white">
                {dict.home.salesTitle}
              </h3>
            </div>
            <p className="mt-4 flex-1 text-[15px] leading-7 text-white/85">
              {dict.home.salesDesc}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={localizePath(loc, "/contact")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-brand transition-colors hover:bg-brand-soft"
              >
                {dict.home.ctaButton}
              </Link>
              <Link
                href={`mailto:${dict.footer.email}`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.footer.email}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Certifications */}
      <Section>
        <SectionHeader
          title={dict.home.certsTitle}
          subtitle={dict.home.certsSubtitle}
        />
        <div className="mt-8 flex flex-wrap items-center gap-3">
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
            <Link
              href={localizePath(loc, "/blog")}
              className="more-link shrink-0 text-[15px]"
            >
              {dict.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={localizePath(loc, `/blog/${post.slug}`)}
                className="card card-hover flex flex-col p-6"
              >
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-soft">
                  {post.date}
                </span>
                <h3 className="text-lg font-bold leading-snug text-brand">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-soft">
                  {post.description}
                </p>
                <span className="more-link mt-4 text-sm">
                  {dict.blog.readMore}
                  <ArrowRight className="h-4 w-4" />
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
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-base font-bold text-brand transition-colors hover:bg-brand-soft"
          >
            {dict.home.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
