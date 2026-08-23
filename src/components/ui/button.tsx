"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button as the base contract, fully re-skinned for this theme.
 * `gradient` is the primary CTA; `glass` is the secondary; `ghost` for nav.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-45 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        gradient:
          "accent-gradient text-white shadow-[0_8px_30px_-8px_rgba(109,93,252,0.7)] hover:shadow-[0_12px_44px_-8px_rgba(109,93,252,0.9)] hover:brightness-110 active:brightness-95",
        glass:
          "glass text-ink hover:border-edge-strong hover:bg-white/[0.07] active:bg-white/[0.04]",
        outline:
          "border border-edge-strong bg-transparent text-ink hover:border-violet-bright/60 hover:bg-violet-accent/10",
        ghost:
          "bg-transparent text-ink-muted hover:bg-white/[0.05] hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-[0.9375rem] [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-[1.125rem]",
        icon: "size-10 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
ButtonLink.displayName = "ButtonLink";

export { buttonVariants };
