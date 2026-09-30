import { pageAlternates, pageUrl } from "@/lib/seo";
import { Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { categories, getProduct, pick } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : "en");
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: pageAlternates(isLocale(locale) ? locale : "en", "/contact"),
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ submitted?: string; product?: string | string[]; source?: string }>;
}) {
  const { locale } = await params;
  const { submitted, product: requestedProduct, source } = await searchParams;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const product = typeof requestedProduct === "string" ? getProduct(requestedProduct) : undefined;

  const productOptions = [
    "—",
    ...categories.map((c) => dict.categories[c].name),
  ];

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {dict.contact.subtitle}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="lg:col-span-3">
              {submitted === "1" && (
                <div className="mb-6 rounded-xl border border-line bg-surface-muted p-5">
                  <p>{loc === "zh" ? "您已返回联系页面。此页面无法确认邮件是否送达，如需跟进，请通过下方邮箱联系我们。" : "You have returned to the contact page. Delivery cannot be confirmed here; please email us if you need to follow up."}</p>
                </div>
              )}
              <Card>
                <ContactForm
                  labels={{
                    name: dict.contact.formName,
                    company: dict.contact.formCompany,
                    email: dict.contact.formEmail,
                    phone: dict.contact.formPhone,
                    product: dict.contact.formProduct,
                    message: dict.contact.formMessage,
                    submit: dict.contact.formSubmit,
                  }}
                  productOptions={productOptions}
                  selectedProduct={product ? {
                    slug: product.slug, model: product.model, name: pick(product.name, loc),
                    category: dict.categories[product.category].name,
                    sourcePage: loc === "en" && source === "pressure-gauges"
                      ? pageUrl("en", "/pressure-gauges")
                      : pageUrl(loc, `/products/${product.slug}`),
                  } : undefined}
                  redirectPath={localizePath(loc, "/contact")}
                />
                <p className="mt-4 text-xs leading-6 text-ink-soft">{loc === "zh" ? "询盘将通过 Web3Forms 发送。请仅填写选型与报价所需信息。" : "Your inquiry is sent through Web3Forms. Include only the information needed for selection and quotation."} <a href={localizePath(loc, "/privacy")} className="underline">{loc === "zh" ? "隐私说明" : "Privacy notice"}</a></p>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-brand">
                {dict.contact.infoTitle}
              </h2>
              <ul className="mt-6 space-y-5">
                <InfoRow
                  icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />}
                  label={dict.contact.addressLabel}
                  value={dict.footer.address}
                />
                <InfoRow
                  icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
                  label={dict.contact.emailLabel}
                  value={dict.footer.email}
                  href={`mailto:${dict.footer.email}`}
                />
                <InfoRow
                  icon={<Clock className="h-5 w-5" strokeWidth={1.5} />}
                  label={dict.contact.hoursLabel}
                  value={dict.contact.hoursValue}
                />
              </ul>

              <MapEmbed locale={locale as Locale} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const valueEl = href ? (
    <a href={href} className="font-medium text-ink hover:text-brand">
      {value}
    </a>
  ) : (
    <span className="font-medium text-ink">{value}</span>
  );
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-ink-soft">{label}</p>
        <p className="mt-0.5 text-sm">{valueEl}</p>
      </div>
    </li>
  );
}
