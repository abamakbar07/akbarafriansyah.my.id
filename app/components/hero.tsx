import Link from 'next/link'

import { Badge } from './badge'
import { Container } from './container'

const metrics = ['Reduced reporting time by 80%', 'Improved stock accuracy to 99.6%', 'Led 5+ cross-site STO operations']

export function Hero(): JSX.Element {
  return (
    <section className="border-b border-[#2b2b2b] py-16 sm:py-20">
      <Container>
        <div className="space-y-7">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-teal">Warehouse & Inventory Leadership Portfolio</p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-3xl font-bold text-foreground sm:text-5xl">
              Muhamad Akbar Afriansyah — Driving Operational Excellence Through Data & Process Leadership
            </h1>
            <p className="max-w-3xl text-sm text-muted sm:text-lg">
              Warehouse & Inventory Team Leader focused on building reliable inventory systems, automating reporting workflows,
              and scaling cross-functional execution for telecom and 3PL operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <Badge key={metric} tone="metric">
                {metric}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-lg bg-accent-lavender px-5 py-2 text-sm font-semibold text-black hover:opacity-90">
              View Projects
            </Link>
            <Link href="/contact" className="rounded-lg border border-[#3a3a3a] px-5 py-2 text-sm font-semibold text-foreground hover:border-accent-lavender">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
