import Link from 'next/link'
import { cn } from 'cn'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDate, getAuthor, readingTime, type Author, type Post } from '@/lib/blog'

const avatarTint: Record<Author['color'], string> = {
  blue: 'bg-brand-blue/20',
  coral: 'bg-brand-coral/25',
  sun: 'bg-brand-sun/50',
  teal: 'bg-brand-teal/60',
}

export function AuthorAvatar({ slug, className }: { slug: string; className?: string }) {
  const author = getAuthor(slug)
  if (!author) return null
  return (
    <Avatar className={className}>
      <AvatarFallback className={cn('font-medium text-foreground', avatarTint[author.color])}>
        {author.initials}
      </AvatarFallback>
    </Avatar>
  )
}

export function AuthorByline({ post, size = 'sm' }: { post: Post; size?: 'sm' | 'lg' }) {
  const author = getAuthor(post.author)
  if (!author) return null

  return (
    <div className="flex items-center gap-3">
      <AuthorAvatar slug={author.slug} className={size === 'lg' ? 'size-10' : 'size-8'} />
      <div className="flex flex-col text-sm leading-tight">
        <Link href={`/blog/authors/${author.slug}`} className="font-medium hover:underline">
          {author.name}
        </Link>
        <span className="text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {readingTime(post)} min read
        </span>
      </div>
    </div>
  )
}
