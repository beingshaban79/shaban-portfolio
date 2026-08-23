import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-edge bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-violet-bright/50 focus:bg-white/[0.05] focus:outline-none focus-visible:outline-none disabled:opacity-50";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(field, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(field, "min-h-32 resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-ink-muted", className)}
      {...props}
    />
  );
}
