'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'cn'
import { DocIcon } from '@/components/docs/doc-icon'

export type SidebarSection = {
  id: string
  title: string
  groups: { slug: string; title: string; icon: string; pages: { href: string; title: string }[] }[]
}

export function DocsSidebar({ sections, onNavigate }: { sections: SidebarSection[]; onNavigate?: () => void }) {
  const pathname = usePathname()
  const activeSectionId = sections.find((s) => pathname.startsWith(`/docs/${s.id}`))?.id ?? sections[0].id
  const activeSection = sections.find((s) => s.id === activeSectionId)!

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label="Guide">
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
              {s.id === 'users' ? 'Users' : 'Developers'}
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
          <ul className="flex flex-col gap-0.5 border-l ml-4">
            {group.pages.map((page) => {
              const active = pathname === page.href
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      '-ml-px block border-l py-1.5 pl-3 transition-colors',
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
