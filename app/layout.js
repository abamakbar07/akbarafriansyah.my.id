import '../styles/globals.css'
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus'
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif'
})

export const metadata = {
  title: 'akbarafriansyah.my.id',
  description: 'A minimal Next.js starter'
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-background text-foreground antialiased font-sans">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
