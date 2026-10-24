import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start',
        'max-w-2xl',
        className
      )}
    >
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <Heading
        className={cn(
          'font-bold tracking-tight',
          Heading === 'h1' ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl'
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
