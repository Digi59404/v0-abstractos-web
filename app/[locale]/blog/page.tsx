import type { Metadata } from 'next'
import { BlogIndex } from '@/components/blog/blog-index'
import { initI18n } from '@/i18n/server'

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return {
    title: m.blog.meta.title,
    description: m.blog.meta.description,
    alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
  }
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  await initI18n(params)
  return <BlogIndex page={1} />
}
