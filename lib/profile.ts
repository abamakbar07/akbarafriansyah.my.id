import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type ProfileSocial = {
  label: string
  href: string
  icon?: string
}

export type ProfileStat = {
  label: string
  value: string
}

export type Profile = {
  name: string
  headline: string
  company: string
  location: string
  bioShort: string
  tagline: string
  socials: ProfileSocial[]
  highlights: string[]
  stats?: ProfileStat[]
}

const DEFAULT_PROFILE: Profile = {
  name: 'Muhamad Akbar Afriansyah',
  headline: 'Warehouse Admin & SAP Specialist',
  company: 'PT DSV Solutions Indonesia',
  location: 'Jakarta, Indonesia',
  bioShort: 'I build calm logistics workflows with SAP discipline, automation, and clear documentation.',
  tagline: 'Automate what feels repetitive. Simplify what feels complex.',
  socials: [],
  highlights: [],
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asSocials(value: unknown): ProfileSocial[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is Record<string, unknown> => isRecord(item))
    .map((item) => ({
      label: asString(item.label).trim(),
      href: asString(item.href).trim(),
      icon: asString(item.icon).trim() || undefined,
    }))
    .filter((social) => social.label.length > 0 && social.href.length > 0)
}

function asHighlights(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
}

function asStats(value: unknown): ProfileStat[] | undefined {
  if (!Array.isArray(value)) return undefined

  const stats = value
    .filter((item): item is Record<string, unknown> => isRecord(item))
    .map((item) => ({
      label: asString(item.label).trim(),
      value: asString(item.value).trim(),
    }))
    .filter((stat) => stat.label.length > 0 && stat.value.length > 0)

  return stats.length > 0 ? stats : undefined
}

function normalizeProfile(value: unknown): Profile {
  if (!isRecord(value)) {
    console.warn('[profile] Expected profile JSON to be an object. Falling back to defaults.')
    return DEFAULT_PROFILE
  }

  return {
    name: asString(value.name, DEFAULT_PROFILE.name),
    headline: asString(value.headline, DEFAULT_PROFILE.headline),
    company: asString(value.company, DEFAULT_PROFILE.company),
    location: asString(value.location, DEFAULT_PROFILE.location),
    bioShort: asString(value.bioShort, DEFAULT_PROFILE.bioShort),
    tagline: asString(value.tagline, DEFAULT_PROFILE.tagline),
    socials: asSocials(value.socials),
    highlights: asHighlights(value.highlights),
    stats: asStats(value.stats),
  }
}

function parseProfileJson(source: string): unknown {
  try {
    return JSON.parse(source)
  } catch (error) {
    console.warn('[profile] Invalid JSON in content/profile.json. Falling back to defaults.', error)
    return DEFAULT_PROFILE
  }
}

export async function getProfile(): Promise<Profile> {
  const filePath = path.join(process.cwd(), 'content', 'profile.json')

  try {
    const source = await readFile(filePath, 'utf8')
    return normalizeProfile(parseProfileJson(source))
  } catch (error) {
    console.warn('[profile] Unable to read content/profile.json. Falling back to defaults.', error)
    return DEFAULT_PROFILE
  }
}
