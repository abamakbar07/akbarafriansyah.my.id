'use client'

import { useMemo, useState } from 'react'

import type { ContentMeta } from '@/lib/mdx'

import { ProjectCard } from './project-card'

const categories = ['All', 'Data Analysis', 'Automation / Tools', 'Warehouse Operations', 'Side Projects']

type ProjectsFilterProps = {
  projects: ContentMeta[]
}

export function ProjectsFilter({ projects }: ProjectsFilterProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory, projects])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                isActive ? 'bg-accent-lavender text-black' : 'bg-[#242424] text-muted hover:text-foreground'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
