import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, CodeIcon, UserIcon } from 'lucide-react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GroupCard } from '@/components/docs/group-card'
import { docSections } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'User and developer documentation for AbstractOS: installation, apps, settings, app development and hardware porting.',
}

export default function DocsHomePage() {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Documentation</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Learn AbstractOS</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          Guides for everyday use and for building on the platform. Press <kbd className="rounded border bg-muted px-1.5 font-mono text-sm">⌘K</kbd> to search.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {docSections.map((s) => {
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
                  Browse {s.groups.length} sections
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>

      {docSections.map((s) => (
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
