import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb'
import { GroupCard } from '@/components/docs/group-card'
import { isLocale } from '@/i18n/config'
import { initI18n } from '@/i18n/server'
import { getDocSections, getSection } from '@/lib/docs'

type Props = PageProps<'/[locale]/docs/[section]'>

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  return getDocSections(params.locale).map((s) => ({ section: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await initI18n(params)
  const { section } = await params
  const s = getSection(locale, section)
  return s ? { title: s.title, description: s.description } : {}
}

export default async function DocSectionPage({ params }: Props) {
  const { locale, m } = await initI18n(params)
  const { section } = await params
  const s = getSection(locale, section)
  if (!s) notFound()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-2xl flex-col gap-4">
        <DocsBreadcrumb label={m.common.breadcrumb} items={[{ label: m.docs.breadcrumbRoot, href: '/docs' }, { label: s.title }]} />
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
