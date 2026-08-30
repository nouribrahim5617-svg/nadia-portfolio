import type Lenis from "lenis";

/**
 * Lenis owns the scroll position for the whole page, so anchor jumps and menu
 * scroll locking have to go through it rather than the native APIs — otherwise
 * the two fight and the page stutters. This module is the single handle
 * everything else uses.
 */

let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

/**
 * Clearance under the floating bar comes from `scroll-margin-top` on the
 * sections themselves — Lenis subtracts it, and so does native scrollIntoView.
 * Passing an offset here as well would apply it twice.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.3 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function lockScroll() {
  if (instance) instance.stop();
  document.documentElement.classList.add("lenis-stopped");
}

export function unlockScroll() {
  if (instance) instance.start();
  document.documentElement.classList.remove("lenis-stopped");
}
