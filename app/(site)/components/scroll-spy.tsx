'use client';

import { useEffect, useState } from 'react';

import { slugify } from '@/lib/slugify';

type Heading = {
  id: string;
  title: string;
  level: number;
};

type ScrollSpyProps = {
  containerSelector?: string;
};

export function ScrollSpy({ containerSelector = 'article[data-prose]' }: ScrollSpyProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement | null;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('h2, h3')) as HTMLElement[];
    const computedHeadings = elements.map((element) => {
      if (!element.id) {
        element.id = slugify(element.textContent ?? 'section');
      }
      return {
        id: element.id,
        title: (element.textContent ?? '').trim(),
        level: Number(element.tagName.replace('H', '')),
      };
    });

    setHeadings(computedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible.length > 0) {
          setActive((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 1] }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [containerSelector]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-24 rounded-xl border border-[#363636] bg-[#1a1a1a]/95 p-4 text-sm text-[#d0cdcd] shadow-[0_20px_45px_-30px_rgba(0,0,0,0.7)]"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8f8f8f]">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? 'true' : undefined}
              className={`block rounded-md px-2 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-peach focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] ${
                active === heading.id
                  ? 'bg-[#262626] text-[#f0efef]'
                  : 'text-[#d0cdcd] hover:bg-[#202020] hover:text-[#f0efef]'
              }`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
