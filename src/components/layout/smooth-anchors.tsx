"use client";

import * as React from "react";

/**
 * Fixed-duration smooth scrolling for same-page anchors.
 *
 * WHY THIS EXISTS
 * `html { scroll-behavior: smooth }` looks right for short hops but Chrome
 * scales the animation with distance: clicking "Contact" from the hero, or
 * "Back to top" from the footer, measured **1.84 seconds** of animated
 * scrolling. That reads as a broken link — people click again mid-flight.
 *
 * This scrolls over a constant duration no matter how far it travels, so a jump
 * between neighbouring sections and a jump across the whole page both take the
 * same predictable moment.
 *
 * One listener on the document rather than a handler per link, so nothing has to
 * change in the nav, footer, hero CTAs or skip link.
 */

const DURATION = 560;

/** Breathing room between the bottom of the nav and the section heading. */
const GAP = 28;

/** Fallback if the nav can't be measured (it shouldn't fail — it's fixed). */
const NAV_FALLBACK = 96;

function navBottom() {
  const bottom = document
    .querySelector("header")
    ?.getBoundingClientRect().bottom;
  return bottom && bottom > 0 ? bottom : NAV_FALLBACK;
}

/**
 * Where to scroll so a section's *heading* sits just below the nav.
 *
 * Scrolling to the section box itself isn't enough: every <Section> carries
 * `py-24 md:py-32`, so its first 96–128px are empty padding. Landing on the box
 * top parked the heading up to 128px below the nav — far enough that clicking
 * "Experience" still left you scrolling by hand to reach it.
 *
 * So measure the inner content wrapper instead, and read the nav's real height
 * rather than assuming it, since it differs between breakpoints.
 */
function anchorTop(target: HTMLElement) {
  const nav = navBottom();

  // A section that begins at the very top of the document — the hero — should
  // go to 0, not 25px in. Offsetting into it would clip the headline.
  const sectionTop = target.getBoundingClientRect().top + window.scrollY;
  if (sectionTop <= nav) return 0;

  const shell = target.querySelector<HTMLElement>(":scope > .section-shell");
  const el = shell ?? target;
  return Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - nav - GAP
  );
}

/** easeInOutCubic — symmetric, no overshoot. */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function SmoothAnchors() {
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * Landing on a URL that already has a hash — a shared link like
     * /#projects — never goes through the click handler, so the browser's own
     * jump applies (scroll-padding-top plus the section's padding) and lands
     * ~50px lower than a nav click does. Correct it once on mount so a shared
     * link and a click put the heading in the same place.
     */
    if (window.location.hash.length > 1) {
      const initial = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1))
      );
      if (initial) {
        /**
         * Three passes, because two things move after the first one:
         *  1. the nav condenses to its scrolled height (~16px),
         *  2. the <Reveal> entrance animations settle, which shifts headings a
         *     further ~15px as they translate into place.
         * The last pass is on a timer so it lands after those animations, and
         * it bails if the visitor has started scrolling — correcting under
         * someone's finger would feel like the page fighting them.
         */
        const settleHash = () => {
          const want = anchorTop(initial);
          window.scrollTo(0, want);
          return want;
        };
        requestAnimationFrame(() => {
          settleHash();
          requestAnimationFrame(() => {
            const set = settleHash();
            window.setTimeout(() => {
              if (Math.abs(window.scrollY - set) < 4) settleHash();
            }, 380);
          });
        });
      }
    }

    const onClick = (e: MouseEvent) => {
      // Let the browser handle modified clicks (new tab, download, etc.).
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const link = (e.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!link || !href || !href.startsWith("#") || href === "#") return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();

      const top = anchorTop(target);

      const finish = () => {
        /**
         * Correction pass. The nav is taller at scrollY 0 than once the page
         * has moved (it condenses on scroll), so a jump starting from the top
         * of the page computes its target against a nav height that no longer
         * applies by the time it lands — measured 16px of drift on the first
         * click. Re-measure now that everything has settled and nudge if the
         * heading isn't where it should be.
         */
        const want = anchorTop(target);
        if (Math.abs(window.scrollY - want) > 4) window.scrollTo(0, want);

        // pushState rather than location.hash so the browser doesn't also jump.
        history.pushState(null, "", href);

        /**
         * Move focus to the target. Preventing default also cancels the
         * browser's own "focus the fragment target" behaviour, which broke the
         * skip link: it scrolled, but Tab carried on from the nav instead of
         * from the section, so the link did nothing for keyboard users.
         *
         * preventScroll keeps focusing from fighting the animation we just ran.
         */
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };

      if (reduced) {
        window.scrollTo(0, top);
        finish();
        return;
      }

      const start = window.scrollY;
      const delta = top - start;
      if (Math.abs(delta) < 2) {
        finish();
        return;
      }

      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        window.scrollTo(0, start + delta * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else finish();
      };
      requestAnimationFrame(step);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
