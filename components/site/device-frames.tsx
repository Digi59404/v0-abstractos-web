import Image from 'next/image'
import { cn } from 'cn'

type FrameProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function DesktopFrame({ src, alt, className, priority }: FrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/80 bg-card p-1.5 shadow-2xl shadow-brand-blue/15',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1200}
        priority={priority}
        sizes="(min-width: 1024px) 900px, 100vw"
        className="h-auto w-full rounded-xl"
      />
    </div>
  )
}

export function TabletFrame({ src, alt, className }: FrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.75rem] border-[6px] border-foreground/90 bg-foreground shadow-2xl shadow-brand-teal/20',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={896}
        sizes="(min-width: 1024px) 520px, 90vw"
        className="h-auto w-full rounded-[1.25rem]"
      />
    </div>
  )
}

export function PhoneFrame({ src, alt, className, priority }: FrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[2.25rem] border-[6px] border-foreground/90 bg-foreground shadow-2xl shadow-brand-coral/25',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={704}
        height={1520}
        priority={priority}
        sizes="(min-width: 1024px) 220px, 40vw"
        className="h-auto w-full rounded-[1.8rem]"
      />
    </div>
  )
}
