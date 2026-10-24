import Link from 'next/link'
import { DownloadIcon, UsersIcon } from 'lucide-react'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { LogoMark } from '@/components/site/logo'

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
        <div aria-hidden="true" className="absolute -top-16 -left-10 -z-10 size-64 rounded-full bg-brand-coral/60 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-10 -bottom-20 -z-10 size-72 rounded-full bg-brand-sun/50 blur-3xl" />
        <LogoMark mono className="mx-auto size-14 text-primary-foreground" />
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Help shape the future of personal computing
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/85">
          AbstractOS is in alpha. Try it in a VM, flash it to a USB drive, and tell us what you think.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/download"
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'h-11 rounded-full px-6 text-base')}
          >
            <DownloadIcon data-icon="inline-start" />
            Download the alpha
          </Link>
          <Link
            href="/community"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'h-11 rounded-full px-6 text-base text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground'
            )}
          >
            <UsersIcon data-icon="inline-start" />
            Join the community
          </Link>
        </div>
      </div>
    </section>
  )
}
