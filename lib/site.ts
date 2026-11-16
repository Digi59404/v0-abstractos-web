/** Labels live in the language pack under `nav.<key>`. */
export type NavLink = {
  href: string
  key:
    | 'home'
    | 'forUsers'
    | 'forDevelopers'
    | 'docsUsers'
    | 'docsDevelopers'
    | 'ethos'
    | 'arrcade'
    | 'devices'
    | 'blog'
    | 'community'
  descriptionKey?:
    | 'forUsersDescription'
    | 'forDevelopersDescription'
    | 'docsUsersDescription'
    | 'docsDevelopersDescription'
    | 'devicesDescription'
    | 'ethosDescription'
    | 'arrcadeDescription'
  external?: boolean
}

export type NavGroup = {
  key: 'features' | 'documentation' | 'about'
  children: NavLink[]
}

export type NavItem = NavLink | NavGroup

export const isNavGroup = (item: NavItem): item is NavGroup => 'children' in item

export const featureAudiences = ['users', 'developers'] as const
export type FeatureAudience = (typeof featureAudiences)[number]

export const navItems: NavItem[] = [
  { href: '/', key: 'home' },
  {
    key: 'features',
    children: [
      { href: '/features/users', key: 'forUsers', descriptionKey: 'forUsersDescription' },
      { href: '/features/developers', key: 'forDevelopers', descriptionKey: 'forDevelopersDescription' },
    ],
  },
  {
    key: 'documentation',
    children: [
      { href: '/docs/users', key: 'docsUsers', descriptionKey: 'docsUsersDescription' },
      { href: '/docs/developers', key: 'docsDevelopers', descriptionKey: 'docsDevelopersDescription' },
    ],
  },
  { href: '/community', key: 'community' },
  { href: '/blog', key: 'blog' },
  {
    key: 'about',
    children: [
      { href: '/ethos', key: 'ethos', descriptionKey: 'ethosDescription' },
      { href: '/devices', key: 'devices', descriptionKey: 'devicesDescription' },
      { href: 'https://arrcade.com', key: 'arrcade', descriptionKey: 'arrcadeDescription', external: true },
    ],
  },
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
  matrix: 'https://matrix.to/#/#abstractos:matrix.org',
  mastodon: 'https://fosstodon.org/@abstractos',
  arrcade: 'https://arrcade.com',
} as const
