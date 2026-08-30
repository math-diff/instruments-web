"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { localeMeta, locales, type Locale } from "@/lib/i18n-config";

export function LangSwitch({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function switchTo(target: Locale) {
    setOpen(false);
    if (target === current) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    window.location.assign("/" + segments.join("/"));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Language"
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-ink transition-colors hover:border-brand hover:text-brand"
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline">{localeMeta[current].native}</span>
        <span className="sm:hidden">{localeMeta[current].short}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full z-[60] mt-2 max-h-80 w-48 overflow-y-auto rounded-[0.8rem] border border-line bg-surface py-1.5 shadow-[0_0.6rem_2rem_rgba(0,37,101,0.18)]"
        >
          {locales.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === current}
              onClick={() => switchTo(l)}
              className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-sm transition-colors hover:bg-surface-muted ${
                l === current ? "font-bold text-brand" : "text-ink"
              }`}
            >
              <span dir="auto">{localeMeta[l].native}</span>
              <span className="text-xs font-semibold text-ink-soft">
                {localeMeta[l].short}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
