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
import { AuthorAvatar } from '@/components/blog/author-byline'
import { PostGrid } from '@/components/blog/post-card'
import { authors, getAuthor, getPostsByAuthor } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)
  return author ? { title: `${author.name} — Blog`, description: author.bio } : {}
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()
  const posts = getPostsByAuthor(slug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/blog" />}>Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{author.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <AuthorAvatar slug={author.slug} className="size-20 text-xl" />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{author.name}</h1>
          <p className="text-muted-foreground">
            {author.role} <span aria-hidden="true">·</span> {author.handle}
          </p>
          <p className="max-w-2xl text-pretty leading-relaxed">{author.bio}</p>
        </div>
      </header>

      <section aria-labelledby="author-posts" className="mt-14 flex flex-col gap-6">
        <h2 id="author-posts" className="text-xl font-semibold">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} by {author.name.split(' ')[0]}
        </h2>
        <PostGrid posts={posts} />
      </section>
    </div>
  )
}
