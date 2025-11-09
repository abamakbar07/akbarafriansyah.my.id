'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { Container } from './container'
import { FooterLinks } from './footer-links'
import { SocialIcons } from './social-icons'

export function SiteFooter() {
  const shouldReduceMotion = useReducedMotion()

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Clarity through simplicity
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              A reflective space documenting the ideas, experiments, and ongoing practice of Muhamad Akbar Afriansyah.
            </p>
          </div>
          <SocialIcons />
        </div>
        <FooterLinks />
        <p className="text-xs text-muted">© {new Date().getFullYear()} Muhamad Akbar Afriansyah. Crafted in Jakarta.</p>
      </Container>
    </motion.footer>
  )
}
