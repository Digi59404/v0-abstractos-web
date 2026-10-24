import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Blocks } from '@/components/content/blocks'
import { TableOfContents } from '@/components/content/toc'
import { AuthorAvatar, AuthorByline } from '@/components/blog/author-byline'
import { PostGrid } from '@/components/blog/post-card'
import { TopicBadge } from '@/components/blog/topic-badge'
import { getAdjacentPosts, getAllPosts, getAuthor, getPost, getRelatedPosts } from '@/lib/blog'
import { getToc } from '@/lib/content/types'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', title: post.title, description: post.excerpt, images: [post.cover] },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const author = getAuthor(post.author)
  const toc = getToc(post.blocks)
  const { newer, older } = getAdjacentPosts(post.slug)
  const related = getRelatedPosts(post)

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <header className="mx-auto flex max-w-3xl flex-col gap-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/blog" />}>Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap gap-1.5">
          {post.topics.map((t) => (
            <TopicBadge key={t} slug={t} />
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{post.title}</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <AuthorByline post={post} size="lg" />
      </header>

      <Image
        src={post.cover || '/placeholder.svg'}
        alt={post.coverAlt}
        width={1600}
        height={900}
        priority
        className="mx-auto mt-10 aspect-video w-full max-w-5xl rounded-2xl border object-cover"
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="min-w-0 max-w-3xl">
          <Blocks blocks={post.blocks} />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-10">
        {author && (
          <Card>
            <CardHeader className="flex flex-row items-start gap-4">
              <AuthorAvatar slug={author.slug} className="size-12" />
              <div className="flex flex-col gap-1.5">
                <CardTitle>
                  <Link href={`/blog/authors/${author.slug}`} className="hover:underline">
                    {author.name}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{author.role}</p>
                <CardDescription>{author.bio}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        )}

        <Separator />

        <nav aria-label="More posts" className="grid gap-4 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group flex flex-col gap-1 rounded-xl border p-4 hover:bg-muted">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <ArrowLeftIcon className="size-4" aria-hidden="true" /> Older
              </span>
              <span className="font-medium">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/blog/${newer.slug}`}
              className="flex flex-col items-end gap-1 rounded-xl border p-4 text-right hover:bg-muted"
            >
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                Newer <ArrowRightIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="font-medium">{newer.title}</span>
            </Link>
          )}
        </nav>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-20 flex flex-col gap-6">
          <h2 id="related-heading" className="text-2xl font-bold tracking-tight">
            Related posts
          </h2>
          <PostGrid posts={related} />
        </section>
      )}
    </article>
  )
}
