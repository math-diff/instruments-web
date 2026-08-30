import Image from "next/image";
import { pick } from "@/lib/products";
import type { Certificate } from "@/lib/certs";
import type { Locale } from "@/lib/i18n-config";

function CertCard({ cert, locale }: { cert: Certificate; locale: Locale }) {
  return (
    <figure className="mr-5 w-60 shrink-0 sm:w-64">
      <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[0.8rem] border border-line bg-surface p-3">
        <Image
          src={cert.file}
          alt={pick(cert.title, locale)}
          fill
          sizes="280px"
          className="cert-img object-contain"
        />
      </div>
      <figcaption className="mt-3">
        <p className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-brand">
          {pick(cert.title, locale)}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Continuous left-scrolling marquee of certificates.
 * The item list is rendered twice; translating the track by -50% of its
 * width loops seamlessly. Hovering pauses the animation.
 */
export function CertScroller({
  items,
  locale,
}: {
  items: Certificate[];
  locale: Locale;
}) {
  return (
    <div className="cert-wall group relative overflow-hidden" aria-roledescription="carousel">
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent" />
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        <div className="flex" aria-hidden="false">
          {items.map((cert) => (
            <CertCard key={cert.file} cert={cert} locale={locale} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {items.map((cert) => (
            <CertCard key={`dup-${cert.file}`} cert={cert} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
