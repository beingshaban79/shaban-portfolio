"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";

/**
 * The single WebGL element on the page (hero only, per the design brief).
 *
 * Performance strategy, since this must not punish mid-range mobile:
 *  - One draw call. A single THREE.Points with a pre-baked BufferGeometry.
 *    No per-frame allocation, no per-particle objects.
 *  - Additive blending, depthWrite off — no sorting cost.
 *  - drei's PerformanceMonitor drops DPR when frame budget slips;
 *    AdaptiveDpr applies it. On a struggling device it degrades rather than janks.
 *  - Particle count scales with viewport, so phones render ~40% of desktop.
 *  - frameloop pauses when the hero scrolls out of view (see HeroCanvas below).
 *
 * The component is only ever mounted by <HeroBackdrop>, which gates it on
 * pointer type, reduced-motion and WebGL availability.
 */

const VIOLET = new THREE.Color("#6d5dfc");
const CYAN = new THREE.Color("#22d3ee");

/**
 * Deterministic PRNG (mulberry32).
 *
 * The cloud is built inside useMemo, which runs during render — and render has
 * to be pure, so Math.random() is out (react-hooks/purity flags it, and with
 * reactStrictMode React renders twice in dev, building two different clouds and
 * discarding one). A fixed seed keeps the same scattered look while making the
 * field reproducible run to run.
 */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleCloud({ count }: { count: number }) {
  const points = React.useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { geometry, material } = React.useMemo(() => {
    const rand = makeRandom(0x5eed_1234);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute on a flattened shell so it reads as depth, not a solid ball.
      const r = 3.6 + rand() * 2.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Colour ramp along the violet -> cyan axis: the site's one gradient,
      // expressed in 3D rather than introduced as a new palette.
      const t = Math.pow(rand(), 1.6);
      const c = VIOLET.clone().lerp(CYAN, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 0.5 + rand() * 0.9;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.032,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  // Dispose GPU resources on unmount — R3F does not do this for manually
  // constructed geometry/material.
  React.useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;

    // Slow constant drift, clamped delta so a dropped frame can't lurch it.
    const d = Math.min(delta, 0.05);
    p.rotation.y += d * 0.055;
    p.rotation.x += d * 0.017;

    // Parallax toward the pointer. state.pointer is normalised -1..1.
    const targetX = state.pointer.x * 0.16;
    const targetY = -state.pointer.y * 0.1;
    p.position.x += (targetX - p.position.x) * 0.035;
    p.position.y += (targetY - p.position.y) * 0.035;
  });

  const scale = Math.min(1, viewport.width / 9);

  return (
    <points ref={points} geometry={geometry} material={material} scale={scale} />
  );
}

export default function ParticleField() {
  const [dpr, setDpr] = React.useState(1.4);

  // Fewer particles on small viewports — measured once, no resize thrash.
  const count = React.useMemo(() => {
    if (typeof window === "undefined") return 2600;
    return window.innerWidth < 768 ? 1100 : 2600;
  }, []);

  return (
    <Canvas
      dpr={dpr}
      // Cap DPR hard: retina phones would otherwise render 3x for no gain here.
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 9], fov: 52 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <AdaptiveDpr pixelated={false} />
      <ParticleCloud count={count} />
      <Preload all />
    </Canvas>
  );
}
