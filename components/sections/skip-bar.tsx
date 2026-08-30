"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import { navigation, profile } from "@/lib/content";
import { asset } from "@/lib/asset";
import { lockScroll, scrollToSection, scrollToTop, unlockScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The floating skip bar: a dark rounded-full band held above the off-white
 * page, so anyone can jump straight to a section without scrolling the whole
 * one-pager.
 *
 * It has two jobs that pull in different directions — be reachable at all
 * times, and stay out of the way of a full-bleed hero. The compromise is that
 * it floats transparent over the video at the top of the page and only takes on
 * its solid ground once you have scrolled past the hero.
 *
 * On a project page there is no hero and no in-page section to observe, so the
 * links become ordinary hash links back to the one-pager.
 */
export function SkipBar() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [active, setActive] = React.useState<string>("hero");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [grounded, setGrounded] = React.useState(!isHome);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    if (isHome) setGrounded(value > window.innerHeight * 0.72);
  });

  // Which section is currently on screen — the middle band of the viewport
  // decides, so a section counts as current while you are reading it rather
  // than the instant its top edge appears.
  React.useEffect(() => {
    if (!isHome) return;

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  React.useEffect(() => {
    if (menuOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [menuOpen]);

  // Close the overlay on Escape — it covers the whole screen, so a keyboard
  // user needs a way out that is not the toggle button.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    // Let the overlay finish unmounting before Lenis takes the scroll.
    requestAnimationFrame(() => scrollToSection(id));
  };

  const navClasses = (id: string) =>
    cn(
      "type-label relative rounded-full px-3.5 py-2 transition-colors duration-300",
      active === id && isHome ? "text-paper" : "text-paper/75 hover:text-paper",
    );

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
        <motion.header
          className={cn(
            "pointer-events-auto flex h-[var(--bar-height)] items-center gap-1 rounded-full pl-4 pr-1.5 sm:gap-2 sm:pl-6 sm:pr-2",
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            grounded
              ? "bg-night/92 shadow-[0_10px_40px_-16px_rgba(28,27,26,0.6)] backdrop-blur-md"
              : "bg-night/35 backdrop-blur-[3px]",
          )}
          initial={prefersReducedMotion ? false : { y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          {isHome ? (
            <button
              type="button"
              onClick={scrollToTop}
              className="type-label shrink-0 whitespace-nowrap py-2 text-paper transition-colors hover:text-signal"
            >
              Nadia<span className="hidden sm:inline"> Abdel Sater</span>
            </button>
          ) : (
            <Link
              href="/"
              className="type-label shrink-0 whitespace-nowrap py-2 text-paper transition-colors hover:text-signal"
            >
              Nadia<span className="hidden sm:inline"> Abdel Sater</span>
            </Link>
          )}

          <nav aria-label="Sections" className="ml-2 hidden items-center md:flex">
            {navigation.map(({ id, label }) =>
              isHome ? (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={navClasses(id)}
                >
                  {active === id ? (
                    <motion.span
                      layoutId="skip-bar-pill"
                      className="absolute inset-0 rounded-full bg-signal"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  ) : null}
                  <span className="relative">{label}</span>
                </button>
              ) : (
                <Link key={id} href={`/#${id}`} className={navClasses(id)}>
                  <span className="relative">{label}</span>
                </Link>
              ),
            )}
          </nav>

          <a
            href={asset(profile.cv)}
            download
            className="type-label ml-auto hidden shrink-0 rounded-full border border-paper/30 px-4 py-2.5 text-paper transition-colors hover:border-signal hover:bg-signal md:inline-block"
          >
            CV ↓
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="skip-menu"
            className="type-label ml-auto flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-paper transition-colors hover:text-signal md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </motion.header>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="skip-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-night px-5 pb-10 pt-28 text-paper md:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <nav aria-label="Sections" className="flex flex-col">
              {navigation.map(({ id, label }, index) => {
                const content = (
                  <>
                    <span className="type-label mr-4 text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </>
                );

                return (
                  <motion.div
                    key={id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: EASE }}
                  >
                    {isHome ? (
                      <button
                        type="button"
                        onClick={() => goTo(id)}
                        className="type-display flex w-full items-baseline border-b border-paper/15 py-5 text-left text-[11vw] text-paper active:text-signal"
                      >
                        {content}
                      </button>
                    ) : (
                      <Link
                        href={`/#${id}`}
                        onClick={() => setMenuOpen(false)}
                        className="type-display flex w-full items-baseline border-b border-paper/15 py-5 text-left text-[11vw] text-paper active:text-signal"
                      >
                        {content}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex flex-col gap-5">
              <a
                href={asset(profile.cv)}
                download
                className="type-label flex h-14 items-center justify-center rounded-full bg-signal px-4 text-paper"
              >
                Download CV ↓
              </a>
              <div className="type-label flex flex-wrap gap-x-5 gap-y-2 text-paper/50">
                {profile.socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default SkipBar;
