"use client";

import { ExternalLink, UserCog } from "lucide-react";
import {
  AppStoreIcon,
  GithubIcon,
  GooglePlayIcon,
} from "@/components/ui/brand-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ScreenshotCarousel } from "./screenshot-carousel";
import { VideoSlot } from "./video-slot";
import type { Project } from "@/data/projects";

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <div className="relative border-b border-edge px-6 pb-7 pt-8 md:px-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-55"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 20% 0%, color-mix(in oklab, var(--color-violet-accent) 32%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
              <span>{project.context}</span>
              <span aria-hidden>·</span>
              <span>{project.year}</span>
            </div>

            <DialogTitle className="pr-12 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
              {project.name}
            </DialogTitle>

            <DialogDescription className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              {project.pitch}
            </DialogDescription>

            {/* Store / repo links */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.links.appStore && (
                <ButtonLink
                  href={project.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gradient"
                  size="sm"
                >
                  <AppStoreIcon className="size-4" />
                  App Store
                </ButtonLink>
              )}
              {project.links.playStore && (
                <ButtonLink
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gradient"
                  size="sm"
                >
                  <GooglePlayIcon className="size-4" />
                  Google Play
                </ButtonLink>
              )}
              {project.links.live && (
                <ButtonLink
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="glass"
                  size="sm"
                >
                  <ExternalLink className="size-4" />
                  Live site
                </ButtonLink>
              )}
              {project.links.github && (
                <ButtonLink
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="glass"
                  size="sm"
                >
                  <GithubIcon className="size-4" />
                  Repository
                </ButtonLink>
              )}
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="border-b border-edge px-6 py-6 md:px-9">
          <ScreenshotCarousel
            shots={project.screenshots}
            size="md"
            note={project.screenshotNote}
          />
        </div>

        {/* Detail */}
        <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.6fr_1fr] md:px-9">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Overview
              </h3>
              <div className="space-y-3.5">
                {project.description.map((para, i) => (
                  <p key={i} className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Role — called out explicitly, per the brief */}
            <div className="rounded-2xl border border-violet-bright/22 bg-violet-accent/[0.07] p-5">
              <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-ink">
                <UserCog className="size-4 text-[color-mix(in_oklab,var(--color-violet-bright)_75%,white)]" />
                What I built
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                {project.role}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Outcomes
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[0.9375rem] text-ink-muted">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-signal"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/*
              Only rendered when there is footage. The old behaviour showed a
              dashed "Demo video coming soon" box on every project without a
              video — which meant seven of eight case studies displayed build
              instructions ("drop a file at /projects/<slug>/demo.mp4") to
              visitors. An absent section reads better than a promised one.
            */}
            {project.video && (
              <div>
                <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Demo
                </h3>
                <VideoSlot project={project} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge key={t} variant="default">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Platforms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.platforms.map((p) => (
                  <Badge key={p} variant="cyan">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
