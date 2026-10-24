import { cache } from 'react'
import { notFound } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

const getStore = cache(() => ({ locale: defaultLocale as Locale }))

/**
 * Call once at the top of every layout and page with its `params`.
 * Validates the locale and makes it available to nested server components via `getI18n()`.
 */
export async function initI18n(params: Promise<{ locale: string }>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  getStore().locale = locale
  return getI18n()
}

/** Current locale and language pack for server components. */
export function getI18n() {
  const { locale } = getStore()
  return { locale, m: getMessages(locale) }
}
