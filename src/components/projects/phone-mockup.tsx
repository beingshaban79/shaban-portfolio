import Image from "next/image";
import { ImageOff, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modern Android phone frame (Pixel / Galaxy flagship shape), pure CSS.
 *
 * WHY ANDROID, NOT iPHONE:
 * The screenshots are Android captures at 1080×2412. An iPhone frame put a wide
 * Dynamic Island pill across the top of the image, which landed directly on the
 * screenshot's own status bar — two competing status bars, and the clock and
 * signal icons half-covered. An Android frame matches the source material: a
 * small centred punch-hole camera sits in the empty middle of the status bar,
 * exactly where the real hardware cutout falls.
 *
 * The aspect ratio is 2412/1080, taken from the actual screenshots, so images
 * fit the screen exactly with no crop and no letterboxing.
 *
 * Structure: metal rail (gradient border) → thin uniform bezel → screen.
 * Android bezels are symmetric, unlike the iPhone's slightly thicker chin, so
 * the padding is even on all sides. Power and volume both sit on the right,
 * which is where they are on Pixel and Galaxy.
 *
 * One `size` prop drives all geometry, so every gallery across every project
 * shares identical proportions.
 */

const SIZES = {
  /** Card thumbnails: small enough that the whole device fits, uncropped. */
  xs: { w: 132, r: "1.15rem", hole: 5 },
  sm: { w: 188, r: "1.6rem", hole: 7 },
  md: { w: 244, r: "2rem", hole: 9 },
  lg: { w: 300, r: "2.4rem", hole: 11 },
} as const;

export type PhoneSize = keyof typeof SIZES;

/** Native aspect ratio of the source screenshots. */
const ASPECT = 2412 / 1080;

export function PhoneMockup({
  src,
  alt,
  size = "md",
  priority = false,
  glow = true,
  note,
  className,
}: {
  src?: string;
  alt: string;
  size?: PhoneSize;
  priority?: boolean;
  glow?: boolean;
  /**
   * Replaces the default "Screenshot coming soon" text on an empty frame.
   * Some apps can't be captured at all — a private messenger sets FLAG_SECURE,
   * so "coming soon" would be a promise that never lands. Pass the real reason.
   */
  note?: string;
  className?: string;
}) {
  const s = SIZES[size];
  const height = Math.round(s.w * ASPECT);

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: s.w }}>
      {/* Ambient accent glow behind the device */}
      {glow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-1 h-[85%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[46px]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-violet-accent) 70%, transparent), color-mix(in oklab, var(--color-cyan-accent) 55%, transparent))",
          }}
        />
      )}

      {/* Aluminium rail */}
      <div
        className="relative p-[2px] shadow-[0_26px_60px_-22px_rgba(0,0,0,0.9)]"
        style={{
          width: s.w,
          height,
          borderRadius: s.r,
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.10) 20%, rgba(255,255,255,0.04) 52%, rgba(255,255,255,0.16) 78%, rgba(255,255,255,0.34) 100%)",
        }}
      >
        {/* Bezel — even on all four sides */}
        <div
          className="relative size-full overflow-hidden bg-[#040407]"
          style={{ borderRadius: `calc(${s.r} - 2px)`, padding: "2.5px" }}
        >
          {/* Screen */}
          <div
            className="relative size-full overflow-hidden bg-night-panel"
            style={{ borderRadius: `calc(${s.r} - 4.5px)` }}
          >
            {src ? (
              <Image
                src={src}
                alt={alt}
                fill
                sizes={`${s.w}px`}
                priority={priority}
                loading={priority ? undefined : "lazy"}
                className="object-cover object-top"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_45%,rgba(109,93,252,0.16),transparent_65%)] px-3 text-center">
                {note ? (
                  <ShieldOff className="size-4 text-ink-faint" aria-hidden />
                ) : (
                  <ImageOff className="size-4 text-ink-faint" aria-hidden />
                )}
                <span className="text-[0.625rem] leading-snug text-ink-faint">
                  {note ?? (
                    <>
                      Screenshot
                      <br />
                      coming soon
                    </>
                  )}
                </span>
              </div>
            )}

            {/* Screen sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(118deg, rgba(255,255,255,0.11) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.045) 100%)",
              }}
            />

            {/*
              Punch-hole camera. Centred, so it sits in the gap between the
              screenshot's clock (left) and its signal/battery icons (right)
              instead of covering either.
            */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{
                width: s.hole,
                height: s.hole,
                top: Math.round(height * 0.0155),
              }}
            >
              <span
                className="absolute inset-[22%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #1b2434 0%, #070b12 70%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Side buttons — Pixel/Galaxy put both on the right. Heights are a
            fraction of the device so they stay in proportion at every size. */}
        <span
          aria-hidden
          className="absolute -right-[1.5px] w-[2px] rounded-r-sm bg-gradient-to-b from-white/38 to-white/12"
          style={{ top: "19%", height: Math.round(height * 0.085) }}
        />
        <span
          aria-hidden
          className="absolute -right-[1.5px] w-[2px] rounded-r-sm bg-gradient-to-b from-white/32 to-white/10"
          style={{ top: "29%", height: Math.round(height * 0.13) }}
        />
      </div>

      {/* Floor reflection */}
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-3 h-6 rounded-[50%] bg-black/55 blur-lg"
      />
    </div>
  );
}
