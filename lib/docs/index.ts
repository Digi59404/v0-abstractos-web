import { developerGroups, developerPages } from '@/lib/docs/developers'
import { userGroups, userPages } from '@/lib/docs/users'
import type { DocPage, DocSection, DocSectionId } from '@/lib/docs/types'

export type { DocPage, DocSection, DocSectionId, DocGroup } from '@/lib/docs/types'

export const docSections: DocSection[] = [
  {
    id: 'users',
    title: 'User guide',
    description: 'Install AbstractOS, learn the shell and get the most out of the built-in apps.',
    groups: userGroups,
  },
  {
    id: 'developers',
    title: 'Developer guide',
    description: 'Build apps, integrate with system services and port AbstractOS to new hardware.',
    groups: developerGroups,
  },
]

const allPages: DocPage[] = [...userPages, ...developerPages]

export const docHref = (p: Pick<DocPage, 'section' | 'group' | 'slug'>) => `/docs/${p.section}/${p.group}/${p.slug}`

export function getAllDocs() {
  return allPages
}

export function getSection(id: string) {
  return docSections.find((s) => s.id === id)
}

export function getDoc(section: string, group: string, slug: string) {
  return allPages.find((p) => p.section === section && p.group === group && p.slug === slug)
}

export function getGroupPages(section: DocSectionId, group: string) {
  return allPages.filter((p) => p.section === section && p.group === group)
}

export function getDocNeighbours(page: DocPage) {
  const ordered = docSections.flatMap((s) => s.groups.flatMap((g) => getGroupPages(s.id, g.slug)))
  const sectionPages = ordered.filter((p) => p.section === page.section)
  const i = sectionPages.indexOf(page)
  return { prev: sectionPages[i - 1], next: sectionPages[i + 1] }
}

export function getDocSearchIndex() {
  return docSections.flatMap((section) =>
    section.groups.flatMap((group) =>
      getGroupPages(section.id, group.slug).map((p) => ({
        href: docHref(p),
        title: p.title,
        description: p.description,
        section: section.title,
        group: group.title,
      }))
    )
  )
}

export type DocSearchEntry = ReturnType<typeof getDocSearchIndex>[number]
