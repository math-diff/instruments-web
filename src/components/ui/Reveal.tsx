"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fade-up reveal on first scroll into view.
 * Wraps children in a div that starts translated/transparent and
 * transitions to place once the IntersectionObserver fires.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // reveal when entering the viewport — or when already scrolled past
          // (e.g. jump links / fast scrollbar drags)
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
