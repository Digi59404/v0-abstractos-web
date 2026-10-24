import type { Metadata } from 'next'
import { BlogIndex } from '@/components/blog/blog-index'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Release notes, engineering deep dives, design stories and community updates from the AbstractOS team.',
  alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
}

export default function BlogPage() {
  return <BlogIndex page={1} />
}
