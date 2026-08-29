import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { products, categories, type Category } from "@/lib/products";
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
  return { title: dict.products.title, description: dict.products.subtitle };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { cat, q } = await searchParams;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const activeCat = (categories as readonly string[]).includes(cat ?? "")
    ? (cat as Category)
    : null;
  const query = (q ?? "").trim().toLowerCase();
  const list = products
    .filter((p) => (activeCat ? p.category === activeCat : true))
    .filter((p) => {
      if (!query) return true;
      const haystack = [
        p.name[loc],
        p.summary[loc],
        p.model,
        ...p.highlights[loc],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });

  const tabs: { key: Category | "all"; label: string; href: string }[] = [
    { key: "all", label: dict.products.filterAll, href: localizePath(loc, "/products") },
    ...categories.map((c) => ({
      key: c,
      label: dict.categories[c].name,
      href: localizePath(loc, `/products?cat=${c}`),
    })),
  ];

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              {dict.products.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {dict.products.subtitle}
            </p>
            {query && (
              <p className="mt-4 text-base text-ink">
                “{q?.trim()}” — {list.length}{" "}
                {loc === "zh" ? "个结果" : "result(s)"}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      <Section>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => {
              const isActive =
                (tab.key === "all" && !activeCat) || tab.key === activeCat;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white text-ink-soft hover:border-brand hover:text-brand"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{dict.products.empty}</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90} className="h-full">
                <Link
                  href={localizePath(loc, `/products/${p.slug}`)}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative h-60 border-b border-line bg-surface">
                    <Image
                      src={p.image}
                      alt={p.name[loc]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge color="brand">{p.model}</Badge>
                      <Badge color="neutral">
                        {dict.categories[p.category].name}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-brand">
                      {p.name[loc]}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                      {p.summary[loc]}
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
        )}
      </Section>
    </>
  );
}
