import type { Metadata } from 'next'

import { ProjectsFilter } from '@/app/components/projects-filter'
import { getCollection } from '@/lib/mdx'
import { getAbsoluteUrl, siteConfig } from '@/lib/site'

const pageTitle = 'Projects — Logistics & Operations Portfolio'
const pageDescription = 'A complete portfolio of warehouse operations, data analysis, automation, and side projects.'

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
        url: getAbsoluteUrl('/api/og?title=Projects&type=Portfolio'),
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
    images: [getAbsoluteUrl('/api/og?title=Projects&type=Portfolio')],
  },
}

export default async function ProjectsPage() {
  const projects = await getCollection('projects')

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-teal">Portfolio</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Projects with measurable impact</h1>
        <p className="max-w-3xl text-muted">
          Explore projects across data analysis, automation, warehouse operations, and strategic side initiatives.
        </p>
      </header>
      <ProjectsFilter projects={projects} />
    </section>
  )
}
