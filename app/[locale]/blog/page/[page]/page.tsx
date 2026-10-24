import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogIndex, getBlogPageCount } from '@/components/blog/blog-index'
import { format } from '@/i18n/format'
import { isLocale } from '@/i18n/config'
import { initI18n } from '@/i18n/server'

type Props = PageProps<'/[locale]/blog/page/[page]'>

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return Array.from({ length: getBlogPageCount(params.locale) }, (_, i) => ({ page: String(i + 1) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { m } = await initI18n(params)
  const { page } = await params
  return { title: format(m.blog.pageTitle, { page }) }
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { locale } = await initI18n(params)
  const { page } = await params
  const n = Number(page)
  if (!Number.isInteger(n) || n < 1 || n > getBlogPageCount(locale)) notFound()
  if (n === 1) redirect('/blog')
  return <BlogIndex page={n} />
}
