import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRightIcon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocIcon } from '@/components/docs/doc-icon'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { docHref, docSections, getGroupPages, getSection } from '@/lib/docs'

type Props = { params: Promise<{ section: string; group: string }> }

export function generateStaticParams() {
  return docSections.flatMap((s) => s.groups.map((g) => ({ section: s.id, group: g.slug })))
}

function resolve(section: string, group: string) {
  const s = getSection(section)
  const g = s?.groups.find((x) => x.slug === group)
  return s && g ? { s, g } : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, group } = await params
  const r = resolve(section, group)
  return r ? { title: `${r.g.title} — ${r.s.title}`, description: r.g.description } : {}
}

export default async function DocGroupPage({ params }: Props) {
  const { section, group } = await params
  const r = resolve(section, group)
  if (!r) notFound()
  const pages = getGroupPages(r.s.id, r.g.slug)

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-4">
        <DocsBreadcrumb
          items={[{ label: 'Docs', href: '/docs' }, { label: r.s.title, href: `/docs/${r.s.id}` }, { label: r.g.title }]}
        />
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <DocIcon name={r.g.icon} className="size-5" />
          </span>
          <h1 className="text-4xl font-bold tracking-tight">{r.g.title}</h1>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{r.g.description}</p>
      </header>
      <ul className="flex flex-col gap-4">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={docHref(p)} className="group block rounded-xl">
              <Card className="transition-shadow group-hover:shadow-md group-hover:shadow-foreground/5">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <CardTitle className="group-hover:underline">{p.title}</CardTitle>
                    <CardDescription>{p.description}</CardDescription>
                  </div>
                  <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
