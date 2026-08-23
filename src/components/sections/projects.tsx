"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/shared/section";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { projects, type Project } from "@/data/projects";

/**
 * One grid, no filter pills.
 *
 * Category badges and the filter row are gone deliberately: every project was
 * built from scratch and every one was for a company or a client, so the labels
 * carried no information a reader could act on. Each project still records a
 * `track` in projects.ts — that's the hook for splitting this into headed
 * "Product Work" / "Client Work" groups once there's enough in each.
 */
export function Projects() {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  /**
   * Order: featured first, then anything with screenshots, then the rest.
   * Within each group the authored order in projects.ts is preserved.
   *
   * The screenshot rule is presentational, not a judgement on the work. A card
   * with an empty phone frame is a weaker thing to lead with than one showing a
   * real app, and three of them landing mid-grid broke the run. Sorting them
   * down means the top of the section is all real screens — and when a project
   * gets its captures, it rises on its own with no code change here.
   *
   * Array.prototype.sort is stable in every engine we target, so equal-ranking
   * projects keep their authored sequence rather than shuffling.
   */
  const ordered = React.useMemo(() => {
    const rank = (p: Project) =>
      p.featured ? 0 : p.screenshots.length > 0 ? 1 : 2;
    return [...projects].sort((a, b) => rank(a) - rank(b));
  }, []);

  const openProject = (p: Project) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I've"
        accent="shipped"
        description="Thirteen of the fifteen-odd I've built from scratch. What I built, the stack it runs on, and exactly which parts were mine, spelled out rather than left to inference."
      />

      <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.06, 0.24),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ProjectCard project={p} onOpen={() => openProject(p)} />
          </motion.li>
        ))}
      </ul>

      <ProjectDialog project={active} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
