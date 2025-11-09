import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MetadataBadges } from '../../components/metadata-badges';
import { LongformLayout } from '../../components/longform-layout';
import { getAllSlugs, getEntry } from '@/lib/mdx';

export async function generateStaticParams() {
  const slugs = await getAllSlugs('essays');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getEntry('essays', params.slug);
  if (!entry) {
    return { title: 'Essay not found' };
  }
  return {
    title: `${entry.meta.title} — Essays`,
    description: entry.meta.summary,
  };
}

export default async function EssayDetailPage({ params }: { params: { slug: string } }) {
  const entry = await getEntry('essays', params.slug);
  if (!entry) {
    notFound();
  }

  return (
    <LongformLayout
      articleId={`essay-${params.slug}`}
      header={
        <>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Essay</p>
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
