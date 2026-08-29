"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

export function ProductImageViewer({
  src,
  alt,
  zoomLabel,
  closeLabel,
}: {
  src: string;
  alt: string;
  zoomLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${zoomLabel}: ${alt}`}
        className="group relative block h-72 w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 sm:h-80"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
        <span className="absolute bottom-4 right-4 inline-flex h-9 items-center gap-2 rounded-full bg-brand/90 px-3 text-xs font-bold text-white shadow-float backdrop-blur-sm transition-transform duration-200 group-hover:-translate-y-0.5">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{zoomLabel}</span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-strong/95 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label={closeLabel}
              title={closeLabel}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan sm:right-6 sm:top-6"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              className="relative h-full max-h-[calc(100vh-5rem)] w-full max-w-7xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
