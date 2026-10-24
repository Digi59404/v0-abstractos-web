import { CheckIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/site/section-heading'

const milestones = [
  {
    value: 'alpha-0-1',
    title: 'Alpha 0.1',
    status: 'In progress',
    items: [
      'A desktop environment built on Wingpanel, LightDM, Gala and Dock',
      'x64 and 32-bit images you can run in a virtual machine',
      'A GTK 3 / GTK 4 theme for a consistent look',
      'Marker (markdown notes), Register (text editor) and Review (quick file previews)',
      'Vala Welder MVP and a documented Vala development process',
      'CI/CD pipelines for AppImages and Alpine APKs, plus an Alpine repository',
    ],
  },
  {
    value: 'alpha-0-2',
    title: 'Alpha 0.2',
    status: 'Planned',
    items: [
      'ARM build process producing flashable .img files',
      'A finished installer and a guided first-run experience',
      'Testing pipelines for AbstractOS and Vala applications',
      'Development guidelines for what makes an “AbstractOS application”',
    ],
  },
  {
    value: 'alpha-0-3',
    title: 'Alpha 0.3',
    status: 'Planned',
    items: [
      'ARM, x86 and 32-bit .img and .iso images for real hardware',
      'rEFInd installed on EFI/GPT machines',
      'GRUB installed on non-EFI/GPT machines',
    ],
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20 bg-brand-sand/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading
          align="left"
          eyebrow="Roadmap"
          title="Where we are headed"
          description="Ethos only matters if it ships. Here is what we are building next, straight from our public roadmap."
        />
        <Accordion defaultValue={['alpha-0-1']} className="rounded-2xl border bg-card px-5">
          {milestones.map((m) => (
            <AccordionItem key={m.value} value={m.value}>
              <AccordionTrigger className="py-5 text-base">
                <span className="flex items-center gap-3">
                  <span className="font-heading font-semibold">{m.title}</span>
                  <Badge variant={m.status === 'In progress' ? 'default' : 'secondary'}>{m.status}</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {m.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-muted-foreground">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
