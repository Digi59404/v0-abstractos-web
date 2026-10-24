'use client'

import Link from 'next/link'
import { BookOpenIcon, CpuIcon, MessageCircleIcon, WrenchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useI18n } from '@/components/i18n/i18n-provider'

const PORTING_DOC = '/docs/developers/hardware/porting'

const stepIcons = [MessageCircleIcon, CpuIcon, WrenchIcon]

export function PortCta() {
  const { m } = useI18n()
  const p = m.devices.port

  return (
    <section
      aria-labelledby="port-heading"
      className="flex flex-col items-start gap-6 rounded-2xl bg-foreground p-8 text-background md:flex-row md:items-center md:justify-between md:p-12"
    >
      <div className="flex max-w-xl flex-col gap-3">
        <h2 id="port-heading" className="text-3xl font-bold tracking-tight text-balance">
          {p.title}
        </h2>
        <p className="text-pretty leading-relaxed text-background/70">{p.description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button size="lg" variant="secondary" />}>{p.cta}</DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{p.dialogTitle}</DialogTitle>
              <DialogDescription>{p.dialogDescription}</DialogDescription>
            </DialogHeader>
            <ol className="flex flex-col gap-4">
              {p.steps.map((step, i) => {
                const Icon = stepIcons[i % stepIcons.length]
                return (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {i + 1}. {step.title}
                      </span>
                      <span className="text-sm text-muted-foreground">{step.text}</span>
                    </div>
                  </li>
                )
              })}
            </ol>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>{p.later}</DialogClose>
              <Button nativeButton={false} render={<Link href={PORTING_DOC} />}>
                <BookOpenIcon data-icon="inline-start" />
                {p.guide}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          size="lg"
          variant="ghost"
          className="text-background hover:bg-background/10 hover:text-background"
          nativeButton={false}
          render={<Link href={PORTING_DOC} />}
        >
          {p.docs}
        </Button>
      </div>
    </section>
  )
}
