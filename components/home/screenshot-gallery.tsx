import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeading } from '@/components/site/section-heading'
import { DesktopFrame } from '@/components/site/device-frames'
import { getI18n } from '@/i18n/server'

const shots = [
  { value: 'files', src: '/screenshots/files-light.webp' },
  { value: 'turbine', src: '/screenshots/turbine.webp' },
  { value: 'exposition', src: '/screenshots/exposition.webp' },
  { value: 'dark', src: '/screenshots/files-dark.webp' },
  { value: 'login', src: '/screenshots/login.webp' },
  { value: 'installer', src: '/screenshots/installer.webp' },
] as const

export function ScreenshotGallery() {
  const { m } = getI18n()
  const s = m.home.screenshots

  return (
    <section id="screenshots" className="scroll-mt-20 bg-brand-sand/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} />
        <Tabs defaultValue="files" className="mt-12 items-center gap-8">
          <div className="w-full overflow-x-auto pb-1">
            <TabsList className="mx-auto h-10 bg-background/80">
              {shots.map((shot) => (
                <TabsTrigger key={shot.value} value={shot.value} className="px-3">
                  {s.items[shot.value].label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {shots.map((shot) => {
            const copy = s.items[shot.value]
            return (
              <TabsContent key={shot.value} value={shot.value} className="w-full">
                <figure className="mx-auto flex max-w-5xl flex-col gap-4">
                  <DesktopFrame src={shot.src} alt={copy.alt} />
                  <figcaption className="text-center text-sm text-muted-foreground">{copy.caption}</figcaption>
                </figure>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
