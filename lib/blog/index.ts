import { cached, readCollection, str, strList, num } from '@/lib/content/loader'
import { parseMarkdown } from '@/lib/content/markdown'
import { getPlainText, getReadingTime } from '@/lib/content/types'
import { brandColor, type Author, type Post, type Topic } from '@/lib/blog/taxonomy'
import type { Locale } from '@/i18n/config'

export type { Author, Post, Topic } from '@/lib/blog/taxonomy'
export { topicColorClass } from '@/lib/blog/taxonomy'

export const POSTS_PER_PAGE = 6

const slugOf = (id: string) => id.split('/').pop() ?? id

export function getAllPosts(locale: Locale): Post[] {
  return cached(`posts:${locale}`, () =>
    readCollection(locale, 'blog/posts')
      .map(({ id, data, body }) => ({
        slug: slugOf(id),
        title: str(data.title),
        excerpt: str(data.excerpt),
        date: str(data.date),
        author: str(data.author),
        topics: strList(data.topics),
        cover: str(data.cover),
        coverAlt: str(data.coverAlt),
        featured: data.featured === true,
        blocks: parseMarkdown(body),
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
  )
}

export function getAuthors(locale: Locale): Author[] {
  return cached(`authors:${locale}`, () =>
    readCollection(locale, 'blog/authors').map(({ id, data, body }) => ({
      slug: slugOf(id),
      name: str(data.name),
      role: str(data.role),
      bio: body,
      initials: str(data.initials),
      color: brandColor(data.color),
      handle: str(data.handle),
    }))
  )
}

export function getTopics(locale: Locale): Topic[] {
  return cached(`topics:${locale}`, () =>
    readCollection(locale, 'blog/topics')
      .map(({ id, data, body }) => ({
        slug: slugOf(id),
        name: str(data.name),
        description: body,
        color: brandColor(data.color),
        order: num(data.order, 99),
      }))
      .sort((a, b) => a.order - b.order)
  )
}

export const getPost = (locale: Locale, slug: string) => getAllPosts(locale).find((p) => p.slug === slug)
export const getAuthor = (locale: Locale, slug: string) => getAuthors(locale).find((a) => a.slug === slug)
export const getTopic = (locale: Locale, slug: string) => getTopics(locale).find((t) => t.slug === slug)
export const getPostsByTopic = (locale: Locale, slug: string) => getAllPosts(locale).filter((p) => p.topics.includes(slug))
export const getPostsByAuthor = (locale: Locale, slug: string) => getAllPosts(locale).filter((p) => p.author === slug)

export const readingTime = (post: Post) => getReadingTime(post.blocks)

export function getAdjacentPosts(locale: Locale, slug: string) {
  const posts = getAllPosts(locale)
  const i = posts.findIndex((p) => p.slug === slug)
  return { newer: posts[i - 1], older: posts[i + 1] }
}

export function getRelatedPosts(locale: Locale, post: Post, limit = 3) {
  return getAllPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.topics.filter((t) => post.topics.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}

export function searchPosts(locale: Locale, query: string, topic?: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return getAllPosts(locale).filter((post) => {
    if (topic && !post.topics.includes(topic)) return false
    if (terms.length === 0) return true
    const author = getAuthor(locale, post.author)?.name ?? ''
    const haystack = `${post.title} ${post.excerpt} ${author} ${post.topics.join(' ')} ${getPlainText(post.blocks)}`.toLowerCase()
    return terms.every((t) => haystack.includes(t))
  })
}
