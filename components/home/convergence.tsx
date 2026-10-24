import { MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { DesktopFrame, PhoneFrame, TabletFrame } from '@/components/site/device-frames'
import { rich } from '@/i18n/format'
import { getI18n } from '@/i18n/server'

const modes = [
  { key: 'phone', icon: SmartphoneIcon },
  { key: 'tablet', icon: TabletIcon },
  { key: 'desktop', icon: MonitorIcon },
] as const

export function Convergence() {
  const { m } = getI18n()
  const c = m.home.convergence

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow={c.eyebrow}
        title={rich(c.title, { accent: (chunk) => <span className="text-gradient-brand">{chunk}</span> })}
        description={c.description}
      />

      <div className="mt-14 grid items-end gap-6 md:grid-cols-[0.55fr_1fr_1.5fr]">
        <PhoneFrame src="/screenshots/phone.webp" alt={c.phoneAlt} className="mx-auto w-48 md:w-full" />
        <TabletFrame src="/screenshots/tablet.webp" alt={c.tabletAlt} />
        <DesktopFrame src="/screenshots/turbine.webp" alt={c.desktopAlt} />
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {modes.map(({ key, icon: Icon }) => (
          <li key={key} className="flex gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{c.modes[key].title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.modes[key].text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
