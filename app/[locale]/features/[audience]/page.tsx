import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { CtaBand } from '@/components/site/cta-band'
import { FeatureHero } from '@/components/features/feature-hero'
import { FeatureGrid } from '@/components/features/feature-grid'
import { OtherAudience } from '@/components/features/other-audience'
import { initI18n } from '@/i18n/server'
import { featureAudiences, type FeatureAudience } from '@/lib/site'

const isAudience = (value: string): value is FeatureAudience =>
  (featureAudiences as readonly string[]).includes(value)

export const dynamicParams = false

export function generateStaticParams() {
  return featureAudiences.map((audience) => ({ audience }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/features/[audience]'>): Promise<Metadata> {
  const { m } = await initI18n(params)
  const { audience } = await params
  if (!isAudience(audience)) return {}
  return { title: m.features[audience].meta.title, description: m.features[audience].meta.description }
}

export default async function FeaturesPage({ params }: PageProps<'/[locale]/features/[audience]'>) {
  await initI18n(params)
  const { audience } = await params
  if (!isAudience(audience)) notFound()

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <FeatureHero audience={audience} />
      </section>
      <FeatureGrid audience={audience} />
      <OtherAudience audience={audience} />
      <CtaBand />
    </>
  )
}
