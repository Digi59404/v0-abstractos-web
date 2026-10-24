import type { Block } from '@/lib/content/types'

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  topics: string[]
  cover: string
  coverAlt: string
  featured?: boolean
  blocks: Block[]
}

export const posts: Post[] = [
  {
    slug: 'introducing-abstractos-casimir',
    title: 'Introducing AbstractOS 0.1 “Casimir”',
    excerpt:
      'Our first public alpha is here. One Linux system that adapts to your phone, tablet and desktop, with a new shell, Files, Turbine and the installer.',
    date: '2026-10-14',
    author: 'ada-moreno',
    topics: ['releases', 'convergence'],
    cover: '/blog/release-casimir.png',
    coverAlt: 'Abstract composition of a blue slash, coral circle and yellow triangle',
    featured: true,
    blocks: [
      { type: 'p', text: 'Today we are releasing **AbstractOS 0.1, codenamed Casimir**, the first public alpha of an operating system designed from day one to run on phones, tablets and desktops from a single codebase.' },
      { type: 'p', text: 'Casimir is an alpha. It is rough in places and it will break. But it is also the first time the whole convergent stack — compositor, adaptive shell, core apps and installer — ships together as something you can boot.' },
      { type: 'h2', text: 'What is in this release' },
      { type: 'list', items: [
        '**Adaptive shell** that switches between touch, tablet and windowed layouts as displays and input devices change.',
        '**Files**, a rewritten file manager with adaptive sidebars and a new search index.',
        '**Turbine**, our privacy-first browser built on a hardened engine.',
        '**Exposition**, the new overview for switching apps and workspaces.',
        'A guided **installer** with full-disk encryption on by default.',
      ] },
      { type: 'image', src: '/screenshots/exposition.webp', alt: 'Exposition overview showing open windows on a desktop', caption: 'Exposition gathers every open app and workspace into one calm overview.', width: 1920, height: 1080 },
      { type: 'h2', text: 'Supported hardware' },
      { type: 'table', headers: ['Form factor', 'Architecture', 'Status'], rows: [
        ['Desktop and laptop', 'x86_64', 'Supported'],
        ['Desktop and laptop', 'aarch64', 'Preview'],
        ['Tablets', 'aarch64', 'Preview'],
        ['Phones (PinePhone Pro, Librem 5)', 'aarch64', 'Experimental'],
      ] },
      { type: 'callout', tone: 'warning', title: 'Alpha software', text: 'Casimir is not ready to be your daily driver. Back up your data, and try it in a virtual machine or on a spare device first. See [the install guide](/docs/users/getting-started/installing).' },
      { type: 'h2', text: 'Try it today' },
      { type: 'p', text: 'Images for every supported architecture are on the [download page](/download). Verify your download before flashing:' },
      { type: 'code', lang: 'bash', code: 'sha256sum -c abstractos-0.1-casimir-x86_64.iso.sha256\n# abstractos-0.1-casimir-x86_64.iso: OK' },
      { type: 'h2', text: 'What comes next' },
      { type: 'p', text: 'The next milestone focuses on phone stability, the settings app, and our app SDK. Follow the roadmap on the [Ethos page](/ethos) and tell us what breaks on the [forums](https://discourse.abstractos.org).' },
      { type: 'quote', text: 'An operating system should get out of your way, whatever screen you are holding.', cite: 'From the AbstractOS mission statement' },
    ],
  },
  {
    slug: 'one-codebase-every-screen',
    title: 'One codebase, every screen: how the adaptive shell works',
    excerpt:
      'A tour of the compositor, the form-factor service and the breakpoint system that lets AbstractOS reshape itself when you dock a phone.',
    date: '2026-09-30',
    author: 'kenji-watanabe',
    topics: ['engineering', 'convergence'],
    cover: '/blog/convergence.png',
    coverAlt: 'Overlapping translucent rounded rectangles in phone, tablet and desktop sizes',
    blocks: [
      { type: 'p', text: 'Convergence is easy to promise and hard to ship. This post walks through how the AbstractOS shell decides what it should look like, and how apps follow along.' },
      { type: 'h2', text: 'The big picture' },
      { type: 'p', text: 'Three services cooperate: the **compositor** owns outputs and input devices, the **form-factor service** turns that hardware state into a single mode, and the **shell** renders the layout for that mode.' },
      { type: 'diagram', caption: 'Hardware events flow through the form-factor service before the shell and apps adapt.', chart: `flowchart LR
  HW[Displays and input devices] --> C[Compositor]
  C -->|outputs, seats| FF[Form-factor service]
  FF -->|mode: phone, tablet, desktop| S[Adaptive shell]
  FF -->|D-Bus signal| A[Apps via Abstract SDK]
  S --> U[User]
  A --> U` },
      { type: 'h2', text: 'Choosing a mode' },
      { type: 'p', text: 'The form-factor service scores the current hardware. A keyboard and pointer push toward desktop; a single touch display under 7 inches pushes toward phone. The highest score wins, with hysteresis so the UI does not flicker when you bump a dock.' },
      { type: 'code', lang: 'rust', filename: 'form_factor/src/score.rs', code: `pub fn resolve_mode(state: &HardwareState) -> Mode {
    let mut score = Scores::default();

    if state.has_keyboard() && state.has_pointer() {
        score.desktop += 3;
    }
    if let Some(display) = state.primary_display() {
        match display.diagonal_inches() {
            d if d < 7.0 => score.phone += 4,
            d if d < 13.0 => score.tablet += 3,
            _ => score.desktop += 2,
        }
    }

    score.winner_with_hysteresis(state.previous_mode())
}` },
      { type: 'h2', text: 'Following along in apps' },
      { type: 'p', text: 'Apps never ask “am I on a phone?”. They subscribe to breakpoints based on the space they actually have. This keeps a narrow window on a desktop behaving just like a phone.' },
      { type: 'codeTabs', tabs: [
        { label: 'TypeScript', lang: 'ts', code: `import { useBreakpoint } from '@abstract/sdk'

export function Sidebar() {
  const bp = useBreakpoint() // 'compact' | 'medium' | 'expanded'
  return bp === 'compact' ? <BottomSheet /> : <SidePanel />
}` },
        { label: 'Rust', lang: 'rust', code: `use abstract_sdk::Breakpoint;

window.on_breakpoint(|bp| match bp {
    Breakpoint::Compact => sidebar.collapse(),
    _ => sidebar.expand(),
});` },
      ] },
      { type: 'callout', tone: 'tip', text: 'You can force a mode while developing with `abstract-ctl form-factor set tablet`. See the [SDK docs](/docs/developers/sdk/adaptive-layouts).' },
      { type: 'h2', text: 'What we learned' },
      { type: 'list', items: [
        'Base layouts on available space, never on device type.',
        'Hysteresis matters more than precision. Users notice flicker immediately.',
        'Keep transitions under 250 ms so a mode switch feels like a single gesture.',
      ] },
    ],
  },
  {
    slug: 'designing-exposition',
    title: 'Designing Exposition, a calmer way to switch apps',
    excerpt:
      'From a whiteboard sketch to the shipped overview: the principles, false starts and details behind Exposition.',
    date: '2026-09-12',
    author: 'priya-raman',
    topics: ['design'],
    cover: '/screenshots/exposition.webp',
    coverAlt: 'Exposition overview with open windows arranged on a desktop',
    blocks: [
      { type: 'p', text: 'Every operating system has an app switcher. Most of them are noisy. With Exposition, we wanted an overview that felt like stepping back from your desk rather than rummaging through a drawer.' },
      { type: 'h2', text: 'Principles' },
      { type: 'list', ordered: true, items: [
        '**Spatial memory first.** Windows keep their relative positions so you can find them by where they were.',
        '**One gesture, every device.** Three-finger swipe, the Super key and a long press on the home bar all open Exposition.',
        '**Quiet chrome.** Labels appear on hover or focus, not all at once.',
      ] },
      { type: 'image', src: '/screenshots/exposition.webp', alt: 'Exposition with windows arranged by their original position', caption: 'The final Exposition design keeps windows close to where you left them.', width: 1920, height: 1080 },
      { type: 'h2', text: 'What we threw away' },
      { type: 'p', text: 'Our first prototype used a carousel. It tested well on phones and poorly everywhere else: on a desktop with twelve windows, nobody could find anything. Spatial layout won.' },
      { type: 'quote', text: 'If it only works on one screen size, it is not done yet.', cite: 'Priya Raman, design review notes' },
      { type: 'h2', text: 'Try it' },
      { type: 'p', text: 'Exposition ships in Casimir. Learn every gesture in the [Exposition guide](/docs/users/exposition/overview).' },
    ],
  },
  {
    slug: 'turbine-privacy-by-default',
    title: 'Turbine: a browser that keeps your data where it belongs',
    excerpt:
      'Why we built our own browser shell, how tracking protection works, and the trade-offs we made for speed.',
    date: '2026-08-27',
    author: 'kenji-watanabe',
    topics: ['engineering'],
    cover: '/screenshots/turbine.webp',
    coverAlt: 'Turbine browser window with a clean start page',
    blocks: [
      { type: 'p', text: 'Turbine is the default browser in AbstractOS. It is built on a hardened engine with an adaptive shell of our own, so it feels at home in phone, tablet and desktop modes.' },
      { type: 'h2', text: 'Privacy defaults' },
      { type: 'table', headers: ['Feature', 'Default', 'Notes'], rows: [
        ['Third-party cookies', 'Blocked', 'Partitioned per site when allowed'],
        ['Known trackers', 'Blocked', 'Lists update weekly'],
        ['Telemetry', 'Off', 'Opt-in crash reports only'],
        ['HTTPS-only mode', 'On', 'Prompts before loading HTTP'],
      ] },
      { type: 'image', src: '/screenshots/turbine.webp', alt: 'Turbine browser start page', caption: 'Turbine in desktop mode.', width: 1920, height: 1080 },
      { type: 'h2', text: 'Policy for administrators' },
      { type: 'p', text: 'Organizations can pin settings with a JSON policy file:' },
      { type: 'code', lang: 'json', filename: '/etc/turbine/policies.json', code: `{
  "HttpsOnlyMode": "force",
  "BlockThirdPartyCookies": true,
  "Homepage": "https://intranet.example.org"
}` },
    ],
  },
  {
    slug: 'the-shape-language',
    title: 'Slash, circle, triangle: the AbstractOS shape language',
    excerpt:
      'Our logo is three primitives. Here is how those same shapes drive icons, illustrations and motion across the system.',
    date: '2026-08-08',
    author: 'priya-raman',
    topics: ['design'],
    cover: '/blog/design-language.png',
    coverAlt: 'Grid of geometric shapes with construction guide lines',
    blocks: [
      { type: 'p', text: 'The AbstractOS mark is a slash, a circle and a triangle. They are the simplest shapes we could find that still feel like they have a personality.' },
      { type: 'h2', text: 'The palette' },
      { type: 'table', headers: ['Token', 'Role', 'Used for'], rows: [
        ['`brand-blue`', 'Primary', 'Actions, focus, links'],
        ['`brand-coral`', 'Accent', 'Highlights and illustrations'],
        ['`brand-sun`', 'Accent', 'Warnings and warmth'],
        ['`brand-teal`', 'Accent', 'Success and tips'],
      ] },
      { type: 'h2', text: 'Motion' },
      { type: 'p', text: 'Shapes move with a single easing curve, `cubic-bezier(0.2, 0, 0, 1)`, for 200 to 300 ms. Circles scale, slashes slide, triangles rotate. That is the whole system.' },
    ],
  },
  {
    slug: 'files-rewrite',
    title: 'Rewriting Files for every form factor',
    excerpt: 'How we rebuilt the file manager with an adaptive sidebar, instant search and light and dark themes.',
    date: '2026-07-22',
    author: 'kenji-watanabe',
    topics: ['engineering', 'design', 'convergence'],
    cover: '/screenshots/files-light.webp',
    coverAlt: 'Files app in light theme',
    blocks: [
      { type: 'p', text: 'Files is the app people open most. The rewrite focused on three things: adaptive layout, instant search and calmer visuals.' },
      { type: 'image', src: '/screenshots/files-dark.webp', alt: 'Files app in dark theme', caption: 'Files in the dark theme.', width: 1920, height: 1080 },
      { type: 'h2', text: 'Instant search' },
      { type: 'p', text: 'A background indexer keeps an SQLite FTS5 index of file names and metadata. Queries return in under 20 ms on a 500,000 file home directory.' },
      { type: 'specs', title: 'Indexer at a glance', items: [
        { label: 'Storage', value: 'SQLite FTS5' },
        { label: 'Watcher', value: 'fanotify' },
        { label: 'p95 query', value: '18 ms' },
        { label: 'Idle CPU', value: '< 0.5%' },
      ] },
    ],
  },
  {
    slug: 'building-the-installer',
    title: 'Building an installer that respects your time',
    excerpt: 'Four screens, encryption by default, and a recovery key you will actually keep. The story of the AbstractOS installer.',
    date: '2026-07-03',
    author: 'priya-raman',
    topics: ['design', 'releases'],
    cover: '/screenshots/installer.webp',
    coverAlt: 'AbstractOS installer showing installation type choices',
    blocks: [
      { type: 'p', text: 'Installing an operating system is the first impression. We wanted ours to take four screens and fewer than ten minutes.' },
      { type: 'steps', items: [
        { title: 'Language and keyboard', text: 'Detected automatically, confirmed with one tap.' },
        { title: 'Installation type', text: 'Erase disk, install alongside, or advanced partitioning.' },
        { title: 'Encryption', text: 'On by default, with a printable recovery key.' },
        { title: 'Account', text: 'Create your user and you are done.' },
      ] },
      { type: 'image', src: '/screenshots/installer.webp', alt: 'Installation type selection screen', width: 1920, height: 1080 },
    ],
  },
  {
    slug: 'community-update-october-2026',
    title: 'Community update: October 2026',
    excerpt: 'Casimir launch week, 140 new contributors, translation milestones and the first community call recording.',
    date: '2026-10-20',
    author: 'sam-okafor',
    topics: ['community'],
    cover: '/blog/community.png',
    coverAlt: 'Colorful shapes gathering into a connected constellation',
    blocks: [
      { type: 'p', text: 'What a month. Casimir shipped, the forums doubled in size, and our IRC channel had its busiest week ever.' },
      { type: 'h2', text: 'By the numbers' },
      { type: 'specs', items: [
        { label: 'New contributors', value: '140' },
        { label: 'Merged merge requests', value: '612' },
        { label: 'Languages above 80%', value: '23' },
        { label: 'Forum members', value: '9,800' },
      ] },
      { type: 'h2', text: 'Get involved' },
      { type: 'p', text: 'New here? Start with the [community page](/community) and the [contributing guide](/docs/developers/contributing/getting-started).' },
    ],
  },
]
