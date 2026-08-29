import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localizePath, type Locale } from "@/lib/i18n-config";
import { categories } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : "en");
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const { locale } = await params;
  const { success } = await searchParams;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

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
              {success && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-line bg-green-50 p-5 text-accent-green">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <p className="font-medium">{dict.contact.formSuccess}</p>
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
                  redirectPath={localizePath(loc, "/contact")}
                />
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
                  icon={<Phone className="h-5 w-5" strokeWidth={1.5} />}
                  label={dict.contact.phoneLabel}
                  value={dict.footer.phone}
                  href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                />
                <InfoRow
                  icon={<Clock className="h-5 w-5" strokeWidth={1.5} />}
                  label={dict.contact.hoursLabel}
                  value={dict.contact.hoursValue}
                />
              </ul>

              <div className="mt-8 flex h-48 items-center justify-center rounded-xl border border-line bg-surface-muted text-sm text-ink-soft">
                Map placeholder
              </div>
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
