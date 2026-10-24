import Link from 'next/link'
import { DownloadIcon, UsersIcon } from 'lucide-react'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { LogoMark } from '@/components/site/logo'
import { getI18n } from '@/i18n/server'

export function CtaBand() {
  const { m } = getI18n()

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center text-background sm:px-12">
        <div aria-hidden="true" className="absolute -top-16 -left-10 -z-10 size-64 rounded-full bg-brand-blue/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-10 -bottom-20 -z-10 size-72 rounded-full bg-brand-coral/25 blur-3xl" />
        <LogoMark mono className="mx-auto size-14 text-background" />
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{m.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-background/75">{m.cta.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/download"
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'h-11 rounded-full px-6 text-base')}
          >
            <DownloadIcon data-icon="inline-start" />
            {m.cta.download}
          </Link>
          <Link
            href="/community"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'h-11 rounded-full px-6 text-base text-background hover:bg-background/15 hover:text-background'
            )}
          >
            <UsersIcon data-icon="inline-start" />
            {m.cta.community}
          </Link>
        </div>
      </div>
    </section>
  )
}
