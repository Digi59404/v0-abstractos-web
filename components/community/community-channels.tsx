import Link from 'next/link'
import {
  ArrowUpRightIcon,
  GitMergeIcon,
  HashIcon,
  MessageCircleIcon,
  MessagesSquareIcon,
  RadioTowerIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { links } from '@/lib/site'

const channels = [
  { key: 'reddit', name: 'Reddit', handle: 'r/AbstractOS', href: links.reddit, icon: MessageCircleIcon },
  { key: 'irc', name: 'IRC', handle: '#abstractos · Libera.Chat', href: links.irc, icon: HashIcon },
  { key: 'forums', name: 'Discourse', handle: 'discourse.abstractos.org', href: links.forums, icon: MessagesSquareIcon },
  { key: 'matrix', name: 'Matrix', handle: '#abstractos:matrix.org', href: links.matrix, icon: RadioTowerIcon },
  { key: 'gitlab', name: 'GitLab', handle: 'gitlab.com/abstract', href: links.gitlab, icon: GitMergeIcon },
  { key: 'mastodon', name: 'Mastodon', handle: '@abstractos@fosstodon.org', href: links.mastodon, icon: MessageCircleIcon },
] as const

export function CommunityChannels() {
  const { m } = getI18n()
  const c = m.community.channels

  return (
    <section aria-labelledby="channels-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <h2 id="channels-heading" className="sr-only">
        {c.heading}
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => {
          const copy = c.items[channel.key]
          const Icon = channel.icon
          return (
            <li key={channel.key}>
              <Link
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand-blue/10">
                  <CardHeader className="gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <Badge variant="outline">{copy.tag}</Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="font-heading text-xl">{copy.name}</CardTitle>
                      <p className="text-sm font-medium text-primary">{channel.handle}</p>
                    </div>
                    <CardDescription className="leading-relaxed">{copy.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <span className="inline-flex items-center gap-1 text-sm font-medium">
                      {format(c.join, { name: copy.name })}
                      <ArrowUpRightIcon
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{m.common.opensInNewTab}</span>
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
