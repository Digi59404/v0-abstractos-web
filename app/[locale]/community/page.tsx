import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { CommunityChannels } from '@/components/community/community-channels'
import { Contribute } from '@/components/community/contribute'
import { rich } from '@/i18n/format'
import { initI18n } from '@/i18n/server'

export async function generateMetadata({ params }: PageProps<'/[locale]/community'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.community.meta.title, description: m.community.meta.description }
}

export default async function CommunityPage({ params }: PageProps<'/[locale]/community'>) {
  const { m } = await initI18n(params)
  const c = m.community

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow={c.eyebrow}
            title={rich(c.title, { accent: (chunk) => <span className="text-gradient-brand">{chunk}</span> })}
            description={c.description}
          />
        </div>
      </section>
      <CommunityChannels />
      <Contribute />
    </>
  )
}
