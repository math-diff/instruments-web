"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
  theme: "navy" | "steel" | "cyan";
};

const themeStyles: Record<HeroSlide["theme"], string> = {
  navy: "bg-[linear-gradient(110deg,#001a4d_0%,#002565_45%,#0a4da3_100%)]",
  steel:
    "bg-[linear-gradient(110deg,#01205c_0%,#16489a_55%,#3480cf_100%)]",
  cyan: "bg-[linear-gradient(110deg,#002565_0%,#013a80_50%,#2d6ec8_100%)]",
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [index, slides.length]);

  return (
    <section
      className="relative h-[26rem] overflow-hidden md:h-[30rem] lg:h-[34rem]"
      aria-roledescription="carousel"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          } ${themeStyles[slide.theme]}`}
          aria-hidden={i !== index}
        >
          {/* decorative ribbons, echoing the flowing WIKA banner lines */}
          <div className="absolute -right-40 -top-56 h-[46rem] w-[46rem] rounded-full border-[3rem] border-white/[0.08]" />
          <div className="absolute -bottom-72 -right-24 h-[52rem] w-[52rem] rounded-full border-[3rem] border-cyan/25" />
          <div className="absolute -left-32 -bottom-64 h-[36rem] w-[36rem] rounded-full border-[2.5rem] border-white/[0.06]" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 96px)",
            }}
          />

          {/* floating white caption card */}
          <div className="container-page relative flex h-full items-center">
            <div className="w-full max-w-[30rem] rounded-[0.8rem] bg-white p-7 shadow-[0_0.6rem_2.4rem_rgba(0,37,101,0.35)] sm:p-9 animate-fade-up">
              <h1 className="text-2xl font-bold leading-tight text-brand sm:text-[2rem] sm:leading-[1.2]">
                {slide.title}
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-ink-soft">
                {slide.text}
              </p>
              <Link
                href={slide.href}
                className="more-link mt-6 inline-flex h-11 items-center rounded-full border border-brand px-6 text-[15px] font-bold text-brand transition-colors hover:bg-brand-soft"
                tabIndex={i === index ? undefined : -1}
              >
                {slide.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-[0_2px_8px_rgba(0,37,101,0.25)] transition-colors hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-[0_2px_8px_rgba(0,37,101,0.25)] transition-colors hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
      </button>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-cyan" : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
