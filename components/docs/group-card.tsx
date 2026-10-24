import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocIcon } from '@/components/docs/doc-icon'
import { getI18n } from '@/i18n/server'
import { docHref, getGroupPages, type DocGroup, type DocSectionId } from '@/lib/docs'

export function GroupCard({ section, group }: { section: DocSectionId; group: DocGroup }) {
  const pages = getGroupPages(getI18n().locale, section, group.slug)

  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <DocIcon name={group.icon} className="size-5" />
        </span>
        <CardTitle>
          <Link href={`/docs/${section}/${group.slug}`} className="hover:underline">
            {group.title}
          </Link>
        </CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1 text-sm">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={docHref(p)}
                className="group flex items-center justify-between gap-2 rounded-md py-1 text-muted-foreground hover:text-foreground"
              >
                {p.title}
                <ChevronRightIcon className="size-4 opacity-0 rtl:rotate-180 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
