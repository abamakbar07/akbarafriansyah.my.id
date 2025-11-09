'use client';

import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  title: string;
  level: number;
};

type ScrollSpyProps = {
  containerSelector?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

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
        title: element.textContent ?? '',
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
    <nav aria-label="Section navigation" className="sticky top-24 rounded-xl border border-[#2f2f2f] bg-[#161616] p-4 text-sm text-[#bdbbbb]">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#777]">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${heading.id}`}
              className={`block rounded-md px-2 py-1 transition-colors ${
                active === heading.id ? 'bg-[#232323] text-[#e0dede]' : 'hover:bg-[#1f1f1f] hover:text-[#e0dede]'
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
