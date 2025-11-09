'use client';

import { useEffect, useState } from 'react';

type ReadingProgressProps = {
  targetSelector?: string;
};

export function ReadingProgress({ targetSelector = 'body' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const target =
        targetSelector === 'body'
          ? (document.documentElement as HTMLElement)
          : (document.querySelector(targetSelector) as HTMLElement | null);

      if (!target) {
        setProgress(0);
        return;
      }

      const offsetTop = targetSelector === 'body' ? 0 : target.getBoundingClientRect().top + window.scrollY;
      const height =
        targetSelector === 'body'
          ? target.scrollHeight - window.innerHeight
          : target.offsetHeight - window.innerHeight + Math.max(offsetTop, 0);

      const scrollTop = Math.min(Math.max(window.scrollY - offsetTop, 0), height);
      const ratio = height <= 0 ? 0 : scrollTop / height;
      setProgress(Number.isFinite(ratio) ? Math.max(0, Math.min(1, ratio)) : 0);
    };

    calculate();
    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate);
    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [targetSelector]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#c8a2c8] via-[#89a8b2] to-[#ffd7b5] transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </div>
  );
}
