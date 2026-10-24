import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'

const ONE_YEAR = 60 * 60 * 24 * 365

function preferredLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(fromCookie)) return fromCookie

  const accepted = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase())
  for (const tag of accepted) {
    const match = locales.find((l) => tag === l || tag.startsWith(`${l}-`))
    if (match) return match
  }
  return defaultLocale
}

/**
 * Every page lives under `app/[locale]`. URLs stay unprefixed for the visitor's
 * language (cookie, then Accept-Language), while `/<locale>/...` links can be shared
 * and pin the language. `/en/...` redirects to the canonical unprefixed URL.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1]

  if (isLocale(first)) {
    if (first === defaultLocale) {
      const url = request.nextUrl.clone()
      url.pathname = pathname.slice(first.length + 1) || '/'
      const response = NextResponse.redirect(url)
      response.cookies.set(LOCALE_COOKIE, first, { path: '/', maxAge: ONE_YEAR })
      return response
    }
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, first, { path: '/', maxAge: ONE_YEAR })
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/|_vercel/|.*\\.(?:png|jpe?g|webp|gif|svg|ico|txt|json|css|js|map|woff2?)$).*)'],
}
