import { CheckIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'

const milestones = [
  { value: 'alpha-0-1', status: 'inProgress' },
  { value: 'alpha-0-2', status: 'planned' },
  { value: 'alpha-0-3', status: 'planned' },
] as const

export function Roadmap() {
  const { m } = getI18n()
  const r = m.ethos.roadmap

  return (
    <section id="roadmap" className="scroll-mt-20 bg-brand-sand/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading align="left" eyebrow={r.eyebrow} title={r.title} description={r.description} />
        <Accordion defaultValue={['alpha-0-1']} className="rounded-2xl border bg-card px-5">
          {milestones.map((milestone) => {
            const copy = r.milestones[milestone.value]
            return (
              <AccordionItem key={milestone.value} value={milestone.value}>
                <AccordionTrigger className="py-5 text-base">
                  <span className="flex items-center gap-3">
                    <span className="font-heading font-semibold">{copy.title}</span>
                    <Badge variant={milestone.status === 'inProgress' ? 'default' : 'secondary'}>
                      {r.status[milestone.status]}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2.5 pb-2">
                    {copy.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-muted-foreground">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
