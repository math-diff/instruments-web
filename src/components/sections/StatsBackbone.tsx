"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Globe2, Activity, ShieldCheck, Layers3 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { useBackboneScene } from "./useBackboneScene";

const icons = [Globe2, Activity, ShieldCheck, Layers3];

/** A measurement dial frames the original particle scene without replacing it. */
function InstrumentDial({ active }: { active: number }) {
  return (
    <svg className="sb-dial" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <circle cx="300" cy="300" r="248" className="sb-dial-ring" />
      <circle cx="300" cy="300" r="213" className="sb-dial-inner" />
      {Array.from({ length: 80 }, (_, i) => (
        <line key={i} x1="300" y1="52" x2="300" y2={i % 5 === 0 ? 66 : 58}
          transform={`rotate(${i * 4.5} 300 300)`} className={i % 5 === 0 ? "sb-tick-major" : "sb-tick"} />
      ))}
      <g className="sb-dial-pointer" style={{ transform: `rotate(${active * 90 + 28}deg)` }}>
        <path d="M300 38 L295 27 L305 27 Z" fill="currentColor" />
        <path d="M300 80 V100" stroke="currentColor" />
      </g>
      <path d="M288 300 H312 M300 288 V312" className="sb-crosshair" />
    </svg>
  );
}

export function StatsBackbone({ stats }: { stats: Dictionary["home"]["stats"] }) {
  const [active, setActive] = useState(0);
  const { canvasRef, sceneRef, failed } = useBackboneScene(active);
  const panelId = useId();
  const current = stats.items[active];
  const ActiveIcon = icons[active % icons.length];

  return (
    <section className="sb-section" aria-label={stats.title}>
      <div className="sb-shell" data-active={active}>
        <div className="sb-topline" aria-hidden="true">
          <span><span className="sb-status-dot" /> JINGFENG / PRECISION IN MOTION</span>
          <span>01 — 04</span>
        </div>
        <div className="sb-stage" id={panelId}>
          <div className="sb-story">
            <div className="sb-eyebrow" aria-hidden="true">JF <span> / </span> {String(active + 1).padStart(2, "0")}</div>
            <h2 className="sb-title">{stats.title}</h2>
            <div className="sb-readout" key={active} aria-live="polite" aria-atomic="true">
              <span className="sb-main-value">{current.value}</span>
              <p className="sb-main-copy">{current.copy}</p>
            </div>
            <div className="sb-story-foot" aria-hidden="true">
              <ActiveIcon size={21} strokeWidth={1.25} />
              <span className="sb-signal-line" />
              <span>{String(active + 1).padStart(2, "0")} / {String(stats.items.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div ref={sceneRef} className={`sb-visual${failed ? " sb-fallback" : ""}`} aria-hidden="true">
            <div className="sb-grid" />
            <div className="sb-orb" />
            <canvas ref={canvasRef} className="sb-canvas" />
            <InstrumentDial active={active} />
            <span className="sb-coordinate sb-coordinate-top">JF / {String(active + 1).padStart(2, "0")}</span>
            <span className="sb-coordinate sb-coordinate-bottom">+ &nbsp; PRECISION / ∞</span>
            <div className="sb-waveform">
              {Array.from({ length: 36 }, (_, i) => <i key={i} style={{ height: `${8 + Math.sin(i * .52 + active) ** 2 * 24}px` }} />)}
            </div>
          </div>
        </div>
        <div className="sb-menu" role="group" aria-label={stats.title}>
          {stats.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <button key={item.copy} type="button" aria-pressed={index === active} aria-controls={panelId}
                className="sb-stat" onClick={() => setActive(index)}>
                <span className="sb-stat-top"><span>{String(index + 1).padStart(2, "0")}</span><Icon size={19} strokeWidth={1.4} aria-hidden="true" /></span>
                <span className="sb-stat-value">{item.value}<ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></span>
                <span className="sb-stat-copy">{item.copy}</span>
                <span className="sb-stat-track" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
