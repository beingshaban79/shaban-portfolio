"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneMockup } from "./phone-mockup";
import { cn } from "@/lib/utils";

/**
 * Horizontal gallery of framed screenshots.
 *
 * Uses native CSS scroll-snap rather than a JS carousel: keyboard, trackpad,
 * touch-drag and screen readers all work for free, and there's no layout
 * thrash on resize. Arrow buttons just call scrollBy.
 */
export function ScreenshotCarousel({
  shots,
  size = "md",
  note,
  className,
}: {
  shots: { src: string; alt: string }[];
  size?: "sm" | "md" | "lg";
  /** Shown on the empty frame when a project has no screenshots. */
  note?: string;
  className?: string;
}) {
  const track = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const sync = React.useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  React.useEffect(() => {
    sync();
  }, [sync, shots.length]);

  const nudge = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  };

  // Nothing supplied yet — show a single empty frame so the layout is honest
  // about what's missing rather than collapsing.
  if (shots.length === 0) {
    return (
      <div className={cn("flex justify-center py-4", className)}>
        <PhoneMockup alt="Screenshot placeholder" size={size} note={note} />
      </div>
    );
  }

  const showArrows = shots.length > 2;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={track}
        onScroll={sync}
        // tabIndex makes the region keyboard-scrollable
        tabIndex={0}
        role="region"
        aria-label="Project screenshots"
        className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-1 pb-8 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot, i) => (
          <div key={shot.src} className="snap-center">
            <PhoneMockup
              src={shot.src}
              alt={shot.alt}
              size={size}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous screenshot"
            className="absolute left-0 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-edge bg-night/85 text-ink-muted backdrop-blur transition-all hover:border-edge-strong hover:text-ink disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Next screenshot"
            className="absolute right-0 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-edge bg-night/85 text-ink-muted backdrop-blur transition-all hover:border-edge-strong hover:text-ink disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}
    </div>
  );
}
