"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

import { registerLenis } from "@/lib/smooth-scroll";

/**
 * Momentum scrolling for the whole page. Skipped entirely when the visitor has
 * asked for reduced motion — inertia is exactly the kind of movement that
 * setting exists to turn off — in which case the native scroll stays in charge
 * and lib/smooth-scroll falls back to scrollIntoView.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

export default SmoothScrollProvider;
