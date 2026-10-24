import type { Block } from '@/lib/content/types'

export type DocSectionId = 'users' | 'developers'

export type DocPage = {
  section: DocSectionId
  group: string
  slug: string
  title: string
  description: string
  updated: string
  blocks: Block[]
}

export type DocGroup = {
  slug: string
  title: string
  description: string
  icon: string
}

export type DocSection = {
  id: DocSectionId
  title: string
  description: string
  groups: DocGroup[]
}
