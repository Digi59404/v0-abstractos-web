'use client'

import { useEffect, useState } from 'react'
import { TextAlignStartIcon } from 'lucide-react'
import { cn } from 'cn'
import type { TocItem } from '@/lib/content/types'

export function TableOfContents({ items, title = 'On this page' }: { items: TocItem[]; title?: string }) {
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
    <nav aria-label="Table of contents" className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <TextAlignStartIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        {title}
      </p>
      <ul className="flex flex-col border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 border-transparent py-1 text-sm text-muted-foreground transition-colors hover:text-foreground',
                item.level === 3 ? 'pl-6' : 'pl-3',
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
