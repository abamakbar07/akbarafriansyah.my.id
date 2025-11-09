import React from 'react'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { siteConfig } from '@/lib/site'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? siteConfig.tagline
  const label = searchParams.get('type') ?? 'Akbar Afriansyah'
  const description =
    searchParams.get('description') ?? 'Reflections on craft, research, and mindful collaboration.'

  const card = React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: '#1e1e1e',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(137,168,178,0.35), transparent 55%), radial-gradient(circle at 80% 30%, rgba(200,162,200,0.4), transparent 60%)',
        color: '#e0dede',
        padding: '96px',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '880px',
        },
      },
      React.createElement(
        'span',
        {
          style: {
            fontSize: 32,
            letterSpacing: 10,
            textTransform: 'uppercase',
            color: '#89a8b2',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          },
        },
        label
      ),
      React.createElement(
        'h1',
        {
          style: {
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.1,
            fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
          },
        },
        title
      ),
      React.createElement(
        'p',
        {
          style: {
            fontSize: 28,
            color: '#bdbbbb',
            lineHeight: 1.5,
            fontFamily: 'Source Serif Pro, serif',
          },
        },
        description
      )
    ),
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 28,
          fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
          color: '#ffd7b5',
        },
      },
      React.createElement('span', null, siteConfig.author),
      React.createElement('span', null, new URL(siteConfig.url).host)
    )
  )

  return new ImageResponse(card, size)
}
