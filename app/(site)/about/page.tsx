import { notFound } from 'next/navigation';
import { MetadataBadges } from '../components/metadata-badges';
import { LongformLayout } from '../components/longform-layout';
import { getSingleton } from '@/lib/mdx';

export const metadata = {
  title: 'About — Akbar Afriansyah',
  description: 'A long-form introduction to Akbar’s philosophy and creative practice.',
};

export default async function AboutPage() {
  const entry = await getSingleton('about');
  if (!entry) {
    notFound();
  }

  return (
    <LongformLayout
      articleId="about-essay"
      header={
        <>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">About</p>
            <h1 className="text-4xl font-semibold text-[#e0dede] md:text-5xl">{entry.meta.title}</h1>
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
    >
      {entry.content}
    </LongformLayout>
  );
}
