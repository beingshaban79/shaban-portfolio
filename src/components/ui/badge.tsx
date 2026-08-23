import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-edge bg-white/[0.04] text-ink-muted",
        accent:
          "border-violet-bright/35 bg-violet-accent/12 text-[color-mix(in_oklab,var(--color-violet-bright)_70%,white)]",
        cyan: "border-cyan-accent/35 bg-cyan-accent/10 text-[color-mix(in_oklab,var(--color-cyan-accent)_75%,white)]",
        /** Reserved for live/available/metric — the third colour, used sparingly. */
        signal:
          "border-signal/40 bg-signal/12 text-[color-mix(in_oklab,var(--color-signal)_80%,white)]",
        /** Marks unfilled content so gaps are obvious in-page. */
        placeholder:
          "border-dashed border-amber-400/40 bg-amber-400/[0.07] text-amber-300/90",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
