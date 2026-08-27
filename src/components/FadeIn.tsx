import React from 'react';
import useInView from '../hooks/useInView';

/** Wraps a section so it fades and lifts slightly into view on scroll.
 * Subtle by design: 500ms, small translate, fires once. Falls back to
 * showing content immediately if prefers-reduced-motion is set. */
export default function FadeIn({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}
