import { notFound } from "next/navigation";
import { InstrumentTopicPage, instrumentTopicMetadata } from "@/components/sections/InstrumentTopic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  if ((await params).locale !== "en") notFound();
  return instrumentTopicMetadata("temperature");
}

export default async function TemperaturePage({ params }: Props) {
  if ((await params).locale !== "en") notFound();
  return <InstrumentTopicPage category="temperature" />;
}
