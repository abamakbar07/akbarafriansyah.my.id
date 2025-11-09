'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type TypewriterIntroProps = {
  phrases?: string[]
  typingSpeed?: number
  pauseBetween?: number
}

type UseTypewriterOptions = Required<Omit<TypewriterIntroProps, 'phrases'>> & {
  phrases: string[]
}

type UseTypewriterReturn = {
  lines: string[]
  activeIndex: number
  isComplete: boolean
  skip: () => void
}

function useTypewriter({ phrases, typingSpeed, pauseBetween }: UseTypewriterOptions): UseTypewriterReturn {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (!skipped || phrases.length === 0) return

    setIndex(phrases.length - 1)
    setSubIndex(phrases[phrases.length - 1]?.length ?? 0)
    setIsComplete(true)
  }, [phrases, skipped])

  useEffect(() => {
    if (phrases.length === 0) return
    if (skipped || isComplete) return

    const currentPhrase = phrases[index] ?? ''

    if (subIndex < currentPhrase.length) {
      const timeout = setTimeout(() => setSubIndex((value) => value + 1), typingSpeed)
      return () => clearTimeout(timeout)
    }

    if (index === phrases.length - 1) {
      setIsComplete(true)
      return
    }

    const pause = setTimeout(() => {
      setIndex((value) => value + 1)
      setSubIndex(0)
    }, pauseBetween)

    return () => clearTimeout(pause)
  }, [index, subIndex, phrases, typingSpeed, pauseBetween, skipped, isComplete])

  const lines = useMemo(
    () =>
      phrases.map((phrase, phraseIndex) => {
        if (phraseIndex < index) return phrase
        if (phraseIndex === index) return phrase.slice(0, subIndex)
        return ''
      }),
    [phrases, index, subIndex]
  )

  const skip = useCallback(() => {
    setSkipped((value) => (value ? value : true))
  }, [])

  return {
    lines,
    activeIndex: index,
    isComplete,
    skip,
  }
}

const DEFAULT_PHRASES = [
  'Hi, I\'m Akbar — a rational dreamer crafting thoughtful web experiences.',
  'I write, design, and build serene digital spaces for curious minds.',
]

export default function TypewriterIntro({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 42,
  pauseBetween = 900,
}: TypewriterIntroProps) {
  const shouldReduceMotion = useReducedMotion()
  const { lines, activeIndex, isComplete, skip } = useTypewriter({
    phrases,
    typingSpeed,
    pauseBetween,
  })

  useEffect(() => {
    if (shouldReduceMotion) {
      skip()
    }
  }, [shouldReduceMotion, skip])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (event.key === 'Escape' || (key === 's' && !event.metaKey && !event.ctrlKey)) {
        event.preventDefault()
        skip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [skip])

  return (
    <div className="space-y-8">
      <div className="space-y-4" aria-live="polite">
        {lines.map((line, index) => {
          const isActiveLine = index === activeIndex
          const isVisible = index < activeIndex || isActiveLine || line.length > 0

          if (!isVisible) {
            return null
          }

          return (
            <motion.p
              key={index}
              className="font-display text-3xl leading-relaxed text-foreground sm:text-4xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : index * 0.12,
              }}
            >
              <span>{line}</span>
              {isActiveLine && !isComplete && (
                <motion.span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-6 w-0.5 align-middle bg-accent-peach"
                  animate={shouldReduceMotion ? {} : { opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.p>
          )
        })}
      </div>
      {!isComplete && (
        <button
          type="button"
          onClick={skip}
          className="rounded-full border border-muted/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-200 hover:border-accent-lavender hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender"
          aria-keyshortcuts="Esc, S"
        >
          Skip intro
        </button>
      )}
    </div>
  )
}
