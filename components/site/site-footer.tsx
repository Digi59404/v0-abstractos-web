import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/site/logo'
import { links, release } from '@/lib/site'

const columns = [
  {
    title: 'Product',
    items: [
      { label: 'Download', href: '/download' },
      { label: 'Screenshots', href: '/#screenshots' },
      { label: 'Release notes', href: links.releases },
    ],
  },
  {
    title: 'Project',
    items: [
      { label: 'Our Ethos', href: '/ethos' },
      { label: 'Roadmap', href: '/ethos#roadmap' },
      { label: 'Design repository', href: links.designs },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Reddit', href: links.reddit },
      { label: 'IRC', href: links.irc },
      { label: 'Forums', href: links.forums },
      { label: 'GitLab', href: links.gitlab },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            A user-first, convergent Linux operating system for every screen you own.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => {
                const external = item.href.startsWith('http')
                return (
                  <li key={item.label}>
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
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {'© '}
          {new Date().getFullYear()} Abstract Studio. Linux is a registered trademark of Linus Torvalds.
        </p>
        <p>
          AbstractOS {release.version} {release.codename} · {release.channel}
        </p>
      </div>
    </footer>
  )
}
