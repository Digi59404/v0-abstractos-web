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
import { getTopic, searchPosts, topics } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Search the blog',
  robots: { index: false },
}

type Props = { searchParams: Promise<{ q?: string; topic?: string }> }

export default async function BlogSearchPage({ searchParams }: Props) {
  const { q = '', topic } = await searchParams
  const query = q.trim().slice(0, 100)
  const activeTopic = topic && getTopic(topic) ? topic : undefined
  const results = searchPosts(query, activeTopic)
  const withQuery = (t?: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (t) params.set('topic', t)
    const s = params.toString()
    return `/blog/search${s ? `?${s}` : ''}`
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading as="h1" align="left" eyebrow="Blog" title="Search" />

      <div className="mt-8 flex flex-col gap-5 border-b pb-6">
        <div className="max-w-xl [&_form]:sm:max-w-none">
          <BlogSearchForm defaultValue={query} topic={activeTopic} />
        </div>
        <nav aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <Link
            href={withQuery()}
            aria-current={!activeTopic ? 'page' : undefined}
            className={badgeVariants({ variant: !activeTopic ? 'default' : 'outline' })}
          >
            Any topic
          </Link>
          {topics.map((t) => (
            <TopicBadge key={t.slug} slug={t.slug} href={withQuery(t.slug)} active={activeTopic === t.slug} />
          ))}
        </nav>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? 'result' : 'results'}
        {query && (
          <>
            {' '}for <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
          </>
        )}
        {activeTopic && <> in {getTopic(activeTopic)?.name}</>}
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
              <EmptyTitle>No posts found</EmptyTitle>
              <EmptyDescription>Try a different keyword or clear the topic filter.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/blog" className={buttonVariants({ variant: 'outline' })}>
                Back to all posts
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  )
}
