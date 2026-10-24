import {
  LayersIcon,
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TerminalIcon,
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'

const icons = {
  convergent: MonitorSmartphoneIcon,
  beautiful: SparklesIcon,
  private: LockKeyholeIcon,
  choice: SlidersHorizontalIcon,
  power: TerminalIcon,
  adapt: LayersIcon,
} as const

export function ValueProps() {
  const { m } = getI18n()
  const v = m.home.values

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading eyebrow={v.eyebrow} title={v.title} description={v.description} />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => {
          const Icon = icons[key]
          const item = v.items[key]
          return (
            <Card key={key} className="transition-shadow hover:shadow-lg hover:shadow-brand-blue/10">
              <CardHeader className="gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                <CardDescription className="leading-relaxed">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
