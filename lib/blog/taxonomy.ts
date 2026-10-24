import type { Block } from '@/lib/content/types'

export type BrandColor = 'blue' | 'coral' | 'sun' | 'teal'

export type Author = {
  slug: string
  name: string
  role: string
  bio: string
  initials: string
  color: BrandColor
  handle: string
}

export type Topic = {
  slug: string
  name: string
  description: string
  color: BrandColor
  order: number
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  topics: string[]
  cover: string
  coverAlt: string
  featured?: boolean
  blocks: Block[]
}

export const topicColorClass = {
  blue: 'bg-brand-blue',
  coral: 'bg-brand-coral',
  sun: 'bg-brand-sun',
  teal: 'bg-brand-teal',
} as const

export const brandColor = (value: unknown): BrandColor =>
  value === 'coral' || value === 'sun' || value === 'teal' ? value : 'blue'
