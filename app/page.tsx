import { getProfile } from '@/lib/profile'

import VirtualIdCard from './(site)/components/virtual-id-card'

export default async function Home(): Promise<JSX.Element> {
  const profile = await getProfile()

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <VirtualIdCard profile={profile} />
    </main>
  )
}
