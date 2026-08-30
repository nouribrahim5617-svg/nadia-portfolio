"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Reveal } from "@/components/reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/content";
import { media } from "@/lib/media-manifest";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A single project.
 *
 * The gallery deliberately mixes two column spans rather than running a uniform
 * grid: renders are worth a full row and drawings read fine at half width, and
 * alternating the two is what keeps a long scroll of forty images from turning
 * into wallpaper. Wide images claim the full row on their own, which is decided
 * from the real pixel dimensions in the manifest, not guessed per file.
 */
export function ProjectView({ project, next }: { project: Project; next: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const assets = media[project.slug];
  const heroRef = React.useRef<HTMLDivElement>(null);

  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const all = React.useMemo(
    () => [...assets.gallery, ...assets.sheets],
    [assets.gallery, assets.sheets],
  );

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="relative h-[72vh] min-h-[420px] overflow-hidden bg-night sm:h-[82vh]">
        <motion.div
          className="absolute inset-0 h-[118%]"
          style={prefersReducedMotion ? undefined : { y: imageY }}
        >
          <img
            src={asset(assets.hero.src)}
            alt={assets.hero.alt}
            width={assets.hero.width}
            height={assets.hero.height}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-night/25" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/65 via-transparent to-night/85"
        />

        <div className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <motion.p
              className="type-label mb-4 text-paper/85"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              {project.number} — {project.programme}
            </motion.p>

            <h1 className="type-display text-paper">
              <span className="block text-[13vw] leading-[0.86] sm:text-[10vw] lg:text-[7.5vw]">
                <WordsPullUp text={project.title} delay={0.25} />
              </span>
            </h1>

            {project.subtitle ? (
              <motion.p
                className="type-accent mt-3 text-[6vw] leading-none text-signal sm:text-[3.4vw] lg:text-[2.4vw]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                {project.subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Facts + lead */}
      <section className="px-[var(--gutter)] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <dl className="grid gap-x-8 gap-y-6 border-b border-hairline pb-10 sm:grid-cols-3">
              {[
                ["Programme", project.programme],
                ["Location", project.place],
                ["Year", project.year],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="type-label text-ash">{label}</dt>
                  <dd className="type-body mt-2 text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Measured in px, not ch: at display weight the `ch` unit resolves
              far narrower than it reads, and the quote came out as a tall
              ribbon of one- and two-word lines. */}
          <Reveal delay={0.1}>
            <blockquote className="mt-14 max-w-[min(100%,46rem)]">
              <p className="type-display text-[6.5vw] leading-[1.02] sm:text-[3.4vw] lg:text-[2.3vw]">
                {project.lead}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Writing.
          A two-column grid was the obvious layout and the wrong one: the
          sections run to wildly different lengths, so each grid row sized to
          its tallest cell and left holes down the page. One column with the
          heading in a left rail keeps the measure readable and the rhythm
          even, however long any single section runs. */}
      <section className="px-[var(--gutter)] pb-8">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="space-y-14">
            {project.sections.map((section) => (
              <Reveal key={section.heading}>
                <div className="grid gap-y-4 border-t border-hairline pt-6 sm:grid-cols-[minmax(9rem,14rem)_1fr] sm:gap-x-10">
                  <h2 className="type-label text-signal-deep sm:pt-1">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="type-body max-w-[68ch] text-ink/85">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-[var(--gutter)] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <h2 className="type-label border-b border-hairline pb-3 text-ash">
              Drawings & Views — {all.length} images
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {all.map((image, index) => {
              // Landscape sheets and panoramas earn the full row; uprights and
              // squares pair up.
              const wide = image.width / image.height > 1.9;

              return (
                <Reveal
                  key={image.src}
                  as="figure"
                  delay={(index % 2) * 0.06}
                  className={wide ? "sm:col-span-2" : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(index)}
                    className="group block w-full cursor-zoom-in overflow-hidden bg-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-deep"
                  >
                    <img
                      src={asset(image.src)}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                  </button>
                  <figcaption className="type-label mt-3 text-ash">{image.alt}</figcaption>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-hairline px-[var(--gutter)] py-16">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-8">
          <Link
            href="/#work"
            className="link-wipe type-label text-ash transition-colors hover:text-signal-deep"
          >
            ← All work
          </Link>

          <Link href={`/projects/${next.slug}/`} className="group text-right">
            <p className="type-label text-ash">Next project</p>
            <p className="type-display mt-2 text-[8vw] leading-none transition-colors group-hover:text-signal-deep sm:text-[4.5vw] lg:text-[3.2vw]">
              {next.title}
            </p>
          </Link>
        </div>
      </section>

      <Lightbox
        images={all}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </>
  );
}

export default ProjectView;
