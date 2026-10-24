import { getPlainText, getReadingTime } from '@/lib/content/types'
import { posts, type Post } from '@/lib/blog/posts'
import { authors, topics } from '@/lib/blog/taxonomy'

export type { Post } from '@/lib/blog/posts'
export type { Author, Topic } from '@/lib/blog/taxonomy'
export { authors, topics, topicColorClass } from '@/lib/blog/taxonomy'

export const POSTS_PER_PAGE = 6

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function getAllPosts() {
  return sorted
}

export function getPost(slug: string) {
  return sorted.find((p) => p.slug === slug)
}

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug)
}

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug)
}

export function getPostsByTopic(slug: string) {
  return sorted.filter((p) => p.topics.includes(slug))
}

export function getPostsByAuthor(slug: string) {
  return sorted.filter((p) => p.author === slug)
}

export function readingTime(post: Post) {
  return getReadingTime(post.blocks)
}

export function getAdjacentPosts(slug: string) {
  const i = sorted.findIndex((p) => p.slug === slug)
  return { newer: sorted[i - 1], older: sorted[i + 1] }
}

export function getRelatedPosts(post: Post, limit = 3) {
  return sorted
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.topics.filter((t) => post.topics.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}

export function searchPosts(query: string, topic?: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return sorted.filter((post) => {
    if (topic && !post.topics.includes(topic)) return false
    if (terms.length === 0) return true
    const author = getAuthor(post.author)?.name ?? ''
    const haystack = `${post.title} ${post.excerpt} ${author} ${post.topics.join(' ')} ${getPlainText(post.blocks)}`.toLowerCase()
    return terms.every((t) => haystack.includes(t))
  })
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
