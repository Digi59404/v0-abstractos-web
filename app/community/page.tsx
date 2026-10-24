import type { Metadata } from 'next'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { SectionHeading } from '@/components/site/section-heading'
import { CommunityChannels } from '@/components/community/community-channels'
import { Contribute } from '@/components/community/contribute'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Join the AbstractOS community on Reddit, IRC, our forums, Matrix and GitLab. Ask questions, share feedback and help build the OS.',
}

export default function CommunityPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 md:pt-28">
          <SectionHeading
            as="h1"
            eyebrow="Community"
            title={
              <>
                Built by people, <span className="text-gradient-brand">for people.</span>
              </>
            }
            description="AbstractOS is shaped by everyone who uses it. Find your corner of the community — ask for help, share your setup, or help us design what comes next."
          />
        </div>
      </section>
      <CommunityChannels />
      <Contribute />
    </>
  )
}
