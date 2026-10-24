import { notFound } from 'next/navigation'
import { defaultLocale, isLocale, localeTags } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { getAllPosts, getAuthor } from '@/lib/blog'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET(request: Request, { params }: RouteContext<'/[locale]/blog/rss.xml'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const m = getMessages(locale)
  const origin = new URL(request.url).origin
  const base = locale === defaultLocale ? origin : `${origin}/${locale}`

  const items = getAllPosts(locale)
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <author>${escape(getAuthor(locale, p.author)?.name ?? m.meta.title)}</author>
      <description>${escape(p.excerpt)}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(m.blog.rss.title)}</title>
    <link>${base}/blog</link>
    <description>${escape(m.blog.rss.description)}</description>
    <language>${localeTags[locale]}</language>
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
