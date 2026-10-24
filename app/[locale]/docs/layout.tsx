import { DocsMobileNav } from '@/components/docs/docs-mobile-nav'
import { DocsSearch } from '@/components/docs/docs-search'
import { DocsSidebar, type SidebarSection } from '@/components/docs/docs-sidebar'
import { initI18n } from '@/i18n/server'
import { docHref, getDocSearchIndex, getDocSections, getGroupPages } from '@/lib/docs'

export default async function DocsLayout({ children, params }: LayoutProps<'/[locale]/docs'>) {
  const { locale } = await initI18n(params)

  const sidebarSections: SidebarSection[] = getDocSections(locale).map((s) => ({
    id: s.id,
    title: s.title,
    groups: s.groups.map((g) => ({
      slug: g.slug,
      title: g.title,
      icon: g.icon,
      pages: getGroupPages(locale, s.id, g.slug).map((p) => ({ href: docHref(p), title: p.title })),
    })),
  }))
  const searchEntries = getDocSearchIndex(locale)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="sticky top-16 z-20 flex items-center gap-2 border-b bg-background/90 py-3 backdrop-blur lg:hidden">
        <DocsMobileNav sections={sidebarSections} />
        <div className="flex-1">
          <DocsSearch entries={searchEntries} />
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-16 flex max-h-[calc(100svh-4rem)] flex-col gap-6 overflow-y-auto py-8 pe-2">
            <DocsSearch entries={searchEntries} />
            <DocsSidebar sections={sidebarSections} />
          </div>
        </aside>
        <div className="min-w-0 py-8 md:py-10">{children}</div>
      </div>
    </div>
  )
}
