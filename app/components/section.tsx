import type { ReactNode } from 'react'

import { Container } from './container'

type SectionProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, description, children }: SectionProps): JSX.Element {
  return (
    <section id={id} className="py-10 sm:py-14">
      <Container>
        <div className="space-y-6">
          <header className="space-y-3">
            {eyebrow ? <p className="text-xs uppercase tracking-[0.25em] text-accent-teal">{eyebrow}</p> : null}
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
            {description ? <p className="max-w-3xl text-sm text-muted sm:text-base">{description}</p> : null}
          </header>
          {children}
        </div>
      </Container>
    </section>
  )
}
