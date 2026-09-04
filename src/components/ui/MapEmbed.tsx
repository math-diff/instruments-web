"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/lib/i18n-config";
import { loadMapStyle } from "@/lib/map-style";

// Chuzhou High-Tech Industrial Development Zone, west of Tianchang, Anhui
// (industrial land centroid along Tiankang Avenue; street-level address not in OSM)
const LAT = 32.6789;
const LON = 118.9431;

// English-label style: force every NAME label layer to prefer name:en, falling back
// to latin/international names instead of the local-language name. Layers whose
// text-field is not name-based (e.g. road shields rendering "ref") are left intact.
function anglicizeLabels(style: maplibregl.StyleSpecification) {
  for (const layer of style.layers) {
    const textField = (
      layer.layout as { "text-field"?: maplibregl.DataDrivenPropertyValueSpecification<string> }
        | undefined
    )?.["text-field"];
    if (!textField) continue;
    if (!JSON.stringify(textField).includes('"name')) continue;
    layer.layout = {
      ...layer.layout,
      "text-field": [
        "coalesce",
        ["get", "name:en"],
        ["get", "name:latin"],
        ["get", "name_en"],
        ["get", "name"],
      ] as maplibregl.DataDrivenPropertyValueSpecification<string>,
    };
  }
  return style;
}

export function MapEmbed({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: maplibregl.Map | undefined;
    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    loadMapStyle()
      .then(async (style) => {
        if (cancelled) return;
        map = new maplibregl.Map({
          container,
          style: anglicizeLabels(style as unknown as maplibregl.StyleSpecification),
          center: [LON, LAT],
          zoom: 12.5,
          // interactive:false disables drag/scroll (keeps page scrolling smooth);
          // we then re-enable zoom-only handlers below for touch exploration.
          interactive: false,
          attributionControl: { compact: true },
        });
        map.doubleClickZoom.enable();
        map.touchZoomRotate.enable();
        // maplibre defers tile fetching while the canvas has no laid-out size. The map
        // sits below the fold and inside an entrance animation, so its container can be
        // 0x0 at construction and *stay* unchanged afterward — a ResizeObserver alone
        // then never fires. Poll resize() (a no-op when size already matches) until the
        // map reports loaded.
        const tick = () => {
          if (cancelled) return;
          map?.resize();
          if (!map?.loaded()) resizeTimer = setTimeout(tick, 400);
        };
        const ro = new ResizeObserver(tick);
        ro.observe(container);
        tick();
        map.on("load", () => {
          if (cancelled || !map) return;
          ro.disconnect();
          clearTimeout(resizeTimer);
          setReady(true);
          map.addControl(new maplibregl.NavigationControl({ showCompass: false }));
          new maplibregl.Marker({ color: "#002565" })
            .setLngLat([LON, LAT])
            .addTo(map);
        });
      })
      .catch(() => {
        // fall back to the keyless OSM raster embed when the style is unreachable
        if (cancelled || !container) return;
        const d = 0.028;
        const iframe = document.createElement("iframe");
        iframe.title = "Jingfeng Group location map";
        iframe.loading = "lazy";
        iframe.className = "h-full w-full border-0";
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - d}%2C${LAT - d / 2}%2C${LON + d}%2C${LAT + d / 2}&layer=mapnik&marker=${LAT}%2C${LON}`;
        container.appendChild(iframe);
      });

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      map?.remove();
      container.replaceChildren();
    };
  }, []);

  const viewLabel =
    locale === "zh"
      ? "在 OpenStreetMap 中查看更大的地图"
      : "View larger map on OpenStreetMap";

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-line">
      <div className="relative h-64 w-full">
        <div
          ref={containerRef}
          className="h-64 w-full"
        />
        {!ready && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-surface-muted"
            role="status"
            aria-live="polite"
          >
            <span className="flex items-center gap-2 text-sm text-ink-soft">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              {locale === "zh" ? "地图加载中…" : "Loading map…"}
            </span>
          </div>
        )}
      </div>
      <a
        href={`https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=15/${LAT}/${LON}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-surface-muted px-4 py-2.5 text-center text-sm font-medium text-brand transition-colors hover:bg-brand-soft hover:text-link"
      >
        {viewLabel}
      </a>
    </div>
  );
}
