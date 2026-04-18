import Link from 'next/link'

import { Hero } from './components/hero'
import { ProjectCard } from './components/project-card'
import { Section } from './components/section'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'
import { Timeline } from './components/timeline'
import { getCollection } from '@/lib/mdx'
import { getProfile } from '@/lib/profile'

const capabilityGroups = [
  {
    title: 'Inventory Optimization',
    tools: ['SAP MM', 'Cycle Count', 'Stock Reconciliation'],
  },
  {
    title: 'Warehouse Process Improvement',
    tools: ['SOP Design', 'Root Cause Analysis', 'Cross-Site Coordination'],
  },
  {
    title: 'Data Analysis & Reporting',
    tools: ['Power BI', 'Excel', 'Python (Pandas)'],
  },
  {
    title: 'Systems Leadership',
    tools: ['WMS', 'SAP', 'Operational Dashboarding'],
  },
]

const timelineItems = [
  {
    role: 'Warehouse Admin & SAP Specialist',
    company: 'PT DSV Solutions Indonesia',
    period: '2022 — Present',
    achievements: ['Managed Ericsson EID, IoH, and PDU inventory workflows', 'Led national STO coordination across multiple sites'],
  },
  {
    role: 'Supervisor Development Program (SDP-11)',
    company: 'PT DSV Solutions Indonesia',
    period: '2025 — Present',
    achievements: ['Selected as high-potential talent for leadership track', 'Drove initiatives for reporting automation and process discipline'],
  },
  {
    role: 'Computer Systems & Networking Graduate',
    company: 'Technical Foundation',
    period: '2019 — 2021',
    achievements: ['Built technical base in telecommunications and systems logic', 'Transitioned technical skills into practical logistics operations'],
  },
]

const achievements = [
  'Reduced recurring reporting cycle from ~3 hours to 20 minutes through automation',
  'Improved data integrity during stock take with structured validation tooling',
  'Built multiple production-ready internal and community dashboards',
  'Selected for DSV Supervisor Development Program (SDP-11)',
]

export default async function Home(): Promise<JSX.Element> {
  const [profile, projects] = await Promise.all([getProfile(), getCollection('projects')])
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-16">
        <Hero />

        <Section
          id="featured-projects"
          eyebrow="Featured Projects"
          title="Results-driven initiatives"
          description="Selected projects that demonstrate measurable impact across warehouse operations, reporting, and automation."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link href="/projects" className="inline-flex text-sm font-medium text-accent-peach">
            See full portfolio →
          </Link>
        </Section>

        <Section
          id="capabilities"
          eyebrow="Capabilities"
          title="Core leadership and execution strengths"
          description="Capabilities are grouped by the outcomes I drive, with the systems and tools used to deliver them."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="rounded-xl border border-[#2f2f2f] bg-[#141414] p-5">
                <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                <p className="mt-2 text-sm text-muted">{group.tools.join(' • ')}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="career"
          eyebrow="Career Timeline"
          title="Growth from technical specialist to team leadership"
          description="A focused track record in logistics operations, data systems, and people-centric execution."
        >
          <Timeline items={timelineItems} />
        </Section>

        <Section
          id="achievements"
          eyebrow="Achievements"
          title="Performance highlights"
          description="Key KPI improvements and professional milestones relevant to Lead and Assistant Manager roles."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <li key={achievement} className="rounded-xl border border-[#2f2f2f] bg-[#141414] p-4 text-sm text-muted">
                <span className="font-semibold text-accent-peach">●</span> {achievement}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Open to Lead / Assistant Manager opportunities"
          description="If you are hiring for warehouse operations leadership, inventory excellence, or process-improvement roles, let's connect."
        >
          <div className="rounded-2xl border border-[#2f2f2f] bg-[#141414] p-6 text-sm text-muted">
            <p>Email: muhamad.afriansyah@dsv.com</p>
            <p>LinkedIn: linkedin.com/in/muhamadakbarafriansyah</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-lg bg-accent-lavender px-5 py-2 font-semibold text-black">
                Contact Form
              </Link>
              <a href="/cv-akbar-afriansyah.pdf" className="rounded-lg border border-[#3a3a3a] px-5 py-2 font-semibold text-foreground">
                Download CV
              </a>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter profile={profile} />
    </div>
  )
}
