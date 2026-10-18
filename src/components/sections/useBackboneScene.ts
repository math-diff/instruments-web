"use client";

import { useEffect, useRef, useState } from "react";

type BackboneController = {
  paused: boolean;
  initScene(): void;
  setColorPalette(palette: unknown, animate: boolean): void;
  setAnimationIndex(index: number, animate: boolean): void;
  resize(): void;
  cancelAnimations(): void;
  dispose(): void;
};

type BackboneLibrary = {
  Controller: new (canvas: HTMLCanvasElement) => BackboneController;
  palettes: Record<string, unknown>;
};

const SCRIPT_SRC = "/backbone/stripe-dataviz-original.js";
let libraryPromise: Promise<BackboneLibrary> | undefined;

function getLibrary() {
  return (window as Window & { StripeBackboneOriginal?: BackboneLibrary })
    .StripeBackboneOriginal;
}

function loadLibrary(): Promise<BackboneLibrary> {
  const ready = getLibrary();
  if (ready) return Promise.resolve(ready);
  if (libraryPromise) return libraryPromise;

  libraryPromise = new Promise<BackboneLibrary>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    const script = existing ?? document.createElement("script");
    const cleanup = () => {
      clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
    const onError = () => {
      cleanup();
      if (!existing) script.remove();
      reject(new Error("Backbone visualization unavailable"));
    };
    const onLoad = () => {
      const library = getLibrary();
      if (!library) return onError();
      cleanup();
      resolve(library);
    };
    const timeout = window.setTimeout(onError, 20_000);
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }).catch((error: unknown) => {
    libraryPromise = undefined;
    throw error;
  });
  return libraryPromise;
}

/** Owns the original four WebGL scenes; the surrounding UI stays independent. */
export function useBackboneScene(active: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<BackboneController | null>(null);
  const activeRef = useRef(active);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    activeRef.current = active;
    const controller = controllerRef.current;
    if (controller) controller.setAnimationIndex(active, !controller.paused);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;

    let cancelled = false;
    let inView = false;
    let nearViewport = false;
    let resizeFrame = 0;
    let generation = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const dispose = () => {
      const controller = controllerRef.current;
      controllerRef.current = null;
      if (controller) {
        controller.cancelAnimations();
        controller.paused = true;
        controller.dispose();
      }
    };
    const syncVisibility = () => {
      const controller = controllerRef.current;
      if (controller) controller.paused = document.hidden || !inView;
    };
    const initialize = async () => {
      const currentGeneration = ++generation;
      // Defer state updates out of the effect's synchronous setup.
      await Promise.resolve();
      if (cancelled || currentGeneration !== generation) return;
      if (motion.matches) {
        dispose();
        setFailed(true);
        return;
      }
      if (!nearViewport || document.hidden || controllerRef.current) return;
      try {
        const library = await loadLibrary();
        if (cancelled || currentGeneration !== generation) return;
        const controller = new library.Controller(canvas);
        controllerRef.current = controller;
        controller.setColorPalette(library.palettes.daytime, false);
        controller.initScene();
        controller.setAnimationIndex(activeRef.current, false);
        syncVisibility();
        setFailed(false);
      } catch {
        if (!cancelled && currentGeneration === generation) {
          dispose();
          setFailed(true);
        }
      }
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      ++generation;
      dispose();
      setFailed(true);
    };
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncVisibility();
    });
    // Download and create the original scene only when the section is nearby.
    // Actual visibility is tracked separately so offscreen scenes stay paused.
    const preload = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      nearViewport = true;
      preload.disconnect();
      void initialize();
    }, { rootMargin: "200px 0px" });
    const onVisibility = () => {
      syncVisibility();
      if (!document.hidden && !controllerRef.current) void initialize();
    };
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (scene.clientWidth && scene.clientHeight) controllerRef.current?.resize();
      });
    });

    intersection.observe(scene);
    preload.observe(scene);
    resize.observe(scene);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    motion.addEventListener("change", initialize);
    if (motion.matches) void initialize();

    return () => {
      cancelled = true;
      ++generation;
      cancelAnimationFrame(resizeFrame);
      intersection.disconnect();
      preload.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      motion.removeEventListener("change", initialize);
      dispose();
    };
  }, []);

  return { canvasRef, sceneRef, failed };
}
