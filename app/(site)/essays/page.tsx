import type { Metadata } from 'next';
import Link from 'next/link';

import { MetadataBadges } from '../components/metadata-badges';
import { getCollection } from '@/lib/mdx';
import { getAbsoluteUrl, siteConfig } from '@/lib/site';

const pageTitle = 'Essays — Akbar Afriansyah';
const pageDescription = 'Reflections on process, craft, and collaborative rituals.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: getAbsoluteUrl('/essays'),
  },
  openGraph: {
    url: getAbsoluteUrl('/essays'),
    siteName: siteConfig.author,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: getAbsoluteUrl('/api/og?title=Essays&type=Collection'),
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    creator: siteConfig.twitter,
    images: [getAbsoluteUrl('/api/og?title=Essays&type=Collection')],
  },
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
