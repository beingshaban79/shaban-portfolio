import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      /*
        No scroll-margin here. The section's own py-24/md:py-32 already puts
        96–128px between the box top and the heading, which is more than enough
        to clear the nav — adding scroll-mt-24 on top double-counted it and
        landed the heading well below the fold. <SmoothAnchors> measures the
        inner .section-shell and the real nav height for the precise offset.
      */
      className={cn("relative py-24 md:py-32", className)}
    >
      <div className="section-shell">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  /** Trailing words of the title that take the accent gradient. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-2xl md:mb-18",
        align === "center" && "mx-auto text-center"
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 accent-gradient" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-[2.75rem]">
        {title}
        {accent && <> <span className="text-gradient">{accent}</span></>}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
