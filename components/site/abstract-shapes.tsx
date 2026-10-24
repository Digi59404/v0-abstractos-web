import { cn } from 'cn'

/** Decorative backdrop built from the logo's primitives: slash, circle, triangle. */
export function AbstractShapes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-linear-to-b from-brand-sand to-transparent" />
      <div className="absolute -top-40 -left-24 size-[28rem] rounded-full bg-brand-teal/40 blur-3xl" />
      <div className="absolute top-20 -right-24 size-[24rem] rounded-full bg-brand-sun/35 blur-3xl" />

      <div className="hidden md:block">
        <div className="absolute top-24 left-[8%] h-36 w-2.5 rotate-[22deg] rounded-full bg-brand-blue/35 animate-drift" />
        <div className="absolute top-[38%] right-[7%] size-12 rounded-full border-2 border-brand-coral/50 animate-drift [animation-delay:-3s]" />
        <div className="absolute bottom-[18%] left-[5%] size-16 bg-brand-sun/60 animate-drift [animation-delay:-5s] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
      </div>
    </div>
  )
}
