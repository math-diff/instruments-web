import { Award, Target, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n-config";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, Badge } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? (locale as Locale) : (locale as Locale));
  return { title: dict.about.title, description: dict.about.subtitle };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              {dict.about.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {dict.about.subtitle}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Story + Mission */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="h-full">
            <Card className="group h-full">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <TrendingUp className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-brand">
                {dict.about.storyTitle}
              </h2>
              <p className="mt-4 leading-7 text-ink-soft">{dict.about.story}</p>
            </Card>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Card className="group h-full">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <Target className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-brand">
                {dict.about.missionTitle}
              </h2>
              <p className="mt-4 leading-7 text-ink-soft">{dict.about.mission}</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Certifications */}
      <Section muted>
        <Reveal>
          <SectionHeader
            title={dict.about.certsTitle}
            center
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {dict.certs.map((cert, i) => (
            <Reveal key={cert} delay={i * 60}>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3">
                <Award className="h-5 w-5 text-brand" strokeWidth={1.5} />
                <span className="font-medium text-ink">{cert}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <Reveal>
          <SectionHeader title={dict.about.teamTitle} center />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.team.map((member, i) => (
            <Reveal key={member.name} delay={i * 90} className="h-full">
              <Card className="h-full text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-brand">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-brand">{member.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{member.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* History */}
      <Section muted>
        <Reveal>
          <SectionHeader title={dict.about.historyTitle} center />
        </Reveal>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative border-l-2 border-brand-soft">
            {dict.history.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <div className="relative mb-8 ml-6 last:mb-0">
                  <span className="absolute -left-[35px] top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-brand-soft" />
                  <div className="card p-5">
                    <Badge color="brand">{item.year}</Badge>
                    <p className="mt-2 text-ink">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
