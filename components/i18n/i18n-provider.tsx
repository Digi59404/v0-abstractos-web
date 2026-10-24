'use client'

import { createContext, use } from 'react'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'

type I18nValue = { locale: Locale; m: Messages }

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: React.ReactNode }) {
  return <I18nContext value={{ locale, m: messages }}>{children}</I18nContext>
}

/** Current locale and language pack for client components. */
export function useI18n() {
  const value = use(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
