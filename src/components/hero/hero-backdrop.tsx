"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

/**
 * Decides whether the hero gets WebGL at all, and renders the CSS layers
 * that sit behind it either way.
 *
 * The 3D field is a bonus, never a dependency: the gradient mesh + grid below
 * are the actual designed background. If WebGL is unavailable, the device is
 * small, or the user asked for reduced motion, the page loses nothing.
 */

const ParticleField = dynamic(() => import("./particle-field"), {
  ssr: false,
  loading: () => null,
});

function useCanRender3D() {
  const reduced = useReducedMotion();
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    if (reduced) return;

    // Skip on narrow viewports — the mesh alone looks better there and costs
    // nothing on a phone battery.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Respect the data-saver hint if the browser exposes it.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    // Confirm WebGL actually works before mounting a Canvas.
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    // Defer past first paint so the hero text is never blocked by three.js.
    const id = window.setTimeout(() => setOk(true), 260);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return ok;
}

export function HeroBackdrop() {
  const canRender3D = useCanRender3D();
  const [inView, setInView] = React.useState(true);
  const sentinel = React.useRef<HTMLDivElement>(null);

  // Unmount the Canvas once the hero is well off screen — no GPU work is
  // spent animating something nobody can see.
  React.useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sentinel} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Gradient mesh — two soft blooms in the accent colours. */}
      <div
        aria-hidden
        className="absolute -left-[18%] -top-[28%] size-[46rem] rounded-full opacity-45 blur-[110px] motion-safe:animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-violet-accent) 62%, transparent), transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-[14%] top-[8%] size-[36rem] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-cyan-accent) 52%, transparent), transparent 70%)",
        }}
      />

      {/* Engineering grid, faded out toward the edges with a radial mask. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage:
            "radial-gradient(ellipse 75% 62% at 50% 42%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 62% at 50% 42%, #000 35%, transparent 78%)",
        }}
      />

      {/* WebGL layer, if the device earned it. */}
      {canRender3D && inView && (
        <div className="absolute inset-0 opacity-60">
          <ParticleField />
        </div>
      )}

      {/*
        Scrim over the backdrop, dark on the left where the copy sits and clear
        on the right. Without it the particle field sits on top of the body text
        and measurably hurts legibility — the field is decoration, so it yields.
      */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg, var(--color-night) 0%, color-mix(in oklab, var(--color-night) 82%, transparent) 34%, color-mix(in oklab, var(--color-night) 45%, transparent) 58%, transparent 78%)",
        }}
      />

      {/* Bottom fade so the hero dissolves into the next section. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
    </div>
  );
}
