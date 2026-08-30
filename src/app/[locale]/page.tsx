import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Gauge as GaugeIcon,
  Layers,
  Wrench,
  Globe,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizePath, type Locale } from "@/lib/i18n-config";
import { listContent, hasOwnContent } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { certificates } from "@/lib/certs";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroSlider, type HeroSlide } from "@/components/sections/HeroSlider";
import { CertScroller } from "@/components/sections/CertScroller";
import type { Category } from "@/lib/products";

const featureIcons = [GaugeIcon, ShieldCheck, Layers, Wrench];

// representative photo per category for the homepage teaser cards
const categoryCover: Record<Category, string> = {
  pressure: "/products/stainless-pressure-gauge.jpg",
  temperature: "/products/bimetal-thermometer.jpg",
  level: "/products/magnetic-level.jpg",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const posts = listContent("blog", loc).slice(0, 3);
  // hide the blog teaser for locales that have no articles of their own
  const showBlog = posts.length > 0 && hasOwnContent("blog", loc);

  const categoryItems: Category[] = [
    "pressure",
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
        <Reveal>
          <Link
            href={localizePath(loc, "/contact")}
            className="inline-flex h-12 items-center rounded-full bg-brand px-8 text-base font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-brand-strong hover:shadow-[0_0.4rem_1.2rem_rgba(0,37,101,0.3)]"
          >
            {dict.home.heroCtaSecondary}
          </Link>
        </Reveal>
      </div>

      {/* Categories */}
      <Section muted>
        <Reveal>
          <SectionHeader
            title={dict.home.categoriesTitle}
            subtitle={dict.home.categoriesSubtitle}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryItems.map((cat, i) => (
            <Reveal key={cat} delay={i * 90} className="h-full">
              <Link
                href={localizePath(loc, `/products?cat=${cat}`)}
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative h-44 border-b border-line bg-surface">
                  <Image
                    src={categoryCover[cat]}
                    alt={dict.categories[cat].name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-brand">
                    {dict.categories[cat].name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                    {dict.categories[cat].desc}
                  </p>
                  <span className="more-link mt-4 text-sm">
                    {dict.common.learnMore}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={dict.brand.name}
            title={dict.home.featuresTitle}
            subtitle={dict.home.featuresSubtitle}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.features.map((feat, i) => {
            const Icon = featureIcons[i] ?? CheckCircle2;
            return (
              <Reveal key={feat.title} delay={i * 90} className="h-full">
                <div className="card group h-full p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[0.6rem] bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-brand">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {feat.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Applications + sales contact, WIKA 2/3 + 1/3 row */}
      <Section muted>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <SectionHeader
                title={dict.home.applicationsTitle}
                subtitle={dict.home.applicationsSubtitle}
              />
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dict.applications.map((app, i) => (
                <Reveal key={app.name} delay={i * 80} className="h-full">
                  <div className="card h-full p-6">
                    <h3 className="text-lg font-bold text-brand">{app.name}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{app.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200} className="h-full">
            <div className="flex h-full flex-col rounded-[0.8rem] bg-brand p-8 text-white shadow-[0_0.4rem_1.6rem_rgba(0,37,101,0.25)]">
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
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-brand transition-all duration-200 hover:bg-brand-soft hover:shadow-[0_0.3rem_1rem_rgba(255,255,255,0.35)]"
                >
                  {dict.home.ctaButton}
                </Link>
                <Link
                  href={`mailto:${dict.footer.email}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  {dict.footer.email}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Certificates — horizontal scroller */}
      <Section>
        <Reveal>
          <SectionHeader
            title={dict.home.certsTitle}
            subtitle={dict.home.certsSubtitle}
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <CertScroller items={certificates} locale={loc} />
        </Reveal>
      </Section>

      {/* Blog preview */}
      {showBlog && (
        <Section muted>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <SectionHeader
                title={dict.home.blogTitle}
                subtitle={dict.home.blogSubtitle}
              />
            </Reveal>
            <Reveal delay={100}>
              <Link
                href={localizePath(loc, "/blog")}
                className="more-link shrink-0 text-[15px]"
              >
                {dict.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100} className="h-full">
                <Link
                  href={localizePath(loc, `/blog/${post.slug}`)}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-soft">
                    {formatDate(post.date, loc)}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-brand transition-colors group-hover:text-link">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-soft">
                    {post.description}
                  </p>
                  <span className="more-link mt-4 text-sm">
                    {dict.blog.readMore}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="bg-brand">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/90">
              {dict.home.ctaSubtitle}
            </p>
            <Link
              href={localizePath(loc, "/contact")}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-base font-bold text-brand transition-all duration-200 hover:scale-105 hover:bg-brand-soft hover:shadow-[0_0.4rem_1.2rem_rgba(255,255,255,0.35)]"
            >
              {dict.home.ctaButton}
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
