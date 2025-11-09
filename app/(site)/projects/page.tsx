import type { Metadata } from 'next';
import Link from 'next/link';

import { MetadataBadges } from '../components/metadata-badges';
import { getCollection } from '@/lib/mdx';
import { getAbsoluteUrl, siteConfig } from '@/lib/site';

const pageTitle = 'Projects — Akbar Afriansyah';
const pageDescription = 'Case studies and process notes from ongoing experiments.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: getAbsoluteUrl('/projects'),
  },
  openGraph: {
    url: getAbsoluteUrl('/projects'),
    siteName: siteConfig.author,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: getAbsoluteUrl('/api/og?title=Projects&type=Collection'),
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
    images: [getAbsoluteUrl('/api/og?title=Projects&type=Collection')],
  },
};

export default async function ProjectsPage() {
  const projects = await getCollection('projects');

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Projects</p>
        <h1 className="text-4xl font-semibold text-[#e0dede]">Selected Work</h1>
        <p className="max-w-2xl text-[#bdbbbb]">
          A portfolio of logistics tooling, community dashboards, and playful experiments that blend SAP expertise with modern
          web craft.
        </p>
      </header>
      <div className="grid gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-2xl border border-[#2f2f2f] bg-[#141414] p-6 transition hover:border-[#3c3c3c] hover:bg-[#1a1a1a]"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#e0dede] transition group-hover:text-[#ffd7b5]">
                {project.title}
              </h2>
              {project.summary ? <p className="text-[#bdbbbb]">{project.summary}</p> : null}
              <MetadataBadges
                publishedAt={project.publishedAt}
                updatedAt={project.updatedAt}
                readingTime={project.readingTime}
                tags={project.tags}
                status={project.status}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
