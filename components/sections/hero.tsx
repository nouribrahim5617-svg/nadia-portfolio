"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { WordsPullUp } from "@/components/ui/words-pull-up";
import { profile } from "@/lib/content";
import { heroVideo } from "@/lib/media-manifest";
import { asset } from "@/lib/asset";
import { scrollToSection } from "@/lib/smooth-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed hero: her Journey to Utopia walkthrough, darkened, with the name
 * set over it.
 *
 * The source is a 43 MB 1080p file; scripts/build-assets.mjs cuts that to an
 * 8.6 MB desktop loop and a 2.8 MB mobile one. Which of the two loads is
 * decided on the client after mount rather than with `<source media>` — Chrome
 * does not honour that attribute on video sources, so declaring both would
 * either fetch the wrong file or fetch both.
 *
 * The poster carries the first paint either way, and is all that is shown when
 * the visitor has asked for reduced motion: a 34-second push through a building
 * is precisely the kind of movement that setting means to stop.
 */
const MOBILE_QUERY = "(max-width: 767px)";

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLElement>(null);

  /**
   * `null` on the server and through the hydration render, a real boolean
   * immediately after. That is the whole point of using a store subscription
   * here rather than an effect: the markup React hydrates carries no `src`, so
   * the browser never starts fetching the desktop cut on a phone, and the
   * decision still lands on the first client render rather than a frame later.
   */
  const isMobile = React.useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => null,
  );

  const src =
    prefersReducedMotion || !heroVideo || isMobile === null
      ? null
      : asset(isMobile ? heroVideo.mobile : heroVideo.mp4);

  // The video drifts up at half scroll speed while the copy leaves at full
  // speed, so the hero feels like it has depth as the page pulls away from it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-viewport w-full overflow-hidden bg-night"
    >
      <motion.div
        className="absolute inset-0 h-[122%] will-change-transform"
        style={prefersReducedMotion ? undefined : { y: videoY }}
      >
        {heroVideo ? (
          <video
            key={src ?? "poster"}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={asset(heroVideo.poster)}
            src={src ?? undefined}
            aria-hidden
            className="h-full w-full object-cover"
          />
        ) : null}
      </motion.div>

      {/* Darkening. Three passes rather than one flat scrim: a vertical ramp so
          the foot of the frame carries the name, a top wash so the floating bar
          keeps its contrast, and a light overall tint to hold the middle. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-night/25" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/70 via-night/10 to-night/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 to-transparent"
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-10 sm:pb-12"
        style={prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            className="type-label mb-5 text-paper/85"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {profile.role} — {profile.credential}
          </motion.p>

          <h1 className="type-display text-paper">
            <span className="block text-[19vw] leading-[0.82] sm:text-[17vw] lg:text-[13.5vw]">
              <WordsPullUp text="Nadia" delay={0.35} />
            </span>
            <span className="block text-[13vw] leading-[0.86] text-paper/85 sm:text-[11.5vw] lg:text-[9vw]">
              <WordsPullUp text="Abdel Sater" delay={0.48} />
            </span>
          </h1>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <motion.p
              className="type-display text-[7vw] leading-none text-paper/75 sm:text-[4.5vw] lg:text-[2.6vw]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            >
              {profile.tagline.lead}{" "}
              <span className="type-accent text-signal">{profile.tagline.accent}</span>
            </motion.p>

            {/* Hidden on phones: wrapped onto its own line it pushed the whole
                block past the bottom of the viewport, and a scroll hint is the
                one thing a touch screen does not need. */}
            <motion.button
              type="button"
              onClick={() => scrollToSection("about")}
              className="group type-label hidden items-center gap-3 text-paper/70 transition-colors hover:text-paper sm:flex"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            >
              Scroll
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-paper/35 transition-colors group-hover:border-signal group-hover:bg-signal">
                <motion.span
                  aria-hidden
                  className="text-sm leading-none"
                  animate={prefersReducedMotion ? undefined : { y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
