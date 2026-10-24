import { cn } from 'cn'

/** Decorative backdrop built from the logo's primitives: slash, circle, triangle. */
export function AbstractShapes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand-blue/25 blur-3xl" />
      <div className="absolute top-10 -right-20 size-[24rem] rounded-full bg-brand-coral/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-brand-sun/25 blur-3xl" />

      <div className="hidden md:block">
        <div className="absolute top-24 left-[8%] h-40 w-3 rotate-[22deg] rounded-full bg-brand-blue/70 animate-drift" />
        <div className="absolute top-[38%] right-[7%] size-14 rounded-full bg-brand-coral/80 animate-drift [animation-delay:-3s]" />
        <div className="absolute bottom-[18%] left-[5%] size-20 bg-brand-sun/90 animate-drift [animation-delay:-5s] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <div className="absolute top-16 right-[28%] size-6 rounded-full bg-brand-teal animate-drift [animation-delay:-2s]" />
      </div>
    </div>
  )
}
