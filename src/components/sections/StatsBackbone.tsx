"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const SCRIPT_SRC = "/backbone/stripe-dataviz-original.js";

type Controller = {
  setColorPalette: (palette: unknown, animate: boolean) => void;
  initScene: () => void;
  setAnimationIndex: (index: number, animate: boolean) => void;
  resize: () => void;
  paused: boolean;
};

type StripeBackboneGlobal = {
  Controller: new (canvas: HTMLCanvasElement) => Controller;
  palettes: Record<string, unknown>;
};

declare global {
  interface Window {
    StripeBackboneOriginal?: StripeBackboneGlobal;
  }
}

function loadScriptOnce(src: string): Promise<void> {
  if (document.querySelector(`script[src="${src}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

export function StatsBackbone({ stats }: { stats: Dictionary["home"]["stats"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    loadScriptOnce(SCRIPT_SRC)
      .then(() => {
        if (cancelled) return;
        const lib = window.StripeBackboneOriginal;
        if (!lib) throw new Error("StripeBackboneOriginal missing");
        const controller = new lib.Controller(canvas);
        controller.setColorPalette(lib.palettes.daytime, false);
        controller.initScene();
        controller.paused = false;
        controllerRef.current = controller;
      })
      .catch(() => {
        // WebGL / script unavailable: the section still works as plain stats
        section.classList.add("sb-error");
      });

    const onResize = () => controllerRef.current?.resize();
    const onVisibility = () => {
      if (controllerRef.current) controllerRef.current.paused = document.hidden;
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (controllerRef.current) controllerRef.current.paused = true;
    };
  }, []);

  const select = (index: number) => {
    setActive(index);
    sectionRef.current?.style.setProperty("--hover-index", String(index));
    controllerRef.current?.setAnimationIndex(index, true);
  };

  return (
    <section ref={sectionRef} className="sb-section" aria-label={stats.title}>
      <div className="sb-shell">
        <h2 className="sb-title">
          <span>{stats.title}</span>
        </h2>
        <div className="sb-menu" role="tablist" aria-label={stats.title}>
          {stats.items.map((item, index) => (
            <button
              key={item.copy}
              role="tab"
              aria-selected={index === active}
              className="sb-stat"
              onClick={() => select(index)}
              onMouseEnter={() =>
                sectionRef.current?.style.setProperty("--hover-index", String(index))
              }
              onMouseLeave={() =>
                sectionRef.current?.style.setProperty("--hover-index", String(active))
              }
            >
              <span className="sb-stat-value">{item.value}</span>
              <span className="sb-stat-copy">{item.copy}</span>
            </button>
          ))}
          <span className="sb-indicator" aria-hidden="true" />
        </div>
        <div className="sb-visual">
          <canvas ref={canvasRef} className="sb-canvas" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
