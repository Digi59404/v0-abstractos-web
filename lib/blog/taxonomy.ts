export type Author = {
  slug: string
  name: string
  role: string
  bio: string
  initials: string
  color: 'blue' | 'coral' | 'sun' | 'teal'
  handle: string
}

export type Topic = {
  slug: string
  name: string
  description: string
  color: 'blue' | 'coral' | 'sun' | 'teal'
}

export const authors: Author[] = [
  {
    slug: 'ada-moreno',
    name: 'Ada Moreno',
    role: 'Project Lead',
    bio: 'Ada steers the AbstractOS roadmap and spends far too much time thinking about how a phone should become a desktop.',
    initials: 'AM',
    color: 'blue',
    handle: '@ada',
  },
  {
    slug: 'kenji-watanabe',
    name: 'Kenji Watanabe',
    role: 'Shell Engineer',
    bio: 'Kenji works on the compositor and the adaptive shell. Previously hacked on Wayland compositors and embedded Linux.',
    initials: 'KW',
    color: 'teal',
    handle: '@kenji',
  },
  {
    slug: 'priya-raman',
    name: 'Priya Raman',
    role: 'Design Lead',
    bio: 'Priya maintains the AbstractOS design language, from the slash-circle-triangle mark to every pixel in Files.',
    initials: 'PR',
    color: 'coral',
    handle: '@priya',
  },
  {
    slug: 'sam-okafor',
    name: 'Sam Okafor',
    role: 'Community Manager',
    bio: 'Sam keeps the forums friendly, the IRC channel lively, and the monthly community updates on schedule.',
    initials: 'SO',
    color: 'sun',
    handle: '@sam',
  },
]

export const topics: Topic[] = [
  {
    slug: 'releases',
    name: 'Releases',
    description: 'Release notes, milestones, and what shipped in each AbstractOS build.',
    color: 'blue',
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    description: 'Deep dives into the compositor, toolkit, packaging and the internals of AbstractOS.',
    color: 'teal',
  },
  {
    slug: 'design',
    name: 'Design',
    description: 'How the AbstractOS design language takes shape, from concepts to shipped pixels.',
    color: 'coral',
  },
  {
    slug: 'convergence',
    name: 'Convergence',
    description: 'One system across phone, tablet and desktop. How we make adaptive work.',
    color: 'sun',
  },
  {
    slug: 'community',
    name: 'Community',
    description: 'Monthly updates, contributor spotlights and news from the AbstractOS community.',
    color: 'sun',
  },
]

export const topicColorClass = {
  blue: 'bg-brand-blue',
  coral: 'bg-brand-coral',
  sun: 'bg-brand-sun',
  teal: 'bg-brand-teal',
} as const
