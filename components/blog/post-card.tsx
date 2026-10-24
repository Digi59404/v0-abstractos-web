import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'cn'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthorByline } from '@/components/blog/author-byline'
import { TopicBadge } from '@/components/blog/topic-badge'
import type { Post } from '@/lib/blog'

export function PostCard({ post, priority }: { post: Post; priority?: boolean }) {
  return (
    <Card className="group h-full overflow-hidden pt-0 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <Image
          src={post.cover || '/placeholder.svg'}
          alt=""
          width={800}
          height={450}
          priority={priority}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap gap-1.5">
          {post.topics.map((t) => (
            <TopicBadge key={t} slug={t} />
          ))}
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <AuthorByline post={post} />
      </CardFooter>
    </Card>
  )
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden py-0 md:flex-row">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block md:w-3/5">
        <Image
          src={post.cover || '/placeholder.svg'}
          alt=""
          width={1200}
          height={675}
          priority
          className="aspect-video size-full object-cover"
        />
      </Link>
      <div className={cn('flex flex-col justify-center gap-4 p-6 md:w-2/5 md:p-8')}>
        <div className="flex flex-wrap gap-1.5">
          {post.topics.map((t) => (
            <TopicBadge key={t} slug={t} />
          ))}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-pretty leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <AuthorByline post={post} size="lg" />
      </div>
    </Card>
  )
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
