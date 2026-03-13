'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-react'

import type { ProfileSocial } from '@/lib/profile'

type SocialLink = {
  href: string
  label: string
  icon: LucideIcon
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const defaultSocials: SocialLink[] = [
  {
    href: 'https://github.com/abamakbar07',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/akbarafriansyah',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'mailto:hai@akbarafriansyah.my.id',
    label: 'Email',
    icon: Mail,
  },
]

function toSocialLinks(socials?: ProfileSocial[]): SocialLink[] {
  if (!socials || socials.length === 0) return defaultSocials

  const links = socials
    .map((social) => {
      const key = social.icon?.toLowerCase() ?? ''
      const icon = iconMap[key] ?? Mail

      return {
        href: social.href,
        label: social.label,
        icon,
      }
    })
    .filter((social) => social.href && social.label)

  return links.length > 0 ? links : defaultSocials
}

type SocialIconsProps = {
  className?: string
  socials?: ProfileSocial[]
}

export function SocialIcons({ className = '', socials }: SocialIconsProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion()
  const links = toSocialLinks(socials)

  return (
    <motion.ul
      className={`flex items-center gap-4 ${className}`.trim()}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {links.map((social) => {
        const Icon = social.icon
        return (
          <motion.li key={social.href} whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}>
            <Link
              href={social.href}
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 text-muted transition-colors duration-200 hover:border-accent-lavender hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-peach focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
