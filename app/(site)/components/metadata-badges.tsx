import type { ReactNode } from 'react';

type MetadataBadgesProps = {
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  tags?: string[];
  status?: string;
};

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-[#1c1c1c] px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

function formatDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export function MetadataBadges({ publishedAt, updatedAt, readingTime, tags, status }: MetadataBadgesProps) {
  const formattedPublished = formatDate(publishedAt);
  const formattedUpdated = formatDate(updatedAt);

  return (
    <div className="flex flex-wrap gap-2">
      {formattedPublished ? <Badge>Published {formattedPublished}</Badge> : null}
      {formattedUpdated && formattedUpdated !== formattedPublished ? (
        <Badge>Updated {formattedUpdated}</Badge>
      ) : null}
      {typeof readingTime === 'number' ? <Badge>{readingTime} min read</Badge> : null}
      {status ? <Badge>{status}</Badge> : null}
      {tags?.map((tag) => (
        <Badge key={tag}>#{tag}</Badge>
      ))}
    </div>
  );
}
