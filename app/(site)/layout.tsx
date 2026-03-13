import type { ReactNode } from 'react'

import { getProfile } from '@/lib/profile'

import { Container } from '../components/container'
import { SiteFooter } from '../components/site-footer'
import { SiteHeader } from '../components/site-header'

export default async function SiteLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const profile = await getProfile()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-16">
        <Container className="flex flex-1 flex-col gap-16">{children}</Container>
      </main>
      <SiteFooter profile={profile} />
    </div>
  )
}
