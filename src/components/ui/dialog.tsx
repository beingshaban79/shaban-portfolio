"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Radix dialog (the shadcn contract), re-skinned as a frosted panel.
 * Radix handles focus trap, scroll lock, Escape and aria wiring.
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-70 bg-black/72 backdrop-blur-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "motion-safe:transition-opacity motion-safe:duration-300"
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-80 w-[min(60rem,calc(100vw-1.5rem))]",
          "max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          "rounded-panel glass p-0 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]",
          "focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-edge bg-night/70 text-ink-muted backdrop-blur transition-colors hover:border-edge-strong hover:text-ink"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
