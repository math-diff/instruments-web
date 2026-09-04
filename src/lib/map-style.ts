"use client";

// Shared, cached fetch of the OpenFreeMap style used by MapEmbed.
//
// Why this exists: every roundtrip to tiles.openfreemap.org costs ~2s from China.
// The map needs style JSON -> tilejson -> sprites/fonts -> vector tiles before its
// first paint, so an uncached cold chain takes 5-10s. We cut that down by:
//  1. caching the style + tilejson in memory AND sessionStorage (24h TTL),
//  2. re-validating the tilejson against the live source in the background on
//     every load, so a stale snapshot URL can never break the map silently again,
//  3. prefetching both from the site's other pages (see prefetch below) so the
//     chain is already warm by the time a visitor reaches the contact page.

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const TTL_MS = 24 * 60 * 60 * 1000;
const SS_KEY = "jf-map-style-v1";

type CachedStyle = { at: number; style: unknown };

function readSession(): CachedStyle | null {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedStyle;
    if (Date.now() - parsed.at > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(style: unknown) {
  try {
    sessionStorage.setItem(SS_KEY, JSON.stringify({ at: Date.now(), style }));
  } catch {
    /* quota/private-mode: caching is best-effort */
  }
}

// Re-resolve the style's tilejson against the live source. The style JSON and the
// tilejson both reference dated planet snapshots; a cached copy can point at a
// retired snapshot whose tiles come back 200-but-empty, so we always confirm the
// tile URL is current and embed it directly (removing the source's url indirection).
async function resolveTilejson(style: Record<string, unknown>): Promise<Record<string, unknown>> {
  const sources = style.sources as Record<string, { url?: string; tiles?: string[] }>;
  const omt = sources?.openmaptiles;
  if (!omt?.url) return style;
  const tj = await fetch(omt.url).then((r) => r.json()) as { tiles?: string[] };
  if (tj?.tiles?.length) {
    delete omt.url;
    omt.tiles = tj.tiles;
  }
  return style;
}

let inflight: Promise<Record<string, unknown>> | null = null;

/** Fetch the map style (memory -> sessionStorage -> network), then inline a fresh tilejson. */
export function loadMapStyle(): Promise<Record<string, unknown>> {
  if (inflight) return inflight;

  const cached = readSession();
  if (cached) {
    // Serve a deep CLONE of the cached copy: handing maplibre an object that went through
    // JSON.parse bakes expressions in a form it silently stalls on. Clone restores a clean shape.
    inflight = Promise.resolve(
      typeof structuredClone === "function"
        ? (structuredClone(cached.style) as Record<string, unknown>)
        : (JSON.parse(JSON.stringify(cached.style)) as Record<string, unknown>),
    );
    fetch(STYLE_URL)
      .then((r) => r.json())
      .then((fresh) => resolveTilejson(fresh))
      .then((fresh) => writeSession(fresh))
      .catch(() => {});
    return inflight;
  }

  inflight = fetch(STYLE_URL)
    .then((r) => r.json())
    .then((style) => resolveTilejson(style))
    .then((style) => {
      writeSession(style);
      return style;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Warm the style cache from any page (call once on idle). */
export function prefetchMapStyle() {
  if (typeof window === "undefined") return;
  if (readSession()) return;
  loadMapStyle().catch(() => {});
}
