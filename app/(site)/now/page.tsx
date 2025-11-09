import { notFound } from 'next/navigation';
import { MetadataBadges } from '../components/metadata-badges';
import { LongformLayout } from '../components/longform-layout';
import { getSingleton } from '@/lib/mdx';

export const metadata = {
  title: 'Now — Akbar Afriansyah',
  description: 'A snapshot of what is currently shaping Akbar’s attention.',
};

export default async function NowPage() {
  const entry = await getSingleton('now');
  if (!entry) {
    notFound();
  }

  return (
    <LongformLayout
      articleId="now-notes"
      header={
        <>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Now</p>
            <h1 className="text-4xl font-semibold text-[#e0dede]">What I’m focused on</h1>
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
