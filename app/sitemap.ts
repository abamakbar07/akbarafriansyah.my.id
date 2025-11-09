import type { MetadataRoute } from 'next'

import { getCollection } from '@/lib/mdx'
import { getAbsoluteUrl } from '@/lib/site'

function resolveDate(date?: string) {
  if (!date) {
    return new Date()
  }
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return new Date()
  }
  return parsed
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseEntries: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/projects',
    '/essays',
    '/now',
    '/quotes',
    '/contact',
  ].map((path) => ({ url: getAbsoluteUrl(path), lastModified: new Date() }))

  const [essays, projects] = await Promise.all([
    getCollection('essays'),
    getCollection('projects'),
  ])

  const essayEntries = essays.map((entry) => ({
    url: getAbsoluteUrl(`/essays/${entry.slug}`),
    lastModified: resolveDate(entry.updatedAt ?? entry.publishedAt),
  }))

  const projectEntries = projects.map((entry) => ({
    url: getAbsoluteUrl(`/projects/${entry.slug}`),
    lastModified: resolveDate(entry.updatedAt ?? entry.publishedAt),
  }))

  return [...baseEntries, ...essayEntries, ...projectEntries]
}
