import { Briefcase } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";

/**
 * Vertical timeline. Three of the roles run concurrently, so "Current" is a
 * badge rather than a position on the line — presenting overlapping roles as
 * a strict sequence would misrepresent the CV.
 */
export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've"
        accent="worked"
        description="Three of these overlap — the remote role, the studio role and freelance work run in parallel."
      />

      <div className="relative">
        {/* Spine */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-accent/60 via-cyan-accent/25 to-transparent md:left-[9px]"
        />

        <ol className="space-y-10 md:space-y-12">
          {experience.map((role, i) => (
            <li key={role.id} className="relative pl-8 md:pl-12">
              {/* Node */}
              <span
                aria-hidden
                className={
                  role.current
                    ? "absolute left-0 top-1.5 grid size-4 place-items-center rounded-full accent-gradient ring-4 ring-night md:size-5"
                    : "absolute left-0.5 top-2 size-3 rounded-full border border-edge-strong bg-night-panel md:left-1 md:size-3.5"
                }
              >
                {role.current && (
                  <span className="size-1.5 rounded-full bg-white" />
                )}
              </span>

              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
                    {role.title}
                  </h3>
                  {role.current && <Badge variant="signal">Current</Badge>}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[color-mix(in_oklab,var(--color-cyan-accent)_78%,white)]">
                    <Briefcase className="size-3.5" aria-hidden />
                    {role.company}
                  </span>
                  <span aria-hidden className="text-ink-faint">
                    ·
                  </span>
                  <span className="text-ink-faint">
                    {role.start} — {role.end}
                  </span>
                </div>

                <p className="mt-3 text-[0.9375rem] italic leading-relaxed text-ink-muted">
                  {role.summary}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-violet-bright/70"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
