"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Cursor-follow spotlight on a glass panel.
 *
 * Pointer position is written straight to CSS custom properties via a ref —
 * no React state, so moving the mouse never triggers a re-render. The glow is
 * a single composited radial-gradient layer.
 *
 * Skipped entirely on touch devices (no hover to follow).
 */
export function SpotlightCard({
  children,
  className,
  contentClassName,
  glowOpacity = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  /**
   * Extra classes for the inner content wrapper.
   *
   * The wrapper exists to sit above the spotlight layer (z-1), and by default
   * it's a plain block sized to its content. That silently breaks any attempt
   * to make a child fill the card: when this component is a flex column, the
   * wrapper is a flex ITEM, and stretch in a column only applies across the
   * cross axis — so the wrapper stays content-height even in a taller card,
   * and an `h-full`/`flex-1` child inside it has nothing to grow into.
   *
   * Pass "flex flex-1 flex-col" here to make the wrapper participate, which is
   * what lets a card footer pin to the bottom. Left undefined the wrapper
   * behaves exactly as before, so existing usages are untouched.
   */
  contentClassName?: string;
  glowOpacity?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--glow", String(glowOpacity));
  }, [glowOpacity]);

  const onLeave = React.useCallback(() => {
    ref.current?.style.setProperty("--glow", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative overflow-hidden rounded-panel glass",
        "transition-colors duration-300 hover:border-edge-strong",
        className
      )}
      style={{ "--glow": 0 } as React.CSSProperties}
    >
      {/* spotlight layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--glow)",
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-violet-bright) 90%, transparent), transparent 65%)",
        }}
      />
      <div className={cn("relative z-1", contentClassName)}>{children}</div>
    </div>
  );
}
