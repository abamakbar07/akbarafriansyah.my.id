import TypewriterIntro from './(site)/components/typewriter-intro'

export default function Home(): JSX.Element {
  return (
    <section className="space-y-12">
      <TypewriterIntro />
      <div className="space-y-6 text-base text-muted">
        <p className="max-w-narrative font-serif text-lg leading-narrative text-foreground">
          I steward Ericsson telecom projects at PT DSV Solutions Indonesia, balancing SAP MM/WMS operations with the human
          rhythms of warehouse teams. Accurate stock, resilient processes, and calm decision-making are the daily craft.
        </p>
        <p className="max-w-narrative font-serif">
          Outside the floor, I prototype serene digital tools—Next.js dashboards, Python automations, and Supabase-backed
          experiments that help logistics data breathe. Each build follows the same mantra: "Automate what feels repetitive.
          Simplify what feels complex."
        </p>
        <p className="max-w-narrative font-serif">
          This site collects those learnings: project breakdowns from StockFlow to family THR gacha games, essays on
          thoughtful operations, and field notes from my journey into data science. Settle in; curiosity is the compass here.
        </p>
        <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.3em] text-muted sm:flex-row sm:items-center">
          <span className="text-accent-teal">Currently leading nationwide STO coordination</span>
          <span className="hidden h-px flex-1 bg-muted sm:block" aria-hidden="true" />
          <span className="text-muted">Documenting the Supervisor Development Program</span>
        </div>
      </div>
    </section>
  )
}
