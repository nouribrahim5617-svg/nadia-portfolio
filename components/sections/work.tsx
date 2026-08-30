"use client";

import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections/about";
import { ArchCard } from "@/components/ui/arch-card";
import { projects } from "@/lib/content";
import { media } from "@/lib/media-manifest";

/**
 * The arches gallery — a plain colonnade of four, each carrying a project's
 * main render, each a door into that project's page.
 *
 * Four across on a wide screen, two on a tablet, one on a phone. Not a
 * carousel: an architecture portfolio is judged on the work being legible side
 * by side, and hiding three quarters of it behind a swipe would work against
 * that on exactly the devices where scrolling is cheapest.
 */
export function Work() {
  return (
    <section id="work" className="relative px-[var(--gutter)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHead index="02" title="Selected Work" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="type-body mt-6 max-w-[52ch] text-ink/80">
            Four projects, from an affordable housing compound outside Beirut to a
            competition pavilion built out of light.
          </p>
        </Reveal>

        {/* Four explicit rows on wide screens — arch, title, meta, blurb — that
            each card subscribes to with `grid-rows-subgrid`, so the captions
            line up across the colonnade however deep each one wraps. */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-6">
          {projects.map((project, index) => (
            <ArchCard
              key={project.slug}
              href={`/projects/${project.slug}/`}
              image={media[project.slug].hero}
              number={project.number}
              title={project.title}
              subtitle={project.subtitle}
              meta={`${project.programme} — ${project.place}`}
              blurb={project.blurb}
              index={index}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
