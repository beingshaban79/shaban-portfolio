"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt toward the cursor, plus a cursor-follow sheen.
 *
 * Kept deliberately shallow (7deg max) — enough to feel physical, not enough
 * to make text hard to read mid-hover. Springs are stiff so it settles fast.
 * Disabled for touch input and for prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 260, damping: 24, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--sx", `${nx * 100}%`);
    el.style.setProperty("--sy", `${ny * 100}%`);
    el.style.setProperty("--sheen", "0.14");
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    ref.current?.style.setProperty("--sheen", "0");
  };

  if (reduced) {
    return (
      <div className={cn("rounded-panel", className)}>{children}</div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        "--sheen": 0,
      } as React.CSSProperties}
      className={cn("relative rounded-panel will-change-transform", className)}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-panel transition-opacity duration-300"
        style={{
          opacity: "var(--sheen)",
          background:
            "radial-gradient(500px circle at var(--sx,50%) var(--sy,50%), rgba(255,255,255,0.9), transparent 55%)",
          mixBlendMode: "soft-light",
        }}
      />
    </motion.div>
  );
}
