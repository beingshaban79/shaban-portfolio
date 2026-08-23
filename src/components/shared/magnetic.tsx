"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic hover — the element drifts a few pixels toward the cursor.
 * Range is small on purpose: a button that runs away from the pointer is a
 * usability bug dressed up as delight.
 */
export function Magnetic({
  children,
  strength = 0.28,
  radius = 12,
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 22 });

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-radius, Math.min(radius, dx * strength)));
    y.set(Math.max(-radius, Math.min(radius, dy * strength)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return <span className="inline-flex">{children}</span>;

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
