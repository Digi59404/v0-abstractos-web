import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { defaultLocale, type Locale } from '@/i18n/config'

/** Every blog post and documentation page is read from this folder, and only this folder. */
export const CONTENT_DIR = path.join(process.cwd(), 'content')

export type ContentFile = {
  /** Path relative to the locale folder, without extension, e.g. "blog/posts/hello". */
  id: string
  data: Record<string, unknown>
  body: string
  /** Locale the file was actually read from (falls back to the default locale). */
  locale: Locale
}

const cacheEnabled = process.env.NODE_ENV === 'production'
const cache = new Map<string, unknown>()

/** Memoises expensive content reads in production; always re-reads in development. */
export function cached<T>(key: string, load: () => T): T {
  if (!cacheEnabled) return load()
  if (!cache.has(key)) cache.set(key, load())
  return cache.get(key) as T
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.md') ? [full] : []
  })
}

function listIds(locale: Locale, subdir: string) {
  const base = path.join(CONTENT_DIR, locale)
  return walk(path.join(base, subdir)).map((file) => path.relative(base, file).replace(/\\/g, '/').replace(/\.md$/, ''))
}

function readFile(locale: Locale, id: string): ContentFile | undefined {
  for (const candidate of new Set([locale, defaultLocale])) {
    const file = path.join(CONTENT_DIR, candidate, `${id}.md`)
    if (fs.existsSync(file)) {
      const { data, content } = matter(fs.readFileSync(file, 'utf8'))
      return { id, data, body: content.trim(), locale: candidate }
    }
  }
}

/**
 * Reads every Markdown file under `content/<locale>/<subdir>`.
 * Files missing from a translation fall back to the default locale,
 * so partially translated sites still render complete.
 */
export function readCollection(locale: Locale, subdir: string): ContentFile[] {
  const ids = new Set([...listIds(defaultLocale, subdir), ...listIds(locale, subdir)])
  return [...ids].sort().flatMap((id) => readFile(locale, id) ?? [])
}

export const str = (value: unknown, fallback = '') => (typeof value === 'string' ? value : value == null ? fallback : String(value))
export const num = (value: unknown, fallback = 0) => (typeof value === 'number' ? value : Number(value ?? fallback) || fallback)
export const strList = (value: unknown) => (Array.isArray(value) ? value.map(String) : [])
