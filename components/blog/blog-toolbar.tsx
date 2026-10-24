import Link from 'next/link'
import { RssIcon, SearchIcon } from 'lucide-react'
import { cn } from 'cn'
import { badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { TopicBadge } from '@/components/blog/topic-badge'
import { getI18n } from '@/i18n/server'
import { getTopics } from '@/lib/blog'

export function BlogSearchForm({ defaultValue, topic }: { defaultValue?: string; topic?: string }) {
  const { m } = getI18n()
  return (
    <form action="/blog/search" method="get" role="search" className="w-full sm:max-w-xs">
      <label htmlFor="blog-search" className="sr-only">
        {m.blog.search.label}
      </label>
      <InputGroup className="h-10 bg-card">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          id="blog-search"
          name="q"
          type="search"
          placeholder={m.blog.search.placeholder}
          defaultValue={defaultValue}
        />
      </InputGroup>
      {topic && <input type="hidden" name="topic" value={topic} />}
    </form>
  )
}

export function BlogToolbar({ activeTopic }: { activeTopic?: string }) {
  const { locale, m } = getI18n()
  return (
    <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label={m.blog.topicsNav} className="flex flex-wrap items-center gap-2">
        <Link
          href="/blog"
          aria-current={!activeTopic ? 'page' : undefined}
          className={badgeVariants({ variant: !activeTopic ? 'default' : 'outline' })}
        >
          {m.blog.allPosts}
        </Link>
        {getTopics(locale).map((t) => (
          <TopicBadge key={t.slug} slug={t.slug} active={activeTopic === t.slug} />
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <BlogSearchForm />
        <a
          href="/blog/rss.xml"
          className={cn(buttonVariants({ variant: 'outline', size: 'icon-lg' }), 'shrink-0')}
          aria-label={m.blog.rssLabel}
        >
          <RssIcon />
        </a>
      </div>
    </div>
  )
}
