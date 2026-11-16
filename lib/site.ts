/** Labels live in the language pack under `nav.<key>`. */
export type NavLink = {
  href: string
  key: 'home' | 'ethos' | 'arrcade' | 'devices' | 'docs' | 'blog' | 'community' | 'download'
  descriptionKey?: 'ethosDescription' | 'arrcadeDescription'
  external?: boolean
}

export type NavGroup = {
  key: 'about'
  children: NavLink[]
}

export type NavItem = NavLink | NavGroup

export const isNavGroup = (item: NavItem): item is NavGroup => 'children' in item

export const navItems: NavItem[] = [
  { href: '/', key: 'home' },
  {
    key: 'about',
    children: [
      { href: '/ethos', key: 'ethos', descriptionKey: 'ethosDescription' },
      { href: 'https://arrcade.com', key: 'arrcade', descriptionKey: 'arrcadeDescription', external: true },
    ],
  },
  { href: '/devices', key: 'devices' },
  { href: '/docs', key: 'docs' },
  { href: '/blog', key: 'blog' },
  { href: '/community', key: 'community' },
  { href: '/download', key: 'download' },
]

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
  arrcade: 'https://arrcade.com',
} as const
