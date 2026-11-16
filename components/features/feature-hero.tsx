import Link from 'next/link'
import { ArrowRightIcon, DownloadIcon, GitMergeIcon } from 'lucide-react'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'
import { rich } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { links, type FeatureAudience } from '@/lib/site'

const actions = {
  users: {
    primary: { href: '/download', icon: DownloadIcon, external: false },
    secondary: { href: '/docs/users' },
  },
  developers: {
    primary: { href: '/docs/developers', icon: ArrowRightIcon, external: false },
    secondary: { href: links.gitlab, icon: GitMergeIcon },
  },
} as const

export function FeatureHero({ audience }: { audience: FeatureAudience }) {
  const { m } = getI18n()
  const copy = m.features[audience]
  const { primary, secondary } = actions[audience]
  const PrimaryIcon = primary.icon
  const secondaryExternal = secondary.href.startsWith('http')

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 pt-20 pb-16 sm:px-6 md:pt-28">
      <SectionHeading
        as="h1"
        eyebrow={copy.eyebrow}
        title={rich(copy.title, { accent: (chunk) => <span className="text-gradient-brand">{chunk}</span> })}
        description={copy.description}
      />
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link href={primary.href} className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-5')}>
          <PrimaryIcon data-icon="inline-start" />
          {copy.primaryCta}
        </Link>
        <Link
          href={secondary.href}
          {...(secondaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'rounded-full px-5')}
        >
          {copy.secondaryCta}
          {secondaryExternal && <span className="sr-only">{m.common.opensInNewTab}</span>}
        </Link>
      </div>
    </div>
  )
}
