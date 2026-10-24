import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchXIcon } from 'lucide-react'
import { badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { SectionHeading } from '@/components/site/section-heading'
import { BlogSearchForm } from '@/components/blog/blog-toolbar'
import { PostGrid } from '@/components/blog/post-card'
import { TopicBadge } from '@/components/blog/topic-badge'
import { Fragment } from 'react'
import { plural } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { getTopic, getTopics, searchPosts } from '@/lib/blog'

type Props = PageProps<'/[locale]/blog/search'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.blog.search.meta.title, robots: { index: false } }
}

export default async function BlogSearchPage({ params, searchParams }: Props) {
  const { locale, m } = await initI18n(params)
  const s = m.blog.search
  const { q, topic } = await searchParams
  const query = (typeof q === 'string' ? q : '').trim().slice(0, 100)
  const activeTopic = typeof topic === 'string' && getTopic(locale, topic) ? topic : undefined
  const results = searchPosts(locale, query, activeTopic)
  const withQuery = (t?: string) => {
    const sp = new URLSearchParams()
    if (query) sp.set('q', query)
    if (t) sp.set('topic', t)
    const qs = sp.toString()
    return `/blog/search${qs ? `?${qs}` : ''}`
  }

  const summaryForms = query
    ? activeTopic
      ? s.resultsForQueryInTopic
      : s.resultsForQuery
    : activeTopic
      ? s.resultsInTopic
      : s.results
  const summary = plural(locale, summaryForms, results.length, {
    query: '\u0000',
    topic: activeTopic ? (getTopic(locale, activeTopic)?.name ?? '') : '',
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading as="h1" align="left" eyebrow={m.nav.blog} title={s.title} />

      <div className="mt-8 flex flex-col gap-5 border-b pb-6">
        <div className="max-w-xl [&_form]:sm:max-w-none">
          <BlogSearchForm defaultValue={query} topic={activeTopic} />
        </div>
        <nav aria-label={s.filterByTopic} className="flex flex-wrap gap-2">
          <Link
            href={withQuery()}
            aria-current={!activeTopic ? 'page' : undefined}
            className={badgeVariants({ variant: !activeTopic ? 'default' : 'outline' })}
          >
            {s.anyTopic}
          </Link>
          {getTopics(locale).map((t) => (
            <TopicBadge key={t.slug} slug={t.slug} href={withQuery(t.slug)} active={activeTopic === t.slug} />
          ))}
        </nav>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {summary.split('\u0000').map((part, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>}
            {part}
          </Fragment>
        ))}
      </p>

      <div className="mt-6">
        {results.length > 0 ? (
          <PostGrid posts={results} />
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>{s.emptyTitle}</EmptyTitle>
              <EmptyDescription>{s.emptyDescription}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/blog" className={buttonVariants({ variant: 'outline' })}>
                {s.back}
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  )
}
