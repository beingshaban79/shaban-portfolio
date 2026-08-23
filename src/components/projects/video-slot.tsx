"use client";

import type { Project } from "@/data/projects";

/**
 * Demo video player.
 *
 * Renders nothing when `project.video` is null — the caller in project-dialog
 * already gates the whole "Demo" section on the same condition, so a project
 * without footage simply has no demo section rather than an empty box.
 *
 * To add footage: drop the file at /projects/<slug>/demo.mp4 and set `video` in
 * projects.ts. No other edits needed.
 *
 * `preload="none"` means zero bytes are fetched until the visitor hits play —
 * the video never competes with the page for bandwidth.
 */
export function VideoSlot({ project }: { project: Project }) {
  if (!project.video) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-black/50">
      <video
        controls
        preload="none"
        playsInline
        className="aspect-video w-full"
        // A screenshot makes a good poster frame while the video loads.
        poster={project.screenshots[0]?.src}
      >
        <source src={project.video} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    </div>
  );
}
