import { Clock, Globe, MapPin, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { profile } from "@/data/profile";

export function About() {
  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    { icon: Clock, label: "Timezone", value: profile.timezone },
    { icon: Globe, label: "Languages", value: profile.languages.join(", ") },
    {
      icon: Sparkles,
      label: "Status",
      value: profile.availability.label,
      signal: profile.availability.open,
    },
  ];

  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Mobile is the whole"
        accent="job, not a layer"
      />

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {profile.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-[1.75] text-ink-muted md:text-[1.0625rem]">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <p className="text-base leading-[1.75] text-ink-muted md:text-[1.0625rem]">
              Right now I&apos;m looking for a team where mobile is the product,
              not an afterthought — somewhere I can own features end to end and
              keep getting better at the craft.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SpotlightCard className="p-6">
            {/*
              A <ul> rather than a <dl>. The design puts an icon beside a
              label/value pair, which needs wrapper elements — but HTML allows
              only dl > div > dt/dd, with nothing else inside that div. The
              original markup nested two divs and an icon span inside the <dl>,
              which is invalid and failed axe's definition-list and dlitem rules.
            */}
            <ul className="space-y-5">
              {facts.map(({ icon: Icon, label, value, signal }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-edge bg-white/[0.04]">
                    <Icon
                      className={
                        signal
                          ? "size-4 text-signal"
                          : "size-4 text-[color-mix(in_oklab,var(--color-violet-bright)_75%,white)]"
                      }
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.14em] text-ink-faint">
                      {label}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium text-ink">
                      {value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
