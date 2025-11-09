import '../styles/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'

import { siteConfig } from '@/lib/site'

import { Container } from './components/container'
import { CommandPaletteProvider } from './components/command-palette'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.tagline,
    template: `%s — ${siteConfig.author}`,
  },
  description: siteConfig.description,
  keywords: [
    'Akbar Afriansyah',
    'Muhamad Akbar Afriansyah',
    'product design',
    'essays',
    'projects',
    'portfolio',
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.author,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-background text-foreground antialiased font-sans">
        <CommandPaletteProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 py-16">
              <Container className="flex flex-1 flex-col gap-16">
                {children}
              </Container>
            </main>
            <SiteFooter />
          </div>
        </CommandPaletteProvider>
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
