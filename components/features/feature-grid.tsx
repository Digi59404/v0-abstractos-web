import {
  AccessibilityIcon,
  BoxesIcon,
  CpuIcon,
  GitMergeIcon,
  LayoutTemplateIcon,
  LibraryIcon,
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  PackageCheckIcon,
  RefreshCwIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'
import type { FeatureAudience } from '@/lib/site'

const icons: { [A in FeatureAudience]: Record<string, LucideIcon> } = {
  users: {
    convergence: MonitorSmartphoneIcon,
    choice: SlidersHorizontalIcon,
    privacy: LockKeyholeIcon,
    apps: PackageCheckIcon,
    updates: RefreshCwIcon,
    accessibility: AccessibilityIcon,
  },
  developers: {
    abstractUi: LayoutTemplateIcon,
    abstractLib: LibraryIcon,
    adaptive: BoxesIcon,
    porting: CpuIcon,
    open: GitMergeIcon,
    tooling: TerminalIcon,
  },
}

export function FeatureGrid({ audience }: { audience: FeatureAudience }) {
  const { m } = getI18n()
  const copy = m.features[audience]
  const items = Object.entries(copy.items) as [string, { title: string; description: string }][]

  return (
    <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <SectionHeading title={<span id="features-heading">{copy.sectionTitle}</span>} description={copy.sectionDescription} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([key, item]) => {
          const Icon = icons[audience][key] ?? BoxesIcon
          return (
            <li key={key}>
              <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-brand-blue/10">
                <CardHeader className="gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
