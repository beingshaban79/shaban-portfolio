import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when the string still holds an unfilled content placeholder. */
export function isPlaceholder(value: string) {
  return value.includes("[ADD") || value.includes("[YEAR]");
}

/**
 * True when any user-facing field on a project still holds an unfilled
 * placeholder. Checking only the name missed entries that have a real title but
 * a "[ADD COMPANY OR CLIENT]" context or an unwritten role.
 */
export function projectNeedsContent(p: {
  name: string;
  context: string;
  year: string;
  role: string;
  pitch: string;
  description: string[];
}) {
  return [p.name, p.context, p.year, p.role, p.pitch, ...p.description].some(
    isPlaceholder
  );
}
