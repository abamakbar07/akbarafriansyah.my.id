import '../styles/globals.css'

export const metadata = {
  title: 'akbarafriansyah.my.id',
  description: 'A minimal Next.js starter'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
