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

const PORTING_DOC = '/docs/developers/hardware/porting'

const steps = [
  { icon: MessageCircleIcon, title: 'Say hello', text: 'Join #abstractos-porting on IRC so nobody duplicates work.' },
  { icon: CpuIcon, title: 'Create a device config', text: 'Describe the hardware in a small device.toml file.' },
  { icon: WrenchIcon, title: 'Bring it up', text: 'Boot the kernel, then work through display, touch, radios and camera.' },
]

export function PortCta() {
  return (
    <section
      aria-labelledby="port-heading"
      className="flex flex-col items-start gap-6 rounded-2xl bg-foreground p-8 text-background md:flex-row md:items-center md:justify-between md:p-12"
    >
      <div className="flex max-w-xl flex-col gap-3">
        <h2 id="port-heading" className="text-3xl font-bold tracking-tight text-balance">
          Don&apos;t see your device?
        </h2>
        <p className="text-pretty leading-relaxed text-background/70">
          Every supported device started with one person and a USB cable. Help bring AbstractOS to new hardware.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button size="lg" variant="secondary" />}>Help port AbstractOS</DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Help port AbstractOS to new hardware</DialogTitle>
              <DialogDescription>
                Ports are mostly a kernel and a device configuration. Everything above that is shared, so you can focus
                on the hardware.
              </DialogDescription>
            </DialogHeader>
            <ol className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <s.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {i + 1}. {s.title}
                    </span>
                    <span className="text-sm text-muted-foreground">{s.text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Maybe later</DialogClose>
              <Button nativeButton={false} render={<Link href={PORTING_DOC} />}>
                <BookOpenIcon data-icon="inline-start" />
                Read the porting guide
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
          Porting docs
        </Button>
      </div>
    </section>
  )
}
