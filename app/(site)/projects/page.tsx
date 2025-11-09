import Link from 'next/link';
import { MetadataBadges } from '../components/metadata-badges';
import { getCollection } from '@/lib/mdx';

export const metadata = {
  title: 'Projects — Akbar Afriansyah',
  description: 'Case studies and process notes from ongoing experiments.',
};

export default async function ProjectsPage() {
  const projects = await getCollection('projects');

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#89a8b2]">Projects</p>
        <h1 className="text-4xl font-semibold text-[#e0dede]">Selected Work</h1>
        <p className="max-w-2xl text-[#bdbbbb]">
          Projects that explore how attentive research, soft interfaces, and collaborative rituals can coexist.
        </p>
      </header>
      <div className="grid gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-2xl border border-[#2f2f2f] bg-[#141414] p-6 transition hover:border-[#3c3c3c] hover:bg-[#1a1a1a]"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#e0dede] transition group-hover:text-[#ffd7b5]">
                {project.title}
              </h2>
              {project.summary ? <p className="text-[#bdbbbb]">{project.summary}</p> : null}
              <MetadataBadges
                publishedAt={project.publishedAt}
                updatedAt={project.updatedAt}
                readingTime={project.readingTime}
                tags={project.tags}
                status={project.status}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
