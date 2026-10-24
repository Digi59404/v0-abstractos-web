import { cn } from 'cn'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'

const shapes = ['slash', 'circle', 'triangle'] as const

const shapeClass = {
  slash: 'h-9 w-2 rotate-[22deg] rounded-full bg-brand-blue',
  circle: 'size-7 rounded-full bg-brand-coral',
  triangle: 'size-8 bg-brand-sun [clip-path:polygon(50%_0,100%_100%,0_100%)]',
}

export function Principles() {
  const { m, locale } = getI18n()
  const p = m.ethos.principles

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((item, i) => (
          <li key={item.title}>
            <Card className="h-full">
              <CardHeader className="gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
                    <span aria-hidden="true" className={cn(shapeClass[shapes[i % shapes.length]])} />
                  </div>
                  <span className="font-heading text-sm font-semibold text-muted-foreground">
                    {(i + 1).toLocaleString(locale, { minimumIntegerDigits: 2 })}
                  </span>
                </div>
                <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}
