import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from 'cn'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'
import { plural } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { getPostsByTopic, getTopics, topicColorClass } from '@/lib/blog'

export async function generateMetadata({ params }: PageProps<'/[locale]/blog/topics'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.blog.topics.meta.title, description: m.blog.topics.meta.description }
}

export default async function TopicsPage({ params }: PageProps<'/[locale]/blog/topics'>) {
  const { locale, m } = await initI18n(params)
  const t = m.blog.topics

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading as="h1" align="left" eyebrow={m.nav.blog} title={t.title} description={t.description} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getTopics(locale).map((topic) => {
          const count = getPostsByTopic(locale, topic.slug).length
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
                    {plural(locale, m.blog.postCount, count)}
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
