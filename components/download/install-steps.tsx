import Image from 'next/image'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'

export function InstallSteps() {
  const { m, locale } = getI18n()
  const s = m.download.install

  return (
    <section className="bg-brand-sand/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading align="left" eyebrow={s.eyebrow} title={s.title} description={s.description} />
          <ol className="flex flex-col gap-6">
            {s.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground"
                >
                  {(i + 1).toLocaleString(locale)}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card p-1.5 shadow-2xl shadow-brand-coral/15">
          <Image
            src="/screenshots/usb-utility.webp"
            alt={s.imageAlt}
            width={1920}
            height={1200}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
