'use client'

import { useEffect, useState } from 'react'
import { TextAlignStartIcon } from 'lucide-react'
import { cn } from 'cn'
import { useI18n } from '@/components/i18n/i18n-provider'
import type { TocItem } from '@/lib/content/types'

export function TableOfContents({ items, title }: { items: TocItem[]; title?: string }) {
  const { m } = useI18n()
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label={m.content.toc.label} className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <TextAlignStartIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        {title ?? m.content.toc.title}
      </p>
      <ul className="flex flex-col border-s">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                '-ms-px block border-s-2 border-transparent py-1 text-sm text-muted-foreground transition-colors hover:text-foreground',
                item.level === 3 ? 'ps-6' : 'ps-3',
                active === item.id && 'border-primary font-medium text-foreground'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
