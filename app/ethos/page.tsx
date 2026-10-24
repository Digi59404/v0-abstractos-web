import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { Principles } from '@/components/ethos/principles'
import { Roadmap } from '@/components/ethos/roadmap'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Ethos',
  description:
    'AbstractOS is a user-first operating system. Learn the principles that guide every decision we make — and our commitment to your freedom to choose.',
}

export default function EthosPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pt-20 pb-16 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow="Our ethos"
            title={
              <>
                Put the user first. <span className="text-gradient-brand">Protect their right to choose.</span>
              </>
            }
          />
          <blockquote className="mx-auto max-w-3xl rounded-3xl border bg-card/80 p-8 text-pretty text-lg leading-relaxed shadow-sm backdrop-blur md:p-10 md:text-xl">
            <p>
              &ldquo;The devices you own should be able to run the software you choose. The software you choose
              can be open or closed source — the choice is yours. It is not our job to decide or cast
              judgement; it&apos;s our job to protect your right to choose.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">— The AbstractOS mission statement</footer>
          </blockquote>
        </div>
      </section>
      <Principles />
      <Roadmap />
      <CtaBand />
    </>
  )
}
