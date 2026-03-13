'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

import type { Profile } from '@/lib/profile'
import { siteConfig } from '@/lib/site'

type VirtualIdCardProps = {
  profile: Profile
}

type CardSocial = {
  href: string
  label: string
  icon: typeof Github
}

const socialOrder = [
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'x', label: 'X', icon: Twitter },
] as const

function normalizeSocialLabel(label: string): string {
  const normalized = label.trim().toLowerCase()
  if (normalized === 'twitter') return 'x'
  return normalized
}

export default function VirtualIdCard({ profile }: VirtualIdCardProps): JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false)

  const socials = useMemo<CardSocial[]>(() => {
    const lookup = new Map(profile.socials.map((social) => [normalizeSocialLabel(social.label), social.href]))
    const xFallback = `https://x.com/${siteConfig.twitter.replace('@', '')}`

    return socialOrder.map(({ key, label, icon }) => {
      const href = lookup.get(key) ?? (key === 'x' ? xFallback : '#')
      return { href, label, icon }
    })
  }, [profile.socials])

  return (
    <div className="virtual-card-scene w-full max-w-xl">
      <button
        type="button"
        onClick={() => setIsFlipped((current) => !current)}
        className="group relative block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-pressed={isFlipped}
        aria-label={isFlipped ? 'Show front of virtual card' : 'Flip card to reveal socials'}
      >
        <div className={`virtual-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <article className="virtual-card-face rounded-2xl border border-muted/40 bg-background/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Virtual Card</p>
            <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">{profile.name}</h1>
            <p className="mt-3 text-base text-muted">
              {profile.headline} · {profile.company}
            </p>
            <p className="mt-2 text-sm text-muted">{profile.location}</p>
            <p className="mt-6 font-serif leading-relaxed text-foreground">{profile.bioShort}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent-lavender transition-colors group-hover:text-accent-peach">
              Tap to flip
            </p>
          </article>

          <article className="virtual-card-face virtual-card-back rounded-2xl border border-muted/40 bg-background/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Connect with me</p>
            <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">Social Media</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-muted/40 px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent-lavender hover:text-accent-lavender"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent-lavender">Tap to flip back</p>
          </article>
        </div>
      </button>
    </div>
  )
}
