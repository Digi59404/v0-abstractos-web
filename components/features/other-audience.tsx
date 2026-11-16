import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import type { FeatureAudience } from '@/lib/site'

const other = {
  users: { href: '/features/developers', nameKey: 'forDevelopers', descriptionKey: 'forDevelopersDescription' },
  developers: { href: '/features/users', nameKey: 'forUsers', descriptionKey: 'forUsersDescription' },
} as const

export function OtherAudience({ audience }: { audience: FeatureAudience }) {
  const { m } = getI18n()
  const target = other[audience]

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Link
        href={target.href}
        className="group flex flex-col gap-4 rounded-3xl border bg-card p-8 transition-shadow hover:shadow-lg hover:shadow-brand-blue/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between md:p-10"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{m.features.common.otherAudience}</p>
          <p className="font-heading text-2xl font-bold tracking-tight">
            {format(m.features.common.exploreOther, { name: m.nav[target.nameKey] })}
          </p>
          <p className="text-muted-foreground">{m.nav[target.descriptionKey]}</p>
        </div>
        <ArrowRightIcon
          className="size-6 shrink-0 text-primary transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </section>
  )
}
