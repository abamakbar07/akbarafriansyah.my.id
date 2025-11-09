'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';

type FootnoteProps = {
  index?: number;
  label?: string;
  children: ReactNode;
};

export function Footnote({ index, label, children }: FootnoteProps) {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const displayLabel = label ?? String(index ?? '✶');
  const contentId = `${generatedId}-footnote`;

  return (
    <span className="relative inline-flex items-start">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        className="mx-1 rounded-full bg-[#2a2a2a] px-2 py-1 text-xs font-medium text-[#c8a2c8] transition hover:bg-[#343434] focus:outline-none focus:ring-2 focus:ring-[#c8a2c8]/60"
      >
        <sup>{displayLabel}</sup>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.span
            id={contentId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 z-20 mt-6 w-56 -translate-x-1/2 rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] p-3 text-left text-xs text-[#e0dede] shadow-xl"
          >
            {children}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
