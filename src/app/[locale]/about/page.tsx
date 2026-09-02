import { Award, Target, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n-config";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, Badge } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

// headline facts from the official group profile
const profileStats = [
  { value: "2005", labelKey: "founded" as const },
  { value: "38088万", labelKey: "capital" as const },
  { value: "20+", labelKey: "years" as const },
  { value: "160+", labelKey: "patents" as const },
];

const statLabels = {
  zh: { founded: "年成立", capital: "注册资金(元)", years: "年行业深耕", patents: "专利成果" },
  en: { founded: "founded", capital: "registered capital (RMB)", years: "years in the industry", patents: "patents granted" },
} as const;

function OrgNode({
  label,
  variant = "plain",
  className,
}: {
  label: string;
  /** root = solid navy (chart head), plain = white card (everyone else) */
  variant?: "root" | "plain";
  className?: string;
}) {
  return (
    <div
      className={`inline-flex min-h-11 max-w-full items-center justify-center rounded-md px-4 py-2 text-center text-sm font-bold leading-snug shadow-[0_2px_8px_rgba(0,37,101,0.10)] ${
        variant === "root" ? "bg-brand text-white" : "border border-line bg-surface text-brand"
      } ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

/** small vertical connector below a node */
function Stem() {
  return <div className="mx-auto h-5 w-px shrink-0 bg-brand/40" />;
}

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

      {/* Group profile */}
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

        {/* headline figures from the official group profile */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profileStats.map((stat, i) => (
            <Reveal key={stat.labelKey} delay={i * 80}>
              <div className="card p-6 text-center">
                <div className="text-3xl font-bold tracking-tight text-brand">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-ink-soft">
                  {statLabels[loc === "zh" ? "zh" : "en"][stat.labelKey]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Organization chart — real text so it follows locale switching */}
      <Section muted>
        <Reveal>
          <SectionHeader
            eyebrow={dict.brand.name}
            title={dict.org.title}
            subtitle={dict.org.intro}
            center
          />
        </Reveal>

        <Reveal delay={100} className="mt-12">
          {/* executive line — mirrors the official chart:
              board -> GM (assistant hangs off the GM) -> 3 VPs -> departments */}
          <div className="mx-auto max-w-5xl px-4">
            <div>
              <div className="text-center">
                <OrgNode label={dict.org.board} variant="root" />
                <Stem />
                <OrgNode label={dict.org.gm} variant="root" />
                <Stem />
              </div>
              {/* horizontal rail spanning the three VP columns */}
              <div className="mx-auto w-[83.33%] border-t border-brand/40" />
              <div className="grid grid-cols-3">
                {[0, 1, 2].map((col) => (
                  <div key={col} className="flex justify-center">
                    <Stem />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3">
                {/* VP 1: production, sales, tech, QC, equipment */}
                <div className="flex flex-col items-center gap-5 px-1">
                  <OrgNode label={dict.org.vp} />
                  <div className="flex max-w-52 flex-row flex-wrap items-stretch justify-center gap-2">
                    {dict.org.dept1.map((dept) => (
                      <OrgNode key={dept} label={dept} />
                    ))}
                  </div>
                </div>
                {/* VP 2: finance */}
                <div className="flex flex-col items-center gap-5 px-1">
                  <OrgNode label={dict.org.vp} />
                  <OrgNode label={dict.org.dept2[0]} />
                </div>
                {/* VP 3: group office + procurement. The GM assistant keeps a
                    mirrored ghost slot on the left so the VP stays centered
                    and the label never overflows the container. */}
                <div className="flex flex-col items-center gap-5 px-1">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    <span className="justify-self-end pr-2 text-right text-xs font-semibold whitespace-nowrap text-ink-soft">
                      {dict.org.gmAssistant} →
                    </span>
                    <OrgNode label={dict.org.vp} />
                    <span aria-hidden className="w-0" />
                  </div>
                  <div className="flex flex-row flex-wrap items-stretch justify-center gap-2">
                    {dict.org.dept3.map((dept) => (
                      <OrgNode key={dept} label={dept} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* party-mass line — same visual language as the executive line */}
          <div className="mx-auto mt-14 max-w-5xl px-4">
            <div>
              <div className="text-center">
                <OrgNode label={dict.org.party} variant="root" />
                <Stem />
              </div>
              {/* rail + stems, one column per organization; min-w-0 lets the
                  long English names wrap inside their column instead of
                  stretching the row into a horizontal scrollbar */}
              <div className="mx-auto w-[90%] border-t border-brand/40" />
              <div className="grid grid-flow-col auto-cols-fr">
                {dict.org.partyOrgs.map((org) => (
                  <div key={org} className="flex min-w-0 flex-col items-center px-1">
                    <Stem />
                    <OrgNode label={org} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
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

      {/* History — real milestones as a text timeline */}
      <Section>
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
