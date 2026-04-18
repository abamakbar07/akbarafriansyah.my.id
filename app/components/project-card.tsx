import Link from 'next/link'

import type { ContentMeta } from '@/lib/mdx'

import { Badge } from './badge'

type ProjectCardProps = {
  project: ContentMeta
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-2xl border border-[#2f2f2f] bg-[#141414] p-5 transition hover:border-accent-lavender/60 hover:bg-[#1a1a1a]"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-peach">{project.title}</h3>
          {project.summary ? <p className="text-sm text-muted">{project.summary}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.category ? <Badge>{project.category}</Badge> : null}
          {project.tags?.slice(0, 2).map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        {project.impact ? <Badge tone="metric">Impact: {project.impact}</Badge> : null}
      </div>
    </Link>
  )
}
