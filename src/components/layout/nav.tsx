"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Active section is tracked with a single IntersectionObserver over all
 * sections rather than a scroll listener — no per-frame work, and it stays
 * correct when the user jumps via an anchor.
 */
function useActiveSection() {
  const [active, setActive] = React.useState<string>(navItems[0].id);

  React.useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Band across the upper-middle of the viewport.
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openerRef = React.useRef<HTMLButtonElement>(null);
  const sheetRef = React.useRef<HTMLDivElement>(null);

  // Lock body scroll while the mobile sheet is open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /**
   * Escape closes the sheet, and focus moves into it on open and back to the
   * menu button on close. Without this the sheet was a keyboard trap: Escape did
   * nothing, body scroll stayed locked, and Tab kept cycling the page behind it.
   */
  React.useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab inside the sheet.
      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Captured now: by cleanup time the ref could point somewhere else.
    const opener = openerRef.current;

    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(
      () => sheetRef.current?.querySelector<HTMLElement>("a[href], button")?.focus(),
      60
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
      opener?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-night-panel focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to projects
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-400",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="section-shell">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-400 md:px-5",
              scrolled
                ? "glass shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)]"
                : "border border-transparent"
            )}
          >
            {/* Wordmark */}
            <a
              href="#home"
              className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
            >
              <span className="grid size-8 place-items-center rounded-lg accent-gradient text-xs font-bold text-white">
                MS
              </span>
              <span className="hidden text-ink sm:inline">
                {profile.firstName}
              </span>
            </a>

            {/* Desktop links */}
            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-250",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {isActive && !reduced && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3.5 -bottom-px h-px accent-gradient"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ButtonLink
                href={profile.links.resume}
                download
                variant="gradient"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Download className="size-3.5" />
                Resume
              </ButtonLink>

              <button
                ref={openerRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                className="grid size-9 place-items-center rounded-full border border-edge text-ink-muted transition-colors hover:text-ink lg:hidden"
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-90 lg:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-night/94 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col px-6 pt-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-ink">
                  {profile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full border border-edge text-ink-muted"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav aria-label="Mobile site navigation">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block border-b border-edge py-4 font-display text-2xl font-medium transition-colors",
                          active === item.id ? "text-gradient" : "text-ink"
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <ButtonLink
                href={profile.links.resume}
                download
                variant="gradient"
                size="lg"
                className="mt-10 w-full"
              >
                <Download className="size-4" />
                Download Resume
              </ButtonLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
