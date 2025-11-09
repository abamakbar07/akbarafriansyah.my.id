'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const socials = [
  {
    href: 'https://github.com/akbarafriansyah',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/akbarafriansyah',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'mailto:hello@akbarafriansyah.my.id',
    label: 'Email',
    icon: Mail,
  },
]

export function SocialIcons({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.ul
      className={`flex items-center gap-4 ${className}`.trim()}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <motion.li key={social.href} whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}>
            <Link
              href={social.href}
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 text-muted transition-colors duration-200 hover:border-accent-lavender hover:text-foreground"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
