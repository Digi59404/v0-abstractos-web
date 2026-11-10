import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, CodeIcon, UserIcon } from 'lucide-react'
import { GroupCard } from '@/components/docs/group-card'
import { plural, rich } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { getDocSections } from '@/lib/docs'

export async function generateMetadata({ params }: PageProps<'/[locale]/docs'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.docs.meta.title, description: m.docs.meta.description }
}

export default async function DocsHomePage({ params }: PageProps<'/[locale]/docs'>) {
  const { locale, m } = await initI18n(params)
  const sections = getDocSections(locale)

  return (
    <div className="flex flex-col gap-16">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">{m.docs.eyebrow}</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{m.docs.title}</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          {rich(m.docs.description, {
            kbd: (chunk) => <kbd className="rounded border bg-muted px-1.5 font-mono text-sm">{chunk}</kbd>,
          })}
        </p>
      </header>

      {sections.map((s) => {
        const Icon = s.id === 'users' ? UserIcon : CodeIcon
        return (
          <section key={s.id} aria-labelledby={`${s.id}-heading`} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 id={`${s.id}-heading`} className="text-3xl font-bold tracking-tight">
                    {m.docs.sidebar.tabs[s.id]}
                  </h2>
                  <p className="max-w-xl text-pretty text-muted-foreground">{s.description}</p>
                </div>
              </div>
              <Link
                href={`/docs/${s.id}`}
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline"
              >
                {plural(locale, m.docs.browseSections, s.groups.length)}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {s.groups.map((g) => (
                <li key={g.slug}>
                  <GroupCard section={s.id} group={g} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
