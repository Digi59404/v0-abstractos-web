/**
 * To add a language:
 *   1. Copy `messages/en.json` to `messages/<code>.json` and translate it.
 *   2. Register it in `locales`, `localeNames` and `i18n/messages.ts`.
 *   3. Optionally add translated Markdown under `content/<code>/` (missing files fall back to English).
 */
export const locales = ['en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
}

/** BCP 47 tags used for date and number formatting. */
export const localeTags: Record<Locale, string> = {
  en: 'en-US',
}

export const LOCALE_COOKIE = 'NEXT_LOCALE'

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

const rtlLanguages = new Set(['ar', 'fa', 'he', 'ur'])

export function localeDir(locale: Locale): 'ltr' | 'rtl' {
  return rtlLanguages.has(locale.split('-')[0]) ? 'rtl' : 'ltr'
}

/** Removes a leading `/<locale>` so active-link checks work on shared, prefixed URLs. */
export function stripLocale(pathname: string) {
  const first = pathname.split('/')[1]
  return isLocale(first) ? pathname.slice(first.length + 1) || '/' : pathname
}
