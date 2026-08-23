"use client";

import {
  Code,
  Database,
  Link2,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  smartphone: Smartphone,
  server: Server,
  sparkles: Sparkles,
  wrench: Wrench,
  rocket: Rocket,
  code: Code,
  link: Link2,
  database: Database,
};

/**
 * Deliberately no percentage bars or star ratings — invented proficiency
 * numbers are the fastest way to lose a technical reader's trust. Instead the
 * headline capabilities in each group get the accent treatment, so the eye
 * lands on what matters without anything being fabricated.
 */
export function Skills() {
  const reduced = useReducedMotion();

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Stack"
        title="What I work"
        accent="with"
        description="Grouped by what it's for rather than by buzzword. Highlighted items are the ones I reach for most."
      />

      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <RevealItem key={group.id} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-violet-bright/25 bg-violet-accent/10">
                    <Icon
                      className="size-4.5 text-[color-mix(in_oklab,var(--color-violet-bright)_78%,white)]"
                      aria-hidden
                    />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {group.title}
                  </h3>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-ink-faint">
                  {group.blurb}
                </p>

                {/*
                  Tags animate in with their parent card (RevealItem), not each
                  on its own whileInView. Per-tag observers meant ~40 extra
                  IntersectionObservers, and any tag sitting below the fold when
                  its card entered view would stay invisible.
                */}
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const isPrimary = group.primary?.includes(item);
                    return (
                      <motion.li
                        key={item}
                        whileHover={reduced ? undefined : { y: -2 }}
                        transition={{ duration: 0.18 }}
                        className={cn(
                          "cursor-default rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors duration-200",
                          isPrimary
                            ? "border-violet-bright/35 bg-violet-accent/12 text-[color-mix(in_oklab,var(--color-violet-bright)_72%,white)] hover:border-violet-bright/60"
                            : "border-edge bg-white/[0.035] text-ink-muted hover:border-edge-strong hover:text-ink"
                        )}
                      >
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
