import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, CodeIcon, UserIcon } from 'lucide-react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="flex flex-col gap-14">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">{m.docs.eyebrow}</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{m.docs.title}</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          {rich(m.docs.description, {
            kbd: (chunk) => <kbd className="rounded border bg-muted px-1.5 font-mono text-sm">{chunk}</kbd>,
          })}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.id === 'users' ? UserIcon : CodeIcon
          return (
            <Link key={s.id} href={`/docs/${s.id}`} className="group rounded-xl">
              <Card className="h-full transition-shadow group-hover:shadow-lg group-hover:shadow-foreground/5">
                <CardHeader className="gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-foreground text-background">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-2xl">{s.title}</CardTitle>
                  <CardDescription className="text-base">{s.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto gap-1 text-sm font-medium">
                  {plural(locale, m.docs.browseSections, s.groups.length)}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>

      {sections.map((s) => (
        <section key={s.id} aria-labelledby={`${s.id}-heading`} className="flex flex-col gap-6">
          <h2 id={`${s.id}-heading`} className="text-2xl font-bold tracking-tight">
            {s.title}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {s.groups.map((g) => (
              <li key={g.slug}>
                <GroupCard section={s.id} group={g} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
