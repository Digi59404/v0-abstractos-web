import Image from 'next/image'
import { SectionHeading } from '@/components/site/section-heading'

const steps = [
  {
    title: 'Download an image',
    text: 'Choose the build for your architecture above and verify its SHA256 checksum.',
  },
  {
    title: 'Write it to a USB drive',
    text: 'Use the AbstractOS USB Disk Utility, or any image writer, to flash the .img to a drive of 8 GB or more.',
  },
  {
    title: 'Boot and install',
    text: 'Restart from the USB drive, try the live session, then erase and install — or partition it your way.',
  },
]

export function InstallSteps() {
  return (
    <section className="bg-brand-sand/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            eyebrow="Install"
            title="Up and running in three steps"
            description="Prefer a virtual machine? Point GNOME Boxes, VirtualBox or virt-manager at the image and you are done."
          />
          <ol className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground"
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card p-1.5 shadow-2xl shadow-brand-coral/15">
          <Image
            src="/screenshots/usb-utility.webp"
            alt="AbstractOS USB Disk Utility ready to write the image to a flash drive"
            width={1920}
            height={1200}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
