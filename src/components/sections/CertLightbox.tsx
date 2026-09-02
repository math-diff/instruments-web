"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { pick } from "@/lib/products";
import type { Certificate } from "@/lib/certs";
import type { Locale } from "@/lib/i18n-config";

/**
 * Fullscreen certificate viewer rendered through a portal into
 * document.body, so no ancestor overflow/transform can clip it.
 * Opens on card click; close via the × button, backdrop click or
 * Escape; arrows / ←→ keys switch certificates.
 */
export function CertLightbox({
  items,
  locale,
  index,
  onClose,
  onNavigate,
}: {
  items: Certificate[];
  locale: Locale;
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null;
  const count = items.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + dir + count) % count);
    },
    [index, count, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  // portal target only exists client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !open || index === null) return null;

  const cert = items[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={pick(cert.title, locale)}
      className="fixed inset-0 z-[100] flex flex-col bg-[rgba(0,26,77,0.92)] backdrop-blur-sm"
      onClick={onClose}
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-bold sm:text-base">{pick(cert.title, locale)}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">
            {index + 1} / {count}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* image area — min-h-0 lets the flex child shrink so tall
          certificates scale to fit the viewport instead of overflowing */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <button
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg transition-transform hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={cert.file}
          src={cert.file}
          alt={pick(cert.title, locale)}
          onClick={(e) => e.stopPropagation()}
          className="animate-fade-up max-h-full w-auto max-w-[min(90vw,900px)] rounded-lg bg-white object-contain shadow-[0_1rem_3rem_rgba(0,0,0,0.45)]"
        />

        <button
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg transition-transform hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
