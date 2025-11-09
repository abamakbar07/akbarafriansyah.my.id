'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { slugify } from '@/lib/slugify'

const CommandPaletteContext = createContext(null)

const NAVIGATION_COMMANDS = [
  { href: '/', label: 'Home', keywords: ['start', 'intro'] },
  { href: '/about', label: 'About', keywords: ['biography', 'story'] },
  { href: '/projects', label: 'Projects', keywords: ['work', 'builds'] },
  { href: '/essays', label: 'Essays', keywords: ['writing', 'articles'] },
  { href: '/now', label: 'Now', keywords: ['status', 'current'] },
  { href: '/quotes', label: 'Quotes', keywords: ['inspiration'] },
  { href: '/contact', label: 'Contact', keywords: ['reach', 'email'] },
]

function isEditableElement(target) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return (
    target.isContentEditable ||
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    target.getAttribute('role') === 'textbox'
  )
}

function getDocumentHeadings() {
  const headings = Array.from(
    document.querySelectorAll('article[data-prose] h2, article[data-prose] h3')
  )
  return headings.map((element) => {
    if (!element.id) {
      element.id = slugify(element.textContent ?? 'section')
    }
    return {
      id: element.id,
      element,
      offset: element.getBoundingClientRect().top + window.scrollY,
      title: (element.textContent ?? 'Section').trim(),
    }
  })
}

export function CommandPaletteProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const announce = useCallback((message) => {
    setAnnouncement('')
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        setAnnouncement(message)
      })
    } else {
      setAnnouncement(message)
    }
  }, [])

  const openPalette = useCallback(() => {
    setOpen(true)
    announce('Command palette opened')
  }, [announce])

  const closePalette = useCallback(() => {
    setOpen(false)
    announce('Command palette closed')
  }, [announce])

  const togglePalette = useCallback(() => {
    setOpen((value) => {
      const next = !value
      announce(next ? 'Command palette opened' : 'Command palette closed')
      return next
    })
  }, [announce])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const scrollToHeading = useCallback(
    (direction) => {
      const headings = getDocumentHeadings()
      if (headings.length === 0) {
        announce('No sections available for navigation')
        return
      }
      const current = window.scrollY + 8
      const targetHeading =
        direction === 1
          ? headings.find((heading) => heading.offset > current + 4)
          : [...headings].reverse().find((heading) => heading.offset < current - 4)

      if (!targetHeading) {
        announce(direction === 1 ? 'Already at the final section' : 'Already at the first section')
        return
      }

      targetHeading.element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' })
      const spokenTitle = targetHeading.title || 'section'
      announce(`Moved to section ${spokenTitle}`)
    },
    [announce, shouldReduceMotion]
  )

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
    announce('Returned to the top of the page')
  }, [announce, shouldReduceMotion])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (event.defaultPrevented) return

      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault()
        if (open) {
          closePalette()
        } else {
          openPalette()
        }
        return
      }

      if (open) {
        if (key === 'escape') {
          event.preventDefault()
          closePalette()
        }
        return
      }

      if (isEditableElement(event.target)) {
        return
      }

      if (key === 'j') {
        event.preventDefault()
        scrollToHeading(1)
      } else if (key === 'k') {
        event.preventDefault()
        scrollToHeading(-1)
      } else if (key === 't') {
        event.preventDefault()
        scrollToTop()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, openPalette, closePalette, scrollToHeading, scrollToTop])

  const value = useMemo(
    () => ({ open, openPalette, closePalette, togglePalette }),
    [open, openPalette, closePalette, togglePalette]
  )

  const handleCommandSelect = useCallback(
    (href, label) => {
      announce(`Navigating to ${label}`)
      router.push(href)
    },
    [announce, router]
  )

  const palette = mounted ? (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="command-overlay"
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pb-20 pt-24"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          onClick={closePalette}
        >
          <motion.div
            className="w-full max-w-xl"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <Command.Dialog
              open={open}
              onOpenChange={(next) => (next ? openPalette() : closePalette())}
              label="Site command palette"
              className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#181818]/95 text-foreground shadow-[0_40px_60px_-40px_rgba(0,0,0,0.7)] backdrop-blur"
            >
              <div className="flex items-center gap-3 border-b border-white/10 bg-[#1f1f1f]/70 px-4 py-3">
                <Command.Input
                  autoFocus
                  placeholder="Jump to a page or search for a section..."
                  className="w-full rounded-md bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f]"
                />
                <kbd className="hidden rounded-md border border-white/20 bg-[#121212] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted sm:inline-flex">
                  ⌘K
                </kbd>
              </div>
              <Command.List className="max-h-[320px] overflow-y-auto px-2 py-3 text-sm text-[#d9d7d7]">
                <Command.Empty className="px-4 py-8 text-center text-xs uppercase tracking-[0.3em] text-muted">
                  No matches found
                </Command.Empty>
                <Command.Group
                  heading="Navigate"
                  headingClassName="px-2 pb-2 text-xs uppercase tracking-[0.25em] text-muted"
                  className="space-y-1"
                >
                  {NAVIGATION_COMMANDS.map((command) => (
                    <Command.Item
                      key={command.href}
                      value={command.label}
                      keywords={command.keywords}
                      onSelect={() => handleCommandSelect(command.href, command.label)}
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-peach focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] data-[active]:bg-accent-lavender/15 data-[active]:text-foreground hover:bg-accent-lavender/10 hover:text-foreground"
                    >
                      <span>{command.label}</span>
                      <span
                        className={`text-[11px] font-medium uppercase tracking-[0.35em] ${
                          command.href === pathname ? 'text-accent-peach' : 'text-muted'
                        }`}
                      >
                        {command.href === pathname ? 'CURRENT' : ''}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command.Dialog>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  ) : null

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      {mounted && createPortal(
        <>
          {palette}
          <span aria-live="polite" role="status" className="sr-only">
            {announcement}
          </span>
        </>,
        document.body
      )}
    </CommandPaletteContext.Provider>
  )
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext)
  if (!context) {
    throw new Error('useCommandPalette must be used within CommandPaletteProvider')
  }
  return context
}

export function CommandMenuTrigger({ className = '' }) {
  const { openPalette } = useCommandPalette()
  return (
    <button
      type="button"
      onClick={openPalette}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1c1c]/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted transition-colors hover:border-accent-lavender hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e1e] ${className}`.trim()}
      aria-label="Open command palette"
      aria-keyshortcuts="Meta+K, Control+K"
    >
      <span className="hidden sm:inline">Command</span>
      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#141414] px-1.5 py-0.5 text-[10px] tracking-[0.25em] text-muted">
        ⌘K
      </span>
    </button>
  )
}
