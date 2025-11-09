import '../styles/globals.css'
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'

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

export const metadata = {
  title: 'akbarafriansyah.my.id',
  description: 'A reflective digital home for Muhamad Akbar Afriansyah.',
}

export default function RootLayout({ children }) {
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
      </body>
    </html>
  )
}
