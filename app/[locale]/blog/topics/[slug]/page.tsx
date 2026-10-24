import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SectionHeading } from '@/components/site/section-heading'
import { BlogToolbar } from '@/components/blog/blog-toolbar'
import { PostGrid } from '@/components/blog/post-card'
import { isLocale } from '@/i18n/config'
import { format, plural } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { getPostsByTopic, getTopic, getTopics } from '@/lib/blog'

type Props = PageProps<'/[locale]/blog/topics/[slug]'>

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return getTopics(params.locale).map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, m } = await initI18n(params)
  const { slug } = await params
  const topic = getTopic(locale, slug)
  return topic ? { title: format(m.blog.sectionTitle, { name: topic.name }), description: topic.description } : {}
}

export default async function TopicPage({ params }: Props) {
  const { locale, m } = await initI18n(params)
  const { slug } = await params
  const topic = getTopic(locale, slug)
  if (!topic) notFound()
  const posts = getPostsByTopic(locale, slug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <Breadcrumb aria-label={m.common.breadcrumb} className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/blog" />}>{m.nav.blog}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/blog/topics" />}>{m.blog.topics.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{topic.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SectionHeading as="h1" align="left" title={topic.name} description={topic.description} />
      <div className="mt-10 flex flex-col gap-10">
        <BlogToolbar activeTopic={topic.slug} />
        <p className="text-sm text-muted-foreground">{plural(locale, m.blog.postCount, posts.length)}</p>
        <PostGrid posts={posts} />
      </div>
    </div>
  )
}
