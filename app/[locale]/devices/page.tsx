import type { Metadata } from 'next'
import { SectionHeading } from '@/components/site/section-heading'
import { FutureTable } from '@/components/devices/future-table'
import { PortCta } from '@/components/devices/port-cta'
import { SupportTable } from '@/components/devices/support-table'
import { initI18n } from '@/i18n/server'

export async function generateMetadata({ params }: PageProps<'/[locale]/devices'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.devices.meta.title, description: m.devices.meta.description }
}

export default async function DevicesPage({ params }: PageProps<'/[locale]/devices'>) {
  const { m } = await initI18n(params)
  const d = m.devices

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 md:py-24">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">{d.eyebrow}</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{d.title}</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{d.description}</p>
      </header>

      <section aria-label={d.supported.title} className="flex flex-col gap-6">
        <SectionHeading
          align="left"
          eyebrow={d.supported.eyebrow}
          title={d.supported.title}
          description={d.supported.description}
        />
        <SupportTable />
      </section>

      <section aria-label={d.future.title} className="flex flex-col gap-6">
        <SectionHeading align="left" eyebrow={d.future.eyebrow} title={d.future.title} description={d.future.description} />
        <FutureTable />
      </section>

      <PortCta />
    </div>
  )
}
