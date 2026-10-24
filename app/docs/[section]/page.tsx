import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { GroupCard } from '@/components/docs/group-card'
import { docSections, getSection } from '@/lib/docs'

type Props = { params: Promise<{ section: string }> }

export function generateStaticParams() {
  return docSections.map((s) => ({ section: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params
  const s = getSection(section)
  return s ? { title: s.title, description: s.description } : {}
}

export default async function DocSectionPage({ params }: Props) {
  const { section } = await params
  const s = getSection(section)
  if (!s) notFound()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-2xl flex-col gap-4">
        <DocsBreadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: s.title }]} />
        <h1 className="text-4xl font-bold tracking-tight">{s.title}</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{s.description}</p>
      </header>
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {s.groups.map((g) => (
          <li key={g.slug}>
            <GroupCard section={s.id} group={g} />
          </li>
        ))}
      </ul>
    </div>
  )
}
