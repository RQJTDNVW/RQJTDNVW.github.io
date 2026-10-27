/**
 * Shared motion primitives.
 *
 * Two things matter here:
 *  1. A single IntersectionObserver serves every reveal on the page. Dozens of
 *     per-component observers would each cost layout reads.
 *  2. Nothing is hidden until JS mounts, so a script failure can never leave
 *     the page blank. `motion-ready` is added in main.tsx before render.
 */

const REVEALED_CLASS = "is-revealed";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

let reducedMotionQuery: MediaQueryList | null = null;

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  }
  return reducedMotionQuery.matches;
};

/** True on devices without a precise pointer — parallax is skipped there. */
export const isCoarsePointer = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
};

let observer: IntersectionObserver | null = null;

const getObserver = (): IntersectionObserver | null => {
  if (observer) return observer;
  if (typeof IntersectionObserver === "undefined") return null;

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED_CLASS);
        obs.unobserve(entry.target);
      }
    },
    {
      // Fire slightly before the element is fully visible so the motion is
      // already underway by the time it reaches the reading position.
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  return observer;
};

/**
 * Register an element for a one-shot reveal. Returns a cleanup function.
 * If IntersectionObserver is unavailable the element is shown immediately.
 */
export const observeReveal = (element: Element | null): (() => void) => {
  if (!element) return () => undefined;

  const obs = getObserver();
  if (!obs) {
    element.classList.add(REVEALED_CLASS);
    return () => undefined;
  }

  // Never animate something that is already off-screen-less (e.g. the hero on
  // first paint) more than once: unobserve handles that.
  obs.observe(element);
  return () => obs.unobserve(element);
};

/** Clamp helper shared by scroll-driven components. */
export const clamp = (value: number, min = 0, max = 1): number =>
  value < min ? min : value > max ? max : value;
