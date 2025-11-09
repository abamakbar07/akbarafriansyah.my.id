import { notFound } from 'next/navigation';
import { MetadataBadges } from '../components/metadata-badges';
import { LongformLayout } from '../components/longform-layout';
import { getSingleton } from '@/lib/mdx';

export const metadata = {
  title: 'Quotes — Akbar Afriansyah',
  description: 'Collected lines I revisit to stay grounded in the work.',
};

export default async function QuotesPage() {
  const entry = await getSingleton('quotes');
  if (!entry) {
    notFound();
  }

  return (
    <LongformLayout
      articleId="quotes-collection"
      header={
        <>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Quotes</p>
            <h1 className="text-4xl font-semibold text-[#e0dede]">Fragments I keep close</h1>
            {entry.meta.summary ? <p className="max-w-2xl text-lg text-[#bdbbbb]">{entry.meta.summary}</p> : null}
          </div>
          <MetadataBadges
            publishedAt={entry.meta.publishedAt}
            updatedAt={entry.meta.updatedAt}
            readingTime={entry.meta.readingTime}
            tags={entry.meta.tags}
          />
        </>
      }
      withScrollSpy={false}
    >
      {entry.content}
    </LongformLayout>
  );
}
