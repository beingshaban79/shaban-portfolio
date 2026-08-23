"use client";

import { ArrowUpRight, Smartphone } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { TiltCard } from "@/components/shared/tilt-card";
import { PhoneMockup } from "./phone-mockup";
import type { Project } from "@/data/projects";
import { projectNeedsContent } from "@/lib/utils";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const needsContent = projectNeedsContent(project);
  // The thumbnail is the first screenshot, so the splash leads both the card
  // and the case-study carousel.
  const cover = project.screenshots[0];

  return (
    <TiltCard className="h-full">
      <SpotlightCard
        className="flex h-full flex-col"
        // Without this the inner wrapper is content-height, so the body below
        // can't stretch and the footer floats wherever the content ends.
        contentClassName="flex flex-1 flex-col"
      >
        {/* Preview */}
        {/*
          The WHOLE device is shown here, not a crop.

          This used to render a large phone anchored to the top and clipped at
          the bottom. That worked while the thumbnail was a content screen, but
          the thumbnail is now the splash — and splash screens centre their logo
          vertically, so the logo landed exactly on the crop line and every card
          showed a brand mark sliced in half. A smaller, complete device is the
          only version that's correct for both.
        */}
        <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-t-panel border-b border-edge bg-[radial-gradient(ellipse_at_50%_115%,rgba(109,93,252,0.2),transparent_65%)]">
          <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
            <PhoneMockup
              src={cover?.src}
              alt={cover?.alt ?? `${project.name} preview`}
              size="xs"
              glow={false}
              note={cover ? undefined : project.screenshotNote}
            />
          </div>

          {project.featured && (
            <Badge variant="signal" className="absolute left-4 top-4">
              Featured
            </Badge>
          )}
          {needsContent && (
            <Badge variant="placeholder" className="absolute right-4 top-4">
              Needs content
            </Badge>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          {/*
            This wrapper is what keeps every "Case study" row on the same line
            across a grid row. The card already stretched to the tallest sibling,
            but the content stacked from the top and the footer just followed it
            — so a card with a longer pitch or a third row of tech tags pushed
            its footer lower than its neighbours'.

            flex-1 here makes the content block absorb the leftover height
            instead, so the footer below it lands at the bottom of every card.
            Nothing about the content's own spacing changes.
          */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2 text-xs text-ink-faint">
              <span>{project.context}</span>
              <span aria-hidden>·</span>
              <span>{project.year}</span>
            </div>

            <h3 className="font-display text-xl font-semibold leading-snug text-ink">
              {project.name}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
              {project.pitch}
            </p>

            {/* Platforms */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.platforms.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 rounded-md bg-white/[0.05] px-2 py-1 text-[0.6875rem] text-ink-muted"
                >
                  <Smartphone className="size-3" aria-hidden />
                  {p}
                </span>
              ))}
            </div>

            {/* Tech — capped at four plus an overflow count. */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <Badge key={t} variant="default">
                  {t}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge variant="default">+{project.tech.length - 4}</Badge>
              )}
            </div>
          </div>

          {/*
            Footer — pinned to the bottom by the flex-1 wrapper above.

            min-h fixes the row height so the "Case study" label lands on the
            same line whether or not the card also carries a Live badge. The
            badge is taller than the button, and items-center was centring the
            button against it, leaving a 3px discrepancy between cards.
          */}
          <div className="mt-6 flex min-h-[2.75rem] items-center justify-between border-t border-edge pt-4">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-[color-mix(in_oklab,var(--color-cyan-accent)_80%,white)]"
            >
              Case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="flex items-center gap-1">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="grid size-8 place-items-center rounded-full text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                >
                  <GithubIcon className="size-4" />
                </a>
              )}
              {/*
                A store link is proof enough on its own. `live` covers the case
                where the app is public but the listing URL isn't to hand, so
                shipped work isn't left looking unreleased.
              */}
              {(project.live ||
                project.links.appStore ||
                project.links.playStore) && <Badge variant="cyan">Live</Badge>}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}
