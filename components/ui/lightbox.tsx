"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { asset } from "@/lib/asset";
import { lockScroll, unlockScroll } from "@/lib/smooth-scroll";
import type { Media } from "@/lib/media-manifest";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen viewer for the drawings.
 *
 * Plans, sections and competition boards are the images a reviewer actually
 * wants to inspect, and at grid size they are unreadable — so the gallery is
 * clickable and this puts one image on a dark ground at full width, with arrow
 * keys to move along the set.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: Media[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const open = index !== null;

  React.useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [open]);

  React.useEffect(() => {
    if (!open || index === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onClose, onNavigate]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt || "Image viewer"}
          className="fixed inset-0 z-[60] flex flex-col bg-night/97 backdrop-blur-sm"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <div className="flex shrink-0 items-center justify-between px-[var(--gutter)] py-4">
            <p className="type-label text-paper/50">
              {(index ?? 0) + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="type-label rounded-full border border-paper/30 px-5 py-2.5 text-paper transition-colors hover:border-signal hover:bg-signal"
            >
              Close
            </button>
          </div>

          {/* Clicking the ground closes; clicking the image itself must not. */}
          <div
            className="flex min-h-0 flex-1 items-center justify-center px-[var(--gutter)] pb-4"
            onClick={onClose}
          >
            <motion.img
              key={current.src}
              src={asset(current.src)}
              alt={current.alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full cursor-default object-contain"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 px-[var(--gutter)] pb-6">
            <p className="type-label max-w-[60ch] text-paper/60">{current.alt}</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onNavigate(((index ?? 0) - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-signal hover:bg-signal"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => onNavigate(((index ?? 0) + 1) % images.length)}
                aria-label="Next image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-signal hover:bg-signal"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Lightbox;
