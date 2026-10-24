import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { Principles } from '@/components/ethos/principles'
import { Roadmap } from '@/components/ethos/roadmap'
import { CtaBand } from '@/components/site/cta-band'
import { rich } from '@/i18n/format'
import { initI18n } from '@/i18n/server'

export async function generateMetadata({ params }: PageProps<'/[locale]/ethos'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  return { title: m.ethos.meta.title, description: m.ethos.meta.description }
}

export default async function EthosPage({ params }: PageProps<'/[locale]/ethos'>) {
  const { m } = await initI18n(params)
  const e = m.ethos

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pt-20 pb-16 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow={e.eyebrow}
            title={rich(e.title, { accent: (chunk) => <span className="text-gradient-brand">{chunk}</span> })}
          />
          <blockquote className="mx-auto max-w-3xl rounded-3xl border bg-card/80 p-8 text-pretty text-lg leading-relaxed shadow-sm backdrop-blur md:p-10 md:text-xl">
            <p>{e.quote}</p>
            <footer className="mt-6 text-sm text-muted-foreground">{e.quoteSource}</footer>
          </blockquote>
        </div>
      </section>
      <Principles />
      <Roadmap />
      <CtaBand />
    </>
  )
}
