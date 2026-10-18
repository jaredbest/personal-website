// Shared animation helpers. Every animation on the site goes through these so the rules stay the same:
// motion starts only when something is seen or touched, and reduced motion is always respected.
import { useEffect, useState, type RefObject } from "react";

export const prefersReducedMotion = (): boolean =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/**
 * Calls `onFrame` once per frame with progress from 0 to 1 over `duration` ms. Returns a function that stops it.
 * Time counts from the first frame's own timestamp, so progress never starts below 0.
 */
export function animate(duration: number, onFrame: (progress: number) => void): () => void {
  let frame = 0;
  let start: number | undefined;
  const tick = (now: number) => {
    start ??= now;
    const progress = Math.min(1, (now - start) / duration);
    onFrame(progress);
    if (progress < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

/** True once the element has been on screen. Stays true. Without observer support it is true at once. */
export function useSeen(ref: RefObject<Element | null>, options: IntersectionObserverInit = {}): boolean {
  const [seen, setSeen] = useState(() => !("IntersectionObserver" in window));
  const { threshold, rootMargin } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, seen, threshold, rootMargin]);

  return seen;
}

/**
 * For card previews: runs `play` once the card is first seen, and again whenever the card is hovered
 * or focused. `ready` holds playback back until, for example, data has loaded.
 */
export function useCardPlayback(ref: RefObject<HTMLElement | null>, play: () => void, ready = true): void {
  const seen = useSeen(ref, { threshold: 0.6 });

  useEffect(() => {
    if (seen && ready) play();
  }, [seen, ready, play]);

  useEffect(() => {
    const card = ref.current?.closest("li") ?? ref.current;
    if (!card || !ready) return;
    card.addEventListener("mouseenter", play);
    card.addEventListener("focusin", play);
    return () => {
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("focusin", play);
    };
  }, [ref, play, ready]);
}
