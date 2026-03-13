import '../styles/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'

import { getProfile } from '@/lib/profile'
import { siteConfig } from '@/lib/site'

import { CommandPaletteProvider } from './components/command-palette'

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile()
  const name = profile.name || 'Muhamad Akbar Afriansyah'

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.tagline,
      template: `%s — ${name}`,
    },
    description: siteConfig.description,
    keywords: ['Akbar Afriansyah', 'Muhamad Akbar Afriansyah', 'product design', 'essays', 'projects', 'portfolio'],
    authors: [{ name, url: siteConfig.url }],
    creator: name,
    publisher: name,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: name,
      title: siteConfig.tagline,
      description: siteConfig.description,
      images: [
        {
          url: `${siteConfig.url}/api/og`,
          width: 1200,
          height: 630,
          alt: siteConfig.tagline,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.tagline,
      description: siteConfig.description,
      creator: siteConfig.twitter,
      images: [`${siteConfig.url}/api/og`],
    },
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <CommandPaletteProvider>{children}</CommandPaletteProvider>
        <Script id="plausible-loader" strategy="lazyOnload">
          {`
            if (typeof navigator === 'undefined' || navigator.doNotTrack !== '1') {
              const script = document.createElement('script');
              script.src = 'https://plausible.io/js/script.js';
              script.defer = true;
              script.setAttribute('data-domain', '${siteConfig.domain}');
              script.setAttribute('data-api', 'https://plausible.io/api/event');
              document.head.appendChild(script);
            }
          `}
        </Script>
      </body>
    </html>
  )
}
