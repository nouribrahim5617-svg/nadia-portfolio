"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media-manifest";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The arch.
 *
 * The card is a fixed 3 : 4.6 box, so a true semicircular head — radius = half
 * the card width — is exactly (W/2)/H = 32.6% of the height. Writing the radius
 * as `50% / 32.6%` keeps that semicircle honest at every breakpoint instead of
 * flattening into a lozenge the way a single percentage would.
 *
 * The frame carries the radius and the overflow; the image inside is a plain
 * rectangle that scales on hover. Scaling the masked element itself would grow
 * the arch as well as its contents.
 *
 * Layout note: two of the four projects have a subtitle and their location
 * lines wrap to different depths, so laid out independently the captions come
 * out ragged and the colonnade stops reading as a row. The card is therefore a
 * `grid-rows-subgrid` participant in the gallery's own grid — arch, title, meta
 * and blurb each land on a shared row line across all four. Because subgrid
 * needs these to be direct grid children they cannot sit inside one <a>, so the
 * link is stretched over the whole card instead.
 */
export function ArchCard({
  href,
  image,
  number,
  title,
  subtitle,
  meta,
  blurb,
  index = 0,
  priority = false,
}: {
  href: string;
  image: Media;
  number: string;
  title: string;
  subtitle?: string;
  meta: string;
  blurb?: string;
  index?: number;
  priority?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: EASE }}
    >
      <div
        className={cn(
          "relative aspect-[3/4.6] overflow-hidden bg-hairline",
          "mask-arch",
          "ring-1 ring-inset ring-ink/10 transition-shadow duration-500",
          "group-hover:shadow-[0_18px_50px_-24px_rgba(59,59,59,0.55)]",
          "group-focus-within:ring-2 group-focus-within:ring-signal-deep",
        )}
      >
        <img
          src={asset(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />

        {/* Warms the foot of the arch so the hover label stays readable over
            pale renders. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span
          aria-hidden
          className="type-label absolute inset-x-0 bottom-4 text-center text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          View project
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="type-label shrink-0 text-signal-deep">{number}</span>
        <div className="min-w-0">
          <h3 className="type-display text-[1.35rem] leading-[0.95] text-ink transition-colors duration-300 group-hover:text-signal-deep sm:text-2xl">
            {/* The link is stretched over the card, so it lives on the title —
                that gives the accessible name without an extra landmark. */}
            <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
              {title}
            </Link>
          </h3>
          {subtitle ? (
            <p className="type-accent mt-1 text-[1.05rem] leading-tight text-ash">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <p className="type-label mt-2.5 self-start text-ash">{meta}</p>

      {blurb ? (
        <p className="type-body mt-2 self-start text-[0.95rem] leading-snug text-ink/80 sm:text-base">
          {blurb}
        </p>
      ) : null}
    </motion.article>
  );
}

export default ArchCard;
