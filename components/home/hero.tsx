import Link from 'next/link'
import { ArrowRightIcon, DownloadIcon } from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { AbstractShapes } from '@/components/site/abstract-shapes'
import { DesktopFrame, PhoneFrame } from '@/components/site/device-frames'
import { release } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <AbstractShapes />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pt-16 pb-10 text-center sm:px-6 md:pt-24">
        <Badge variant="outline" className="bg-background/70 backdrop-blur">
          <span className="size-1.5 rounded-full bg-brand-coral" aria-hidden="true" />
          {release.channel} {release.version} “{release.codename}” is here
        </Badge>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          One OS. <span className="text-gradient-brand">Every screen.</span>
        </h1>

        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          AbstractOS is a user-first Linux operating system that converges across your phone,
          tablet and desktop — friendly enough for everyone, open enough for experts.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/download" className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-full px-6 text-base')}>
            <DownloadIcon data-icon="inline-start" />
            Download AbstractOS
          </Link>
          <Link
            href="/ethos"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-full px-6 text-base')}
          >
            Read our ethos
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <DesktopFrame
          src="/screenshots/files-light.webp"
          alt="AbstractOS desktop showing the Files app in light mode over a desert wallpaper"
          priority
        />
        <PhoneFrame
          src="/screenshots/phone.webp"
          alt="AbstractOS on a phone with the home screen and app grid"
          className="absolute -right-1 -bottom-2 w-[26%] max-w-[220px] sm:right-2 md:-right-6"
          priority
        />
      </div>
    </section>
  )
}
