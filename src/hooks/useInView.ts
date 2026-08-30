import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element first enters the viewport. Used to trigger a
 * subtle fade/slide-in on scroll without pulling in an animation library —
 * plain CSS transition + this hook.
 *
 * threshold defaults to a near-zero value deliberately: a percentage-based
 * threshold (e.g. 0.15) requires that fraction of the *target's total
 * height* to be simultaneously visible. For a tall block of content (like
 * a single-column mobile services grid, which can be 10x the viewport
 * height), that percentage can be mathematically unreachable while
 * scrolling through a short viewport — the callback then never fires and
 * the content stays permanently invisible. A near-zero threshold fires as
 * soon as any part of the element enters view, which is correct for
 * variable-height content.
 */
export default function useInView<T extends HTMLElement>(threshold = 0.01) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion preference: skip the observer, show immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);

    // Safety net: content must never stay permanently invisible if the
    // observer fails to fire for any reason (very tall content, an
    // unsupported browser, etc.) — force it visible after a generous
    // delay. Long enough to not clip the normal scroll-reveal effect.
    const fallback = setTimeout(() => setInView(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return { ref, inView };
}
