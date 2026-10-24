import type { Metadata } from 'next'
import { SectionHeading } from '@/components/site/section-heading'
import { FutureTable } from '@/components/devices/future-table'
import { PortCta } from '@/components/devices/port-cta'
import { SupportTable } from '@/components/devices/support-table'

export const metadata: Metadata = {
  title: 'Devices supported',
  description: 'Phones, tablets and PCs that run AbstractOS, which hardware features work on each, and devices coming soon.',
}

export default function DevicesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 md:py-24">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">Hardware</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Devices supported</h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          AbstractOS runs the same system on every device below. Here&apos;s what works on each today.
        </p>
      </header>

      <section aria-label="Supported devices" className="flex flex-col gap-6">
        <SectionHeading
          align="left"
          eyebrow="Available now"
          title="Supported devices"
          description="Stable devices are fully tested each release. Beta devices boot and are usable daily, with some hardware still in progress."
        />
        <SupportTable />
      </section>

      <section aria-label="Future devices" className="flex flex-col gap-6">
        <SectionHeading
          align="left"
          eyebrow="Coming soon"
          title="Future devices"
          description="Ports in progress and devices we would like to support next."
        />
        <FutureTable />
      </section>

      <PortCta />
    </div>
  )
}
