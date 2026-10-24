'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'cn'
import type { DocSectionId } from '@/lib/docs'
import { DocIcon } from '@/components/docs/doc-icon'
import { useI18n } from '@/components/i18n/i18n-provider'
import { stripLocale } from '@/i18n/config'

export type SidebarSection = {
  id: DocSectionId
  title: string
  groups: { slug: string; title: string; icon: string; pages: { href: string; title: string }[] }[]
}

export function DocsSidebar({ sections, onNavigate }: { sections: SidebarSection[]; onNavigate?: () => void }) {
  const pathname = stripLocale(usePathname())
  const { m } = useI18n()
  const activeSectionId = sections.find((s) => pathname.startsWith(`/docs/${s.id}`))?.id ?? sections[0].id
  const activeSection = sections.find((s) => s.id === activeSectionId)!

  return (
    <nav aria-label={m.docs.sidebar.label} className="flex flex-col gap-6 text-sm">
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label={m.docs.sidebar.guide}>
        {sections.map((s) => {
          const active = s.id === activeSectionId
          return (
            <Link
              key={s.id}
              href={`/docs/${s.id}`}
              role="tab"
              aria-selected={active}
              onClick={onNavigate}
              className={cn(
                'rounded-md px-3 py-1.5 text-center font-medium transition-colors',
                active ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {m.docs.sidebar.tabs[s.id]}
            </Link>
          )
        })}
      </div>

      {activeSection.groups.map((group) => (
        <div key={group.slug} className="flex flex-col gap-1">
          <Link
            href={`/docs/${activeSection.id}/${group.slug}`}
            onClick={onNavigate}
            className="mb-1 flex items-center gap-2 px-2 font-semibold text-foreground hover:underline"
          >
            <DocIcon name={group.icon} className="size-4 text-muted-foreground" />
            {group.title}
          </Link>
          <ul className="flex flex-col gap-0.5 border-s ms-4">
            {group.pages.map((page) => {
              const active = pathname === page.href
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      '-ms-px block border-s py-1.5 ps-3 transition-colors',
                      active
                        ? 'border-foreground font-medium text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
