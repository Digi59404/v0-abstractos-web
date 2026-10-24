import { cn } from 'cn'

type LogoMarkProps = {
  className?: string
  mono?: boolean
}

export function LogoMark({ className, mono = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn('size-8', className)}
    >
      <line
        x1="30"
        y1="10"
        x2="15"
        y2="50"
        strokeWidth="6"
        strokeLinecap="round"
        className={mono ? 'stroke-current' : 'stroke-brand-blue'}
      />
      <circle cx="27" cy="44" r="7" className={mono ? 'fill-current' : 'fill-brand-coral'} />
      <path
        d="M44.2 26.5a3 3 0 0 1 5.2 0l9.7 18.8A3 3 0 0 1 56.4 50H37.2a3 3 0 0 1-2.7-4.4z"
        className={mono ? 'fill-current' : 'fill-brand-sun'}
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark />
      <span className="font-heading text-lg font-bold tracking-tight">
        Abstract<span className="text-primary">OS</span>
      </span>
    </span>
  )
}
