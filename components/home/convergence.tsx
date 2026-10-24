import { MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { DesktopFrame, PhoneFrame, TabletFrame } from '@/components/site/device-frames'

const modes = [
  { icon: SmartphoneIcon, title: 'Phone', text: 'A touch-first home screen with gestures and a frosted dock.' },
  { icon: TabletIcon, title: 'Tablet', text: 'Side-by-side windows that snap into a productive split view.' },
  { icon: MonitorIcon, title: 'Desktop', text: 'Free-floating windows, a full dock and keyboard-driven workflows.' },
]

export function Convergence() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="Convergence"
        title={
          <>
            Shapes that change. <span className="text-gradient-brand">An OS that doesn&apos;t.</span>
          </>
        }
        description="AbstractOS reshapes its interface to fit the device in your hand — without ever asking you to learn a new system."
      />

      <div className="mt-14 grid items-end gap-6 md:grid-cols-[0.55fr_1fr_1.5fr]">
        <PhoneFrame src="/screenshots/phone.webp" alt="AbstractOS phone home screen" className="mx-auto w-48 md:w-full" />
        <TabletFrame src="/screenshots/tablet.webp" alt="AbstractOS tablet with Files and notes in split view" />
        <DesktopFrame src="/screenshots/turbine.webp" alt="AbstractOS desktop with the Turbine browser" />
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {modes.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
