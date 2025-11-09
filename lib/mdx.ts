import fs from 'fs/promises';
import path from 'path';
import type { ReactNode } from 'react';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/app/(site)/components/mdx-components';

export type ContentMeta = {
  slug: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  status?: string;
  readingTime: number;
};

export type ContentEntry = {
  meta: ContentMeta;
  content: ReactNode;
};

type CollectionName =
  | 'about'
  | 'contact'
  | 'essays'
  | 'now'
  | 'projects'
  | 'quotes';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function resolveCollectionPath(collection: CollectionName) {
  return path.join(CONTENT_ROOT, collection);
}

function estimateReadingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function normalizeTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((value) => String(value));
  }
  if (typeof input === 'string' && input.length > 0) {
    return input.split(',').map((value) => value.trim()).filter(Boolean);
  }
  return [];
}

function buildMeta(
  collection: CollectionName,
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string
): ContentMeta {
  return {
    slug,
    title: String(frontmatter.title ?? slug),
    summary: frontmatter.summary ? String(frontmatter.summary) : undefined,
    publishedAt: frontmatter.publishedAt ? String(frontmatter.publishedAt) : undefined,
    updatedAt: frontmatter.updatedAt ? String(frontmatter.updatedAt) : undefined,
    tags: normalizeTags(frontmatter.tags),
    status: frontmatter.status ? String(frontmatter.status) : undefined,
    readingTime: estimateReadingTime(body),
  };
}

async function readFileSafely(filePath: string) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export async function getCollection(collection: CollectionName): Promise<ContentMeta[]> {
  const collectionPath = resolveCollectionPath(collection);
  const entries: ContentMeta[] = [];
  let filenames: string[] = [];

  try {
    filenames = await fs.readdir(collectionPath);
  } catch (error) {
    return entries;
  }

  await Promise.all(
    filenames
      .filter((file) => file.endsWith('.mdx'))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(collectionPath, filename);
        const raw = await fs.readFile(fullPath, 'utf8');
        const parsed = matter(raw);
        entries.push(buildMeta(collection, slug, parsed.data, parsed.content));
      })
  );

  return entries.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
}

export async function getEntry(collection: CollectionName, slug: string): Promise<ContentEntry | null> {
  const fullPath = path.join(resolveCollectionPath(collection), `${slug}.mdx`);
  const raw = await readFileSafely(fullPath);
  if (!raw) {
    return null;
  }

  const parsed = matter(raw);
  const compiled = await compileMDX({
    source: raw,
    components: mdxComponents,
  });

  return {
    meta: buildMeta(collection, slug, compiled.frontmatter ?? parsed.data, parsed.content),
    content: compiled.content,
  };
}

export async function getSingleton(collection: Exclude<CollectionName, 'essays' | 'projects'>) {
  return getEntry(collection, 'index');
}

export async function getAllSlugs(collection: CollectionName) {
  const meta = await getCollection(collection);
  return meta.map((entry) => entry.slug);
}
