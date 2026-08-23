import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { certifications, education } from "@/data/experience";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Background"
        title="Education &"
        accent="certifications"
      />

      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <RevealItem key={item.id} className="h-full">
            <SpotlightCard className="flex h-full gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet-bright/25 bg-violet-accent/10">
                <GraduationCap
                  className="size-5 text-[color-mix(in_oklab,var(--color-violet-bright)_78%,white)]"
                  aria-hidden
                />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold leading-snug text-ink">
                  {item.degree}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">{item.institution}</p>
                <p className="mt-2 text-xs text-ink-faint">
                  {item.start} — {item.end}
                </p>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}

        {certifications.map((cert) => (
          <RevealItem key={cert.id} className="h-full">
            <SpotlightCard className="flex h-full gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-accent/25 bg-cyan-accent/10">
                <Award
                  className="size-5 text-[color-mix(in_oklab,var(--color-cyan-accent)_80%,white)]"
                  aria-hidden
                />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold leading-snug text-ink">
                  {cert.name}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">{cert.issuer}</p>
                <p className="mt-2 text-xs text-ink-faint">{cert.year}</p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[color-mix(in_oklab,var(--color-cyan-accent)_80%,white)] underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
                  >
                    View certificate
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
      {/*
        No empty-state note here. It used to read "add them to `certifications`
        in `src/data/experience.ts`" — a message to the site's author, rendered
        to every visitor. Same leak as the demo-video placeholder.
      */}
    </Section>
  );
}
