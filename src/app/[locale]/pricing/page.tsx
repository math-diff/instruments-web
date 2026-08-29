import Link from "next/link";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { tiers } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : (locale as Locale));
  return { title: dict.pricing.title, description: dict.pricing.subtitle };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const tierLabel: Record<string, string> = {
    essential: dict.pricing.tierBasic,
    standard: dict.pricing.tierStandard,
    premium: dict.pricing.tierPremium,
  };

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
            {dict.pricing.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            {dict.pricing.subtitle}
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`card flex flex-col p-8 ${
                tier.highlighted ? "ring-2 ring-brand" : ""
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-bold text-brand">
                {tierLabel[tier.id]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {tier.tagline[loc]}
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-ink">
                  {tier.priceFrom[loc]}
                </span>
                <span className="text-sm text-ink-soft"> / from</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features[loc].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-green"
                      strokeWidth={2.5}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={localizePath(loc, "/contact")}
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-brand text-white hover:bg-brand-strong"
                    : "border border-line bg-white text-ink hover:border-brand hover:text-brand"
                }`}
              >
                {dict.pricing.inquireButton}
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-surface-muted p-6 text-center">
          <p className="text-sm leading-6 text-ink-soft">
            {dict.pricing.inquireNote}
          </p>
        </div>
      </Section>
    </>
  );
}
