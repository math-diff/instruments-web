"use client";

import Image from "next/image";
import { useState } from "react";
import { pick } from "@/lib/products";
import type { Certificate } from "@/lib/certs";
import type { Locale } from "@/lib/i18n-config";
import { CertLightbox } from "./CertLightbox";

function CertCard({
  cert,
  locale,
  onOpen,
}: {
  cert: Certificate;
  locale: Locale;
  onOpen: () => void;
}) {
  return (
    <figure className="mr-3 w-40 shrink-0 sm:w-44">
      <button
        onClick={onOpen}
        aria-label={pick(cert.title, locale)}
        className="relative flex h-52 w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-[0.8rem] border border-line bg-surface p-3 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      >
        {/* unoptimized: tiny dev-infra cost, avoids slow 3840px optimizer
            requests that left cards blank during the marquee animation */}
        <Image
          src={cert.file}
          alt={pick(cert.title, locale)}
          width={176}
          height={208}
          className="cert-img h-full w-full object-contain"
          unoptimized
        />
      </button>
      <figcaption className="mt-3">
        <p className="line-clamp-2 min-h-10 text-xs font-bold leading-5 text-brand">
          {pick(cert.title, locale)}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Continuous left-scrolling marquee of certificates.
 * The item list is rendered twice; translating the track by -50% of its
 * width loops seamlessly. Hovering pauses the animation; clicking a card
 * opens a fullscreen viewer.
 */
export function CertScroller({
  items,
  locale,
}: {
  items: Certificate[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="cert-wall group relative overflow-hidden" aria-roledescription="carousel">
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent" />
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        <div className="flex" aria-hidden="false">
          {items.map((cert, i) => (
            <CertCard
              key={cert.file}
              cert={cert}
              locale={locale}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {items.map((cert, i) => (
            <CertCard
              key={`dup-${cert.file}`}
              cert={cert}
              locale={locale}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </div>

      <CertLightbox
        items={items}
        locale={locale}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
