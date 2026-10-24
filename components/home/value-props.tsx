import {
  LayersIcon,
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TerminalIcon,
} from 'lucide-react'
import { cn } from 'cn'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'

const props = [
  {
    icon: MonitorSmartphoneIcon,
    title: 'Truly convergent',
    description:
      'The same apps, files and settings flow between phone, tablet and desktop. Dock your phone and it becomes a full workstation.',
    tone: 'bg-brand-blue/15 text-brand-blue',
  },
  {
    icon: SparklesIcon,
    title: 'Beautiful by default',
    description:
      'Light, airy windows, thoughtful typography and a calm dock. No theming marathon required on day one.',
    tone: 'bg-brand-coral/15 text-brand-coral',
  },
  {
    icon: LockKeyholeIcon,
    title: 'Private by design',
    description:
      'Fingerprint unlock, a private-first browser in Turbine, and no telemetry you did not ask for.',
    tone: 'bg-brand-teal/20 text-foreground',
  },
  {
    icon: SlidersHorizontalIcon,
    title: 'Your device, your choice',
    description:
      'Run open or closed source software, your call. We protect your right to choose instead of choosing for you.',
    tone: 'bg-brand-sun/25 text-foreground',
  },
  {
    icon: TerminalIcon,
    title: 'Room for power users',
    description:
      'A real Linux underneath. Drop into a terminal, flash your own builds, or develop natively with Vala and GTK.',
    tone: 'bg-brand-blue/15 text-brand-blue',
  },
  {
    icon: LayersIcon,
    title: 'Apps that adapt',
    description:
      'Files, Turbine, Marker and the Exposition app store are designed to reflow gracefully at every size.',
    tone: 'bg-brand-coral/15 text-brand-coral',
  },
]

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="Why AbstractOS"
        title="A first-class alternative, built around you"
        description="We put the user first in every decision — while keeping the door wide open for advanced users."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {props.map(({ icon: Icon, title, description, tone }) => (
          <Card key={title} className="transition-shadow hover:shadow-lg hover:shadow-brand-blue/10">
            <CardHeader className="gap-3">
              <div className={cn('flex size-11 items-center justify-center rounded-xl', tone)}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <CardTitle className="font-heading text-lg">{title}</CardTitle>
              <CardDescription className="leading-relaxed">{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
