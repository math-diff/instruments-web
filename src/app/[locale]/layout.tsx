import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import {
  isLocale,
  locales,
  localeMeta,
  defaultLocale,
  type Locale,
} from "@/lib/i18n-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : defaultLocale);
  return {
    title: {
      default: `${dict.brand.name} — ${dict.brand.tagline}`,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.home.heroSubtitle,
    metadataBase: new URL(SITE_URL),
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
    openGraph: {
      title: `${dict.brand.name} — ${dict.brand.tagline}`,
      description: dict.home.heroSubtitle,
      siteName: dict.brand.name,
      locale:
        locale === "zh"
          ? "zh_CN"
          : locale === "ar"
            ? "ar_AE"
            : locale === "hi"
              ? "hi_IN"
              : locale === "ms"
                ? "ms_MY"
                : locale === "ru"
                  ? "ru_RU"
                  : locale === "tr"
                    ? "tr_TR"
                    : locale === "sv"
                      ? "sv_SE"
                      : locale === "sk"
                        ? "sk_SK"
                        : locale === "de"
                          ? "de_DE"
                          : locale === "fr"
                            ? "fr_FR"
                            : locale === "it"
                              ? "it_IT"
                              : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const dict = await getDictionary(currentLocale);

  return (
    <html
      lang={currentLocale}
      dir={localeMeta[currentLocale].dir}
      data-scroll-behavior="smooth"
      className={`${notoSC.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "Organization",
          "@id": `${SITE_URL}/#organization`, name: dict.brand.name,
          legalName: dict.brand.full, url: `${SITE_URL}/${currentLocale}`,
          email: dict.footer.email, address: dict.footer.address,
        }} />
        <Header
          locale={currentLocale}
          nav={dict.nav}
          brandName={dict.brand.name}
          quoteLabel={dict.nav.getQuote}
          contactLabel={dict.nav.contact}
          searchPlaceholder={dict.common.searchPlaceholder}
        />
        <main className="flex-1">{children}</main>
        <Footer locale={currentLocale} dict={dict} />
        <AnalyticsConsent locale={currentLocale} productSlugs={products.map((product) => product.slug)} />
      </body>
    </html>
  );
}
