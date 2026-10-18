import { notFound } from "next/navigation";
import { InstrumentTopicPage, instrumentTopicMetadata } from "@/components/sections/InstrumentTopic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  if ((await params).locale !== "en") notFound();
  return instrumentTopicMetadata("level");
}

export default async function LevelPage({ params }: Props) {
  if ((await params).locale !== "en") notFound();
  return <InstrumentTopicPage category="level" />;
}
