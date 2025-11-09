'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/essays', label: 'Essays' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav
      aria-label="Primary"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <ul className="flex items-center gap-6 text-sm font-medium tracking-wide text-muted">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <motion.li
              key={item.href}
              className="relative"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                href={item.href}
                className={`transition-colors duration-200 ease-out hover:text-foreground ${
                  isActive ? 'text-foreground' : 'text-muted'
                }`}
              >
                {item.label}
              </Link>
              {isActive && (
                <span className="absolute inset-x-0 -bottom-1 block h-0.5 rounded-full bg-accent-lavender" />
              )}
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
