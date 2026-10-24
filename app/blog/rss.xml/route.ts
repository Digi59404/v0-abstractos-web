import { getAllPosts, getAuthor } from '@/lib/blog'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET(request: Request) {
  const origin = new URL(request.url).origin
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${origin}/blog/${p.slug}</link>
      <guid>${origin}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <author>${escape(getAuthor(p.author)?.name ?? 'AbstractOS')}</author>
      <description>${escape(p.excerpt)}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AbstractOS Blog</title>
    <link>${origin}/blog</link>
    <description>News, release notes and deep dives from the AbstractOS project.</description>
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
