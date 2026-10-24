import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogIndex, getBlogPageCount } from '@/components/blog/blog-index'

type Props = { params: Promise<{ page: string }> }

export function generateStaticParams() {
  return Array.from({ length: getBlogPageCount() }, (_, i) => ({ page: String(i + 1) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  return { title: `Blog — page ${page}` }
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params
  const n = Number(page)
  if (!Number.isInteger(n) || n < 1 || n > getBlogPageCount()) notFound()
  if (n === 1) redirect('/blog')
  return <BlogIndex page={n} />
}
