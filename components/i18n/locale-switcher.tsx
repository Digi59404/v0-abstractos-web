'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LanguagesIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useI18n } from '@/components/i18n/i18n-provider'
import { LOCALE_COOKIE, isLocale, localeNames, locales } from '@/i18n/config'

export function LocaleSwitcher() {
  const { locale, m } = useI18n()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  if (locales.length < 2) return null

  function change(next: unknown) {
    if (typeof next !== 'string' || !isLocale(next) || next === locale) return
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => router.refresh())
  }

  return (
    <Select value={locale} onValueChange={change} items={locales.map((l) => ({ value: l, label: localeNames[l] }))}>
      <SelectTrigger size="sm" aria-label={m.common.language} disabled={pending}>
        <LanguagesIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((l) => (
            <SelectItem key={l} value={l}>
              {localeNames[l]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
