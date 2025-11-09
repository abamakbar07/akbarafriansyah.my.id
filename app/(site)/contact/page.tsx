import { notFound } from 'next/navigation';
import { MetadataBadges } from '../components/metadata-badges';
import { LongformLayout } from '../components/longform-layout';
import { getSingleton } from '@/lib/mdx';

export const metadata = {
  title: 'Contact — Akbar Afriansyah',
  description: 'Thoughtful ways to start a conversation with Akbar.',
};

export default async function ContactPage() {
  const entry = await getSingleton('contact');
  if (!entry) {
    notFound();
  }

  return (
    <LongformLayout
      articleId="contact-details"
      header={
        <>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Contact</p>
            <h1 className="text-4xl font-semibold text-[#e0dede]">Let’s stay in touch</h1>
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
