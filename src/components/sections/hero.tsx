"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { Magnetic } from "@/components/shared/magnetic";
import { profile } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";

const word = {
  hidden: { opacity: 0, y: "0.5em" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const headlineWords = profile.headline.split(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <HeroBackdrop />

      <div className="section-shell relative z-10">
        <div className="max-w-4xl">
          {/* Availability + location */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            {profile.availability.open && (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-signal/30 bg-signal/[0.08] px-3.5 py-1.5 text-xs font-medium text-[color-mix(in_oklab,var(--color-signal)_82%,white)]">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 rounded-full bg-signal motion-safe:animate-pulse-ring" />
                  <span className="size-2 rounded-full bg-signal" />
                </span>
                {profile.availability.label}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
              <MapPin className="size-3.5" />
              {profile.location}
            </span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-5 font-display text-sm font-medium uppercase tracking-[0.3em] text-ink-muted"
          >
            {profile.name}
          </motion.p>

          {/* Headline — word-by-word entrance */}
          <h1 className="font-display text-[clamp(2.5rem,8vw,5.25rem)] font-semibold leading-[0.98]">
            {headlineWords.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                custom={i}
                variants={reduced ? undefined : word}
                initial={reduced ? undefined : "hidden"}
                animate={reduced ? undefined : "show"}
                className="inline-block will-change-transform"
              >
                {/* last word carries the gradient */}
                {i === headlineWords.length - 1 ? (
                  <span className="text-gradient">{w}</span>
                ) : (
                  w
                )}
                {i < headlineWords.length - 1 && " "}
              </motion.span>
            ))}
          </h1>

          {/* Role line */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-7 font-display text-lg font-medium text-ink sm:text-xl"
          >
            {profile.role}{" "}
            <span className="text-ink-faint">·</span>{" "}
            <span className="text-gradient">{profile.specialism}</span>
          </motion.p>

          {/* Pitch */}
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {profile.pitch}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink href="#projects" variant="gradient" size="lg">
                View Projects
                <ArrowDown className="size-4" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={profile.links.resume}
                download
                variant="glass"
                size="lg"
              >
                <Download className="size-4" />
                Download Resume
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="#contact" variant="outline" size="lg">
                <Mail className="size-4" />
                Contact Me
              </ButtonLink>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="relative pl-4">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-8 w-px accent-gradient"
                />
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className={
                      isPlaceholder(s.value)
                        ? "font-display text-base font-medium text-amber-300/90"
                        : "font-display text-3xl font-semibold text-ink"
                    }
                  >
                    {s.value}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-ink-faint">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-11 w-6.5 items-start justify-center rounded-full border border-edge-strong p-1.5">
          <motion.span
            animate={reduced ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-gradient-to-b from-violet-bright to-cyan-accent"
          />
        </span>
      </motion.a>
    </section>
  );
}
