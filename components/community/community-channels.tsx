import Link from 'next/link'
import {
  ArrowUpRightIcon,
  GitMergeIcon,
  HashIcon,
  MessageCircleIcon,
  MessagesSquareIcon,
  RadioTowerIcon,
  type LucideIcon,
} from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { links } from '@/lib/site'

type Channel = {
  name: string
  handle: string
  description: string
  href: string
  icon: LucideIcon
  tone: string
  tag: string
}

const channels: Channel[] = [
  {
    name: 'Reddit',
    handle: 'r/AbstractOS',
    description: 'Share screenshots, show off your setup, and discuss news and releases with fellow users.',
    href: links.reddit,
    icon: MessageCircleIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Discussion',
  },
  {
    name: 'IRC',
    handle: '#abstractos on Libera.Chat',
    description: 'Real-time chat with contributors and maintainers. Perfect for quick questions and dev talk.',
    href: links.irc,
    icon: HashIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Live chat',
  },
  {
    name: 'Forums',
    handle: 'discourse.abstractos.org',
    description: 'Long-form help, feature requests and design proposals — searchable and organised by topic.',
    href: links.forums,
    icon: MessagesSquareIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Support',
  },
  {
    name: 'Matrix',
    handle: '#abstractos:matrix.org',
    description: 'A modern, federated chat bridged with our IRC channel. Join from any Matrix client.',
    href: links.matrix,
    icon: RadioTowerIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Live chat',
  },
  {
    name: 'GitLab',
    handle: 'gitlab.com/abstract',
    description: 'Source code, issues, merge requests and the public design repository all live here.',
    href: links.gitlab,
    icon: GitMergeIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Code',
  },
  {
    name: 'Mastodon',
    handle: '@abstractos@fosstodon.org',
    description: 'Follow for release announcements, design sneak peeks and community highlights.',
    href: links.mastodon,
    icon: MessageCircleIcon,
    tone: 'bg-accent text-accent-foreground',
    tag: 'Updates',
  },
]

export function CommunityChannels() {
  return (
    <section aria-labelledby="channels-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <h2 id="channels-heading" className="sr-only">
        Community channels
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((c) => (
          <li key={c.name}>
            <Link
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand-blue/10">
                <CardHeader className="gap-4">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex size-12 items-center justify-center rounded-2xl', c.tone)}>
                      <c.icon className="size-5" aria-hidden="true" />
                    </div>
                    <Badge variant="outline">{c.tag}</Badge>
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-heading text-xl">{c.name}</CardTitle>
                    <p className="text-sm font-medium text-primary">{c.handle}</p>
                  </div>
                  <CardDescription className="leading-relaxed">{c.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    Join {c.name}
                    <ArrowUpRightIcon
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
