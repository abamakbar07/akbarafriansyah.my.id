import TypewriterIntro from './(site)/components/typewriter-intro'

export default function Home(): JSX.Element {
  return (
    <section className="space-y-12">
      <TypewriterIntro />
      <div className="space-y-6 text-base text-muted">
        <p className="max-w-narrative font-serif text-lg leading-narrative text-foreground">
          I build digital narratives that feel like slow mornings—unhurried, intentional, and grounded in curiosity.
          From strategy to shipped product, every detail is considered for clarity and calm.
        </p>
        <p className="max-w-narrative font-serif">
          This home will grow with essays, experiments, and in-depth notes on design systems, interaction patterns, and the
          philosophy of building humane software. Stay a while; explore the ideas in motion.
        </p>
        <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.3em] text-muted sm:flex-row sm:items-center">
          <span className="text-accent-teal">Currently documenting the craft</span>
          <span className="hidden h-px flex-1 bg-muted sm:block" aria-hidden="true" />
          <span className="text-muted">Writing weekly field notes</span>
        </div>
      </div>
    </section>
  )
}
