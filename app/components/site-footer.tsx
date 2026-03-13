'use client'

import { motion, useReducedMotion } from 'framer-motion'

import type { Profile } from '@/lib/profile'

import { Container } from './container'
import { FooterLinks } from './footer-links'
import { SocialIcons } from './social-icons'

type SiteFooterProps = {
  profile: Pick<Profile, 'name' | 'bioShort' | 'tagline' | 'location' | 'socials'>
}

export function SiteFooter({ profile }: SiteFooterProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion()

  const name = profile.name || 'Muhamad Akbar Afriansyah'
  const bioShort =
    profile.bioShort || 'A reflective space documenting ideas, experiments, and an ongoing practice of craftsmanship.'
  const tagline = profile.tagline || 'Clarity through simplicity'
  const location = profile.location || 'Jakarta'

  return (
    <motion.footer
      className="border-t border-white/5 py-12 text-sm text-muted"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{tagline}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{bioShort}</p>
          </div>
          <SocialIcons socials={profile.socials} />
        </div>
        <FooterLinks />
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {name}. Crafted in {location}.
        </p>
      </Container>
    </motion.footer>
  )
}
