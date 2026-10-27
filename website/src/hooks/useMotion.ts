import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { subscribePointer } from "../lib/pointer";
import { clamp, isCoarsePointer, prefersReducedMotion } from "../lib/motion";

/**
 * Writes a -1..1 pointer offset into `--px` / `--py` custom properties on the
 * target element. Consumers decide the magnitude in CSS, e.g.
 * `transform: translate3d(calc(var(--px) * 10px), ...)`.
 *
 * Disabled for coarse pointers and reduced-motion users.
 */
export const usePointerParallax = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion() || isCoarsePointer()) return;

    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const settle = () => {
      raf = 0;
      // Damp towards the pointer so the movement reads as weight, not tracking.
      element.style.setProperty("--px", (currentX * 0.55).toFixed(4));
      element.style.setProperty("--py", (currentY * 0.55).toFixed(4));
    };

    const unsubscribe = subscribePointer((x, y) => {
      currentX = x;
      currentY = y;
      if (!raf) raf = requestAnimationFrame(settle);
    });

    return () => {
      unsubscribe();
      if (raf) cancelAnimationFrame(raf);
      element.style.removeProperty("--px");
      element.style.removeProperty("--py");
    };
  }, []);

  return ref;
};

/**
 * Fires `onProgress` with a 0..1 value describing how far the element has
 * travelled through the viewport (0 = top edge entering, 1 = bottom edge
 * leaving). The callback runs imperatively inside a rAF, so consumers can write
 * CSS variables without ever re-rendering React.
 */
export interface ProgressOptions {
  /**
   * Centre-based mapping. `start` is the viewport fraction where the element's
   * centre gives progress 0, `end` where it gives 1. Using 0.92 → 0.42 means the
   * animation completes while the element is comfortably on screen, instead of
   * only at the moment it scrolls out of view.
   */
  start?: number;
  end?: number;
}

export const useProgressOnElement = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (progress: number) => void,
  options?: ProgressOptions
) => {
  const callback = useRef(onProgress);
  callback.current = onProgress;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const opts = optionsRef.current;

      let progress: number;

      if (opts?.start !== undefined && opts?.end !== undefined) {
        const center = rect.top + rect.height / 2;
        const from = opts.start * viewport;
        const to = opts.end * viewport;
        progress = clamp((from - center) / Math.max(from - to, 1));
      } else {
        const travel = rect.height + viewport;
        progress = travel > 0 ? clamp((viewport - rect.top) / travel) : 0;
      }

      // Ignore sub-pixel churn.
      if (Math.abs(progress - last) < 0.0015) return;
      last = progress;
      callback.current(progress);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
};

/**
 * Convenience wrapper that owns its own ref.
 */
export const useViewportProgress = <T extends HTMLElement>(
  onProgress: (progress: number) => void,
  options?: ProgressOptions
) => {
  const ref = useRef<T | null>(null);
  useProgressOnElement(ref, onProgress, options);
  return ref;
};

/**
 * Page-level scroll progress written to `--scroll-progress` on <html>.
 * Runs once for the whole app.
 */
export const useGlobalScrollProgress = () => {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-y", `${Math.round(window.scrollY)}px`);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-y");
    };
  }, []);
};

/** Reactive reduced-motion flag, for the rare component that must branch in JSX. */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setReduced(query.matches);
    query.addEventListener("change", handle);
    return () => query.removeEventListener("change", handle);
  }, []);

  return reduced;
};
