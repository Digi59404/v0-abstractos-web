import Link from 'next/link'
import { BugIcon, CodeIcon, LanguagesIcon, PaletteIcon } from 'lucide-react'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'
import { links } from '@/lib/site'

const ways = [
  { key: 'code', icon: CodeIcon },
  { key: 'design', icon: PaletteIcon },
  { key: 'test', icon: BugIcon },
  { key: 'translate', icon: LanguagesIcon },
] as const

export function Contribute() {
  const { m } = getI18n()
  const c = m.community.contribute

  return (
    <section className="bg-brand-sand/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading align="left" eyebrow={c.eyebrow} title={c.title} description={c.description} />
          <div className="flex flex-wrap gap-3">
            <Link
              href={links.gitlab}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-full px-6')}
            >
              {c.gitlab}
            </Link>
            <Link
              href={links.designs}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-full px-6')}
            >
              {c.designs}
            </Link>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {ways.map(({ key, icon: Icon }) => (
            <li key={key} className="flex flex-col gap-2 rounded-2xl border bg-card p-5">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">{c.ways[key].title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.ways[key].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
