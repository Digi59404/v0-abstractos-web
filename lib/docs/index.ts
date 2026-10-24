import { cached, num, readCollection, str } from '@/lib/content/loader'
import { parseMarkdown } from '@/lib/content/markdown'
import type { DocGroup, DocPage, DocSection, DocSectionId } from '@/lib/docs/types'
import type { Locale } from '@/i18n/config'

export type { DocPage, DocSection, DocSectionId, DocGroup } from '@/lib/docs/types'

/**
 * Docs live in `content/<locale>/docs/<section>/<group>/<page>.md`.
 * `_section.md` and `_group.md` hold the title, order and description of each level.
 */
type DocsTree = { sections: DocSection[]; pages: DocPage[] }

const sectionIds: DocSectionId[] = ['users', 'developers']
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order

function loadDocs(locale: Locale): DocsTree {
  return cached(`docs:${locale}`, () => {
    const files = readCollection(locale, 'docs')
    const pages: (DocPage & { order: number })[] = []
    const groups = new Map<string, (DocGroup & { order: number })[]>()
    const sections: (DocSection & { order: number })[] = []

    for (const { id, data, body } of files) {
      const [, section, group, slug] = id.split('/')
      if (!sectionIds.includes(section as DocSectionId)) continue
      const sectionId = section as DocSectionId

      if (group === '_section') {
        sections.push({ id: sectionId, title: str(data.title), description: body, groups: [], order: num(data.order, 99) })
      } else if (slug === '_group') {
        const list = groups.get(sectionId) ?? []
        list.push({ slug: group, title: str(data.title), description: body, icon: str(data.icon, 'book'), order: num(data.order, 99) })
        groups.set(sectionId, list)
      } else if (slug) {
        pages.push({
          section: sectionId,
          group,
          slug,
          title: str(data.title),
          description: str(data.description),
          updated: str(data.updated),
          blocks: parseMarkdown(body),
          order: num(data.order, 99),
        })
      }
    }

    for (const section of sections) section.groups = (groups.get(section.id) ?? []).sort(byOrder)
    return { sections: sections.sort(byOrder), pages: pages.sort(byOrder) }
  })
}

export const docHref = (p: Pick<DocPage, 'section' | 'group' | 'slug'>) => `/docs/${p.section}/${p.group}/${p.slug}`

export const getDocSections = (locale: Locale) => loadDocs(locale).sections
export const getAllDocs = (locale: Locale) => loadDocs(locale).pages
export const getSection = (locale: Locale, id: string) => getDocSections(locale).find((s) => s.id === id)

export const getDoc = (locale: Locale, section: string, group: string, slug: string) =>
  getAllDocs(locale).find((p) => p.section === section && p.group === group && p.slug === slug)

export const getGroupPages = (locale: Locale, section: DocSectionId, group: string) =>
  getAllDocs(locale).filter((p) => p.section === section && p.group === group)

export function getDocNeighbours(locale: Locale, page: DocPage) {
  const ordered = getDocSections(locale).flatMap((s) => s.groups.flatMap((g) => getGroupPages(locale, s.id, g.slug)))
  const sectionPages = ordered.filter((p) => p.section === page.section)
  const i = sectionPages.findIndex((p) => p.group === page.group && p.slug === page.slug)
  return { prev: sectionPages[i - 1], next: sectionPages[i + 1] }
}

export type DocSearchEntry = { href: string; title: string; description: string; section: string; group: string }

export function getDocSearchIndex(locale: Locale): DocSearchEntry[] {
  return getDocSections(locale).flatMap((section) =>
    section.groups.flatMap((group) =>
      getGroupPages(locale, section.id, group.slug).map((p) => ({
        href: docHref(p),
        title: p.title,
        description: p.description,
        section: section.title,
        group: group.title,
      }))
    )
  )
}
