import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from 'cn'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'
import { getPostsByTopic, topicColorClass, topics } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog topics',
  description: 'Browse AbstractOS blog posts by topic: releases, engineering, design, convergence and community.',
}

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading
        as="h1"
        align="left"
        eyebrow="Blog"
        title="Topics"
        description="Every post on the AbstractOS blog, organized by what it covers."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const count = getPostsByTopic(topic.slug).length
          return (
            <li key={topic.slug}>
              <Link href={`/blog/topics/${topic.slug}`} className="group block h-full rounded-xl">
                <Card className="h-full transition-shadow group-hover:shadow-lg group-hover:shadow-foreground/5">
                  <CardHeader className="gap-3">
                    <span className={cn('h-1.5 w-10 rounded-full', topicColorClass[topic.color])} aria-hidden="true" />
                    <CardTitle className="text-xl group-hover:underline">{topic.name}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto text-sm text-muted-foreground">
                    {count} {count === 1 ? 'post' : 'posts'}
                  </CardFooter>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
