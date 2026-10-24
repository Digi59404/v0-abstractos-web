import { Fragment, type ReactNode } from 'react'
import { localeTags, type Locale } from '@/i18n/config'

type Values = Record<string, string | number>

/** Replaces `{name}` placeholders: format('Hello {name}', { name: 'Ada' }). */
export function format(template: string, values: Values = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

/** Picks the plural form for a count using the locale's CLDR rules, then fills `{count}`. */
export function plural(locale: Locale, forms: PluralForms, count: number, values: Values = {}) {
  const rule = new Intl.PluralRules(localeTags[locale]).select(count)
  return format(forms[rule] ?? forms.other, { count: count.toLocaleString(localeTags[locale]), ...values })
}

/**
 * Renders tagged messages so translators can move emphasis freely:
 * rich('One OS. <accent>Every screen.</accent>', { accent: (text) => <span>{text}</span> })
 */
export function rich(template: string, tags: Record<string, (chunk: ReactNode) => ReactNode>, values: Values = {}) {
  const text = format(template, values)
  const parts: ReactNode[] = []
  const pattern = /<(\w+)>([\s\S]*?)<\/\1>/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const render = tags[match[1]]
    parts.push(<Fragment key={match.index}>{render ? render(match[2]) : match[2]}</Fragment>)
    last = pattern.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function formatDate(locale: Locale, iso: string, style: 'long' | 'short' = 'long') {
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}
