/** Labels live in the language pack under `nav.<key>`. */
export const navItems = [
  { href: '/', key: 'home' },
  { href: '/ethos', key: 'ethos' },
  { href: '/devices', key: 'devices' },
  { href: '/docs', key: 'docs' },
  { href: '/blog', key: 'blog' },
  { href: '/community', key: 'community' },
  { href: '/download', key: 'download' },
] as const

export const release = {
  version: '0.1',
  codename: 'Casimir',
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
