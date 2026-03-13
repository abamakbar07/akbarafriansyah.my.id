import { NextRequest, NextResponse } from 'next/server'

import { getProfile } from '@/lib/profile'

function getCacheControl(searchParams: URLSearchParams): string | null {
  const cache = searchParams.get('cache')

  if (cache === 'no-store') {
    return 'no-store'
  }

  if (cache === 'public') {
    const maxAge = Number(searchParams.get('maxAge') ?? '300')
    const safeMaxAge = Number.isFinite(maxAge) && maxAge >= 0 ? Math.floor(maxAge) : 300
    const staleWhileRevalidate = safeMaxAge * 2

    return `public, max-age=${safeMaxAge}, s-maxage=${safeMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  }

  return null
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const profileData = await getProfile()
  const cacheControl = getCacheControl(request.nextUrl.searchParams)

  return NextResponse.json(profileData, {
    headers: cacheControl ? { 'Cache-Control': cacheControl } : undefined,
  })
}
