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
import { getPostsByTopic, getTopic, topics } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  return topic ? { title: `${topic.name} — Blog`, description: topic.description } : {}
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()
  const posts = getPostsByTopic(slug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/blog" />}>Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/blog/topics" />}>Topics</BreadcrumbLink>
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
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
        <PostGrid posts={posts} />
      </div>
    </div>
  )
}
