import { Hero } from '@/components/home/hero'
import { ValueProps } from '@/components/home/value-props'
import { ScreenshotGallery } from '@/components/home/screenshot-gallery'
import { Convergence } from '@/components/home/convergence'
import { CtaBand } from '@/components/site/cta-band'

export default function HomePage() {
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
