import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { DownloadOptions } from '@/components/download/download-options'
import { InstallSteps } from '@/components/download/install-steps'
import { Requirements } from '@/components/download/requirements'
import { format, rich } from '@/i18n/format'
import { initI18n } from '@/i18n/server'
import { release } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/download'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return {
    title: m.download.meta.title,
    description: format(m.download.meta.description, { version: release.version, codename: release.codename }),
  }
}

export default async function DownloadPage({ params }: PageProps<'/[locale]/download'>) {
  const { m } = await initI18n(params)
  const d = m.download

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow={format(d.eyebrow, { channel: m.release.channel, version: release.version, codename: release.codename })}
            title={rich(d.title, { accent: (chunk) => <span className="text-gradient-brand">{chunk}</span> })}
            description={d.description}
          />
        </div>
      </section>
      <DownloadOptions />
      <InstallSteps />
      <Requirements />
    </>
  )
}
