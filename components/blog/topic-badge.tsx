import Link from 'next/link'
import { cn } from 'cn'
import { badgeVariants } from '@/components/ui/badge'
import { getI18n } from '@/i18n/server'
import { getTopic, topicColorClass } from '@/lib/blog'

export function TopicBadge({ slug, active, href }: { slug: string; active?: boolean; href?: string }) {
  const topic = getTopic(getI18n().locale, slug)
  if (!topic) return null

  return (
    <Link
      href={href ?? `/blog/topics/${topic.slug}`}
      aria-current={active ? 'page' : undefined}
      className={cn(badgeVariants({ variant: active ? 'default' : 'outline' }), 'gap-1.5')}
    >
      <span className={cn('size-1.5 rounded-full', topicColorClass[topic.color])} aria-hidden="true" />
      {topic.name}
    </Link>
  )
}
