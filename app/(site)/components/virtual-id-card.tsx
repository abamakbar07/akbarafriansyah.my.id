import Link from 'next/link'

const identityTags = ['SAP MM/WMS', 'Warehouse Ops', 'Automation', 'Next.js', 'Python', 'Data Analytics']

const cardLinks = [
  {
    href: '/contact',
    label: 'Contact',
    description: 'Open contact options',
  },
  {
    href: '/projects',
    label: 'Projects',
    description: 'Browse selected case studies',
  },
  {
    href: '/contact',
    label: 'Download CV',
    description: 'Request downloadable CV via contact page',
  },
]

export default function VirtualIdCard(): JSX.Element {
  return (
    <article className="w-full rounded-2xl border border-muted/40 bg-background/60 p-5 shadow-sm shadow-black/20 backdrop-blur sm:p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Virtual Identity Card</p>
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">Muhamad Akbar Afriansyah</h1>
          <dl className="space-y-2 text-sm text-muted sm:text-base">
            <div>
              <dt className="sr-only">Role</dt>
              <dd>Warehouse Admin &amp; SAP Specialist · PT DSV Solutions Indonesia</dd>
            </div>
            <div>
              <dt className="sr-only">Location</dt>
              <dd>Pekanbaru, Indonesia · Ericsson PDU Program</dd>
            </div>
          </dl>
        </header>

        <section className="space-y-4" aria-labelledby="identity-card-summary">
          <h2 id="identity-card-summary" className="text-sm uppercase tracking-[0.2em] text-muted">
            Summary
          </h2>
          <p className="font-serif text-base leading-relaxed text-foreground">
            I bridge logistics operations and software craft: reconciling stock with SAP precision, leading calm cross-site
            workflows, and building practical tools with Next.js, Python, and data-first thinking.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Core expertise tags">
            {identityTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-muted/40 bg-muted/10 px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-6 border-t border-muted/30 pt-4 sm:mt-8 sm:pt-5" aria-label="Identity card actions">
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {cardLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-flex w-full items-center justify-center rounded-full border border-muted/40 px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent-lavender hover:text-accent-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                aria-label={`${link.label}: ${link.description}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}
