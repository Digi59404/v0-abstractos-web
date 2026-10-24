import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Roboto, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: {
    default: 'AbstractOS — One Linux OS for phone, tablet and desktop',
    template: '%s · AbstractOS',
  },
  description:
    'AbstractOS is a user-first, convergent Linux operating system that adapts to your phone, tablet and desktop. Beautiful by default, open by design.',
  generator: 'v0.app',
  keywords: ['AbstractOS', 'Linux', 'convergent OS', 'mobile Linux', 'open source operating system'],
  openGraph: {
    title: 'AbstractOS',
    description: 'One Linux OS for every screen you own.',
    images: ['/screenshots/files-light.webp'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
