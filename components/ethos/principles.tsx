import { cn } from 'cn'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/site/section-heading'

const principles = [
  {
    shape: 'slash',
    title: 'User first — not user always right',
    body: 'Every decision starts with the person using the device. That means sometimes saying no to a feature so the whole experience stays clear, fast and dependable.',
  },
  {
    shape: 'circle',
    title: 'Approachable for everyone',
    body: 'We design for the average, non-technical person first. If your parents can set it up and love it, we have done our job.',
  },
  {
    shape: 'triangle',
    title: 'Never at the expense of experts',
    body: 'Catering to newcomers does not mean limiting power users. A real Linux system, real terminal and real freedom are always one step away.',
  },
  {
    shape: 'slash',
    title: 'A first-class alternative',
    body: 'We aim to stand shoulder-to-shoulder with Google, Apple and Microsoft — polished, consistent and ready for daily life on any device.',
  },
  {
    shape: 'circle',
    title: 'Freedom grows with us',
    body: 'As AbstractOS grows, we will invest in user freedom — including open-source firmware for devices, alongside closed options if you want them.',
  },
  {
    shape: 'triangle',
    title: 'Built in the open',
    body: 'Our designs, roadmap and code live publicly on GitLab. Anyone can follow along, give feedback and contribute.',
  },
] as const

const shapeClass = {
  slash: 'h-9 w-2 rotate-[22deg] rounded-full bg-brand-blue',
  circle: 'size-7 rounded-full bg-brand-coral',
  triangle: 'size-8 bg-brand-sun [clip-path:polygon(50%_0,100%_100%,0_100%)]',
}

export function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Principles"
        title="Six ideas that shape AbstractOS"
        description="Our ethos is simple to say and hard to live up to. These are the principles we hold ourselves to."
      />
      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => (
          <li key={p.title}>
            <Card className="h-full">
              <CardHeader className="gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
                    <span aria-hidden="true" className={cn(shapeClass[p.shape])} />
                  </div>
                  <span className="font-heading text-sm font-semibold text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <CardTitle className="font-heading text-xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}
