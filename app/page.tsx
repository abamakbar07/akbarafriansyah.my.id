import TypewriterIntro from './(site)/components/typewriter-intro'

export default function Home(): JSX.Element {
  return (
    <section className="space-y-12">
      <TypewriterIntro />
      <div className="space-y-6 text-base text-muted">
        <p className="max-w-narrative font-serif text-lg leading-narrative text-foreground">
          I’m Muhamad Akbar Afriansyah—Warehouse Admin & SAP Specialist at PT DSV Solutions Indonesia—currently steering
          Ericsson projects at PDU across the 3PL landscape. My daily craft spans SAP MM/WMS transactions,
          stock reconciliation rituals, and keeping nationwide Stock Take Operations serene for every site involved.
        </p>
        <p className="max-w-narrative font-serif">
          Years of reconciling MB52 exports with on-floor truth taught me to pair calm leadership with pragmatic tooling. I
          build dashboards in Next.js, automate audits with Python and VBA, and document every play so cross-site teams can
          pick it up fast. Accurate data is the baseline; human-friendly systems are the differentiator.
        </p>
        <p className="max-w-narrative font-serif">
          Off-shift, I explore side projects—StockFlow, a personal finance tracker, validation utilities, even a family THR
          gacha game—each testing how web apps, AI, and logistics sensibilities can overlap. I’m progressing through DSV’s
          Supervisor Development Program while self-studying statistics, SQL optimisation, and RAG patterns en route to data
          science.
        </p>
        <p className="max-w-narrative font-serif">
          This space is a living archive of that curiosity. You’ll find my project breakdowns, essays on technology and
          philosophy, and the principles guiding how an INTP brain keeps operations generous and dependable.
        </p>
        <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.3em] text-muted sm:flex-row sm:items-center">
          <span className="text-accent-teal">Supervisor Development Program cohort 11</span>
          <span className="hidden h-px flex-1 bg-muted sm:block" aria-hidden="true" />
          <span className="text-muted">Automate what feels repetitive. Simplify what feels complex.</span>
        </div>
      </div>
    </section>
  )
}
