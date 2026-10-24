export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/ethos', label: 'Ethos' },
  { href: '/devices', label: 'Devices' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/community', label: 'Community' },
  { href: '/download', label: 'Download' },
] as const

export const release = {
  version: '0.1',
  codename: 'Casimir',
  channel: 'Alpha',
} as const

export const links = {
  gitlab: 'https://gitlab.com/abstract',
  designs: 'https://gitlab.com/abstract/designs',
  releases: 'https://gitlab.com/abstract/abstract-os/-/releases',
  reddit: 'https://www.reddit.com/r/AbstractOS',
  irc: 'https://web.libera.chat/#abstractos',
  forums: 'https://discourse.abstractos.org',
  matrix: 'https://matrix.to/#/#abstractos:matrix.org',
  mastodon: 'https://fosstodon.org/@abstractos',
} as const
