import { Hero } from '@/components/home/hero'
import { ValueProps } from '@/components/home/value-props'
import { ScreenshotGallery } from '@/components/home/screenshot-gallery'
import { Convergence } from '@/components/home/convergence'
import { CtaBand } from '@/components/site/cta-band'
import { initI18n } from '@/i18n/server'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await initI18n(params)

  return (
    <>
      <Hero />
      <ValueProps />
      <ScreenshotGallery />
      <Convergence />
      <CtaBand />
    </>
  )
}
