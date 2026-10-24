import en from '@/messages/en.json'
import { defaultLocale, type Locale } from '@/i18n/config'

/** The shape of a language pack. English is the source of truth for every key. */
export type Messages = typeof en

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

/**
 * Register language packs here. Packs may be partial: any missing key
 * falls back to English so a half-finished translation never breaks a page.
 */
const packs: Record<Locale, DeepPartial<Messages>> = {
  en,
}

function merge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (!override) return base
  const result = (Array.isArray(base) ? [...base] : { ...(base as object) }) as Record<string, unknown>
  for (const [key, value] of Object.entries(override)) {
    const current = (base as Record<string, unknown>)[key]
    result[key] =
      value && typeof value === 'object' && !Array.isArray(value) && current && typeof current === 'object'
        ? merge(current, value as DeepPartial<typeof current>)
        : value
  }
  return result as T
}

const resolved = new Map<Locale, Messages>()

export function getMessages(locale: Locale): Messages {
  if (locale === defaultLocale) return en
  if (!resolved.has(locale)) resolved.set(locale, merge(en, packs[locale]))
  return resolved.get(locale)!
}
