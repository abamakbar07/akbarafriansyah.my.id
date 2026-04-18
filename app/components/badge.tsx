import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'default' | 'metric'
}

export function Badge({ children, tone = 'default' }: BadgeProps): JSX.Element {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'
  const toneClass =
    tone === 'metric' ? 'bg-accent-peach/20 text-accent-peach border border-accent-peach/40' : 'bg-[#242424] text-muted'

  return <span className={`${base} ${toneClass}`}>{children}</span>
}
