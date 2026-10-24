import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Blocks } from '@/components/content/blocks'
import { TableOfContents } from '@/components/content/toc'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { isLocale } from '@/i18n/config'
import { formatDate, rich } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { getToc } from '@/lib/content/types'
import { docHref, getAllDocs, getDoc, getDocNeighbours, getSection } from '@/lib/docs'

type Props = PageProps<'/[locale]/docs/[section]/[group]/[slug]'>

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return getAllDocs(params.locale).map((p) => ({ section: p.section, group: p.group, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await initI18n(params)
  const { section, group, slug } = await params
  const page = getDoc(locale, section, group, slug)
  return page ? { title: page.title, description: page.description } : {}
}

export default async function DocPage({ params }: Props) {
  const { locale, m } = await initI18n(params)
  const { section, group, slug } = await params
  const page = getDoc(locale, section, group, slug)
  if (!page) notFound()

  const s = getSection(locale, page.section)!
  const g = s.groups.find((x) => x.slug === page.group)!
  const toc = getToc(page.blocks)
  const { prev, next } = getDocNeighbours(locale, page)

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="min-w-0 max-w-3xl">
        <header className="flex flex-col gap-4 border-b pb-8">
          <DocsBreadcrumb
            label={m.common.breadcrumb}
            items={[
              { label: m.docs.breadcrumbRoot, href: '/docs' },
              { label: s.title, href: `/docs/${s.id}` },
              { label: g.title, href: `/docs/${s.id}/${g.slug}` },
              { label: page.title },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{m.docs.guideBadge[page.section]}</Badge>
            <Badge variant="outline">{g.title}</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">{page.title}</h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{page.description}</p>
        </header>

        <div className="pt-8">
          <Blocks blocks={page.blocks} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            {rich(m.docs.lastUpdated, {
              date: () => <time dateTime={page.updated}>{formatDate(locale, page.updated)}</time>,
            })}
          </span>
          <a
            href={`https://gitlab.com/abstract/website/-/edit/main/content/${locale}/docs/${page.section}/${page.group}/${page.slug}.md`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <PencilIcon className="size-3.5" aria-hidden="true" />
            {m.docs.editPage}
          </a>
        </div>

        <Separator className="my-8" />

        <nav aria-label={m.common.pagination.label} className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={docHref(prev)} className="flex flex-col gap-1 rounded-xl border p-4 hover:bg-muted">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <ArrowLeftIcon className="size-4 rtl:rotate-180" aria-hidden="true" /> {m.common.pagination.previous}
              </span>
              <span className="font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={docHref(next)} className="flex flex-col items-end gap-1 rounded-xl border p-4 text-end hover:bg-muted">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                {m.common.pagination.next} <ArrowRightIcon className="size-4 rtl:rotate-180" aria-hidden="true" />
              </span>
              <span className="font-medium">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {toc.length > 0 && (
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}
