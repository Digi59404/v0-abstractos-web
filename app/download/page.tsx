import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { DownloadOptions } from '@/components/download/download-options'
import { InstallSteps } from '@/components/download/install-steps'
import { Requirements } from '@/components/download/requirements'
import { release } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Download',
  description: `Download AbstractOS ${release.version} “${release.codename}” for x64, 32-bit and ARM. Try it in a virtual machine or flash it to a USB drive.`,
}

export default function DownloadPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow={`${release.channel} ${release.version} · ${release.codename}`}
            title={
              <>
                Get <span className="text-gradient-brand">AbstractOS</span>
              </>
            }
            description="Free to download, free to use. Pick your architecture, then run it in a virtual machine or write it to a USB drive."
          />
        </div>
      </section>
      <DownloadOptions />
      <InstallSteps />
      <Requirements />
    </>
  )
}
