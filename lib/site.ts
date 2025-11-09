export const siteConfig = {
  author: 'Muhamad Akbar Afriansyah',
  tagline: 'Akbar Afriansyah — Clarity through simplicity',
  description:
    'A reflective digital home for Muhamad Akbar Afriansyah to share essays, projects, and the rituals that shape his work.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akbarafriansyah.my.id').replace(/\/$/, ''),
  domain: 'akbarafriansyah.my.id',
  twitter: '@abam_afriansyah',
}

export function getAbsoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}
