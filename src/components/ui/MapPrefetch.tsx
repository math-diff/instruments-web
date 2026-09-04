"use client";

import { useEffect } from "react";
import { prefetchMapStyle } from "@/lib/map-style";

/**
 * Warms the OpenFreeMap style cache (memory + sessionStorage) while the visitor
 * browses any page, so the contact-page map paints in ~1s instead of 5-10s.
 */
export function MapPrefetch() {
  useEffect(() => {
    const warm = () => prefetchMapStyle();
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(warm, { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(warm, 2000);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
