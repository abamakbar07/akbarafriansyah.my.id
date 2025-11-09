'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const linkGroups = [
  {
    title: 'Explore',
    links: [
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: '/essays', label: 'Essays' },
    ],
  },
  {
    title: 'Now',
    links: [
      { href: '/now', label: 'Now' },
      { href: '/quotes', label: 'Quotes' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: 'mailto:hello@akbarafriansyah.my.id', label: 'Email' },
    ],
  },
]

export function FooterLinks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="grid gap-6 text-sm text-muted sm:grid-cols-3">
      {linkGroups.map((group, index) => (
        <motion.div
          key={group.title}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {group.title}
          </p>
          <ul className="space-y-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-1 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-peach focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
