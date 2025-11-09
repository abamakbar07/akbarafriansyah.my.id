'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type ReadingProgressProps = {
  targetSelector?: string;
};

export function ReadingProgress({ targetSelector = 'body' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const thresholds = Array.from({ length: 51 }, (_, index) => index / 50);
    const target =
      targetSelector === 'body'
        ? (document.documentElement as HTMLElement)
        : (document.querySelector(targetSelector) as HTMLElement | null);

    if (!target) {
      setProgress(0);
      return () => {};
    }

    const updateProgress = (entry: IntersectionObserverEntry) => {
      const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
      const totalScrollable = Math.max(target.scrollHeight - rootHeight, 1);
      const topOffset = entry.boundingClientRect.top;
      const ratio = Math.min(Math.max(-topOffset / totalScrollable, 0), 1);
      const normalized = totalScrollable <= 1 ? (entry.boundingClientRect.top <= 0 ? 1 : 0) : ratio;
      setProgress(Number.isFinite(normalized) ? normalized : 0);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => updateProgress(entry));
    }, { threshold: thresholds });

    observer.observe(target);

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        updateProgress({
          target,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 0,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          time: performance.now(),
        } as IntersectionObserverEntry);
      });
      resizeObserver.observe(target);

      return () => {
        observer.disconnect();
        resizeObserver.disconnect();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [targetSelector]);

  const percent = Math.round(progress * 100);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-full origin-left bg-gradient-to-r from-[#c8a2c8] via-[#89a8b2] to-[#ffd7b5]"
        style={{
          transform: `scaleX(${progress})`,
          transition: shouldReduceMotion ? 'none' : 'transform 150ms ease-out',
        }}
      />
    </div>
  );
}
