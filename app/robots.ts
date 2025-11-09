import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteConfig.url)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: host.host,
  }
}
