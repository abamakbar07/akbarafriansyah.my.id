import Link from 'next/link';
import { MetadataBadges } from '../components/metadata-badges';
import { getCollection } from '@/lib/mdx';

export const metadata = {
  title: 'Essays — Akbar Afriansyah',
  description: 'Reflections on process, craft, and collaborative rituals.',
};

export default async function EssaysPage() {
  const essays = await getCollection('essays');

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Essays</p>
        <h1 className="text-4xl font-semibold text-[#e0dede]">Writing</h1>
        <p className="max-w-2xl text-[#bdbbbb]">
          Longer musings on the patterns, questions, and tools shaping my work.
        </p>
      </header>
      <div className="space-y-6">
        {essays.map((essay) => (
          <article key={essay.slug} className="rounded-2xl border border-[#2f2f2f] bg-[#141414] p-6">
            <div className="space-y-3">
              <Link href={`/essays/${essay.slug}`} className="text-2xl font-semibold text-[#e0dede] transition hover:text-[#ffd7b5]">
                {essay.title}
              </Link>
              {essay.summary ? <p className="text-[#bdbbbb]">{essay.summary}</p> : null}
              <MetadataBadges
                publishedAt={essay.publishedAt}
                updatedAt={essay.updatedAt}
                readingTime={essay.readingTime}
                tags={essay.tags}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
