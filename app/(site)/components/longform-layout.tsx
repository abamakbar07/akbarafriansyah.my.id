import type { ReactNode } from 'react';
import { ReadingProgress } from './reading-progress';
import { ScrollSpy } from './scroll-spy';

interface LongformLayoutProps {
  articleId: string;
  header: ReactNode;
  children: ReactNode;
  withScrollSpy?: boolean;
}

export function LongformLayout({ articleId, header, children, withScrollSpy = true }: LongformLayoutProps) {
  return (
    <div className="relative">
      <ReadingProgress targetSelector={`#${articleId}`} />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 space-y-6">{header}</div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article
            id={articleId}
            data-prose
            className="prose prose-invert max-w-none text-[#e0dede] prose-headings:text-[#e0dede] prose-a:text-[#c8a2c8] prose-strong:text-[#ffd7b5] prose-blockquote:border-[#c8a2c8]"
          >
            {children}
          </article>
          {withScrollSpy ? (
            <aside className="hidden lg:block">
              <ScrollSpy containerSelector={`#${articleId}`} />
            </aside>
          ) : null}
        </div>
      </section>
    </div>
  );
}
