import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Roboto, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { I18nProvider } from '@/components/i18n/i18n-provider'
import { localeDir, localeTags, locales } from '@/i18n/config'
import { initI18n } from '@/i18n/server'
import '../globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale, m } = await initI18n(params)
  return {
    title: { default: m.meta.title, template: m.meta.titleTemplate },
    description: m.meta.description,
    generator: 'v0.app',
    keywords: m.meta.keywords,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}`])),
    },
    openGraph: {
      title: 'AbstractOS',
      description: m.meta.ogDescription,
      locale: localeTags[locale].replace('-', '_'),
      images: ['/screenshots/files-light.webp'],
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafd',
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale, m } = await initI18n(params)

  return (
    <html lang={localeTags[locale]} dir={localeDir(locale)} className={`${roboto.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <I18nProvider locale={locale} messages={m}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
