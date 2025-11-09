'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { Container } from './container'
import { Navigation } from './navigation'

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/5 backdrop-blur"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Container className="flex items-center justify-between py-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Link href="/" className="font-display text-sm uppercase tracking-[0.3em] text-muted hover:text-foreground">
            Muhamad Akbar Afriansyah
          </Link>
        </motion.div>
        <Navigation />
      </Container>
    </motion.header>
  )
}
