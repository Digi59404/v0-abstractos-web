import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/site/logo'
import { LocaleSwitcher } from '@/components/i18n/locale-switcher'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { links, release } from '@/lib/site'

export function SiteFooter() {
  const { m } = getI18n()
  const f = m.footer

  const columns = [
    {
      title: f.product,
      items: [
        { label: f.links.download, href: '/download' },
        { label: f.links.screenshots, href: '/#screenshots' },
        { label: f.links.releaseNotes, href: links.releases },
      ],
    },
    {
      title: f.project,
      items: [
        { label: f.links.ethos, href: '/ethos' },
        { label: f.links.roadmap, href: '/ethos#roadmap' },
        { label: f.links.designs, href: links.designs },
      ],
    },
    {
      title: f.community,
      items: [
        { label: 'Reddit', href: links.reddit },
        { label: 'IRC', href: links.irc },
        { label: f.links.forums, href: links.forums },
        { label: 'GitLab', href: links.gitlab },
      ],
    },
  ]

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{f.tagline}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => {
                const external = item.href.startsWith('http')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{format(f.legal, { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <p>{format(f.build, { version: release.version, codename: release.codename, channel: m.release.channel })}</p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  )
}
