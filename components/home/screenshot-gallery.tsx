import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeading } from '@/components/site/section-heading'
import { DesktopFrame } from '@/components/site/device-frames'

const shots = [
  {
    value: 'files',
    label: 'Files',
    src: '/screenshots/files-light.webp',
    alt: 'Files app showing recent documents and folders',
    caption: 'Files — recent, cloud, documents and downloads in one calm view.',
  },
  {
    value: 'turbine',
    label: 'Turbine',
    src: '/screenshots/turbine.webp',
    alt: 'Turbine internet browser start page with pinned sites over an ocean wallpaper',
    caption: 'Turbine — a fast, private browser with a pinned start page.',
  },
  {
    value: 'exposition',
    label: 'Exposition',
    src: '/screenshots/exposition.webp',
    alt: 'Exposition app store showing featured and popular apps',
    caption: 'Exposition — discover apps, from indie gems to everyday essentials.',
  },
  {
    value: 'dark',
    label: 'Dark mode',
    src: '/screenshots/files-dark.webp',
    alt: 'Files app in dark mode',
    caption: 'Dark mode — every first-party app, tuned for the night.',
  },
  {
    value: 'login',
    label: 'Lock screen',
    src: '/screenshots/login.webp',
    alt: 'AbstractOS lock screen with fingerprint unlock',
    caption: 'Lock screen — unlock in a touch with fingerprint support.',
  },
  {
    value: 'installer',
    label: 'Installer',
    src: '/screenshots/installer.webp',
    alt: 'AbstractOS installer showing installation type options',
    caption: 'Installer — erase and install, or partition exactly how you like.',
  },
]

export function ScreenshotGallery() {
  return (
    <section id="screenshots" className="scroll-mt-20 bg-brand-sand/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Screenshots"
          title="See it in action"
          description="Straight from the AbstractOS design repository — the desktop experience we are building."
        />
        <Tabs defaultValue="files" className="mt-12 items-center gap-8">
          <div className="w-full overflow-x-auto pb-1">
            <TabsList className="mx-auto h-10 bg-background/80">
              {shots.map((shot) => (
                <TabsTrigger key={shot.value} value={shot.value} className="px-3">
                  {shot.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {shots.map((shot) => (
            <TabsContent key={shot.value} value={shot.value} className="w-full">
              <figure className="mx-auto flex max-w-5xl flex-col gap-4">
                <DesktopFrame src={shot.src} alt={shot.alt} />
                <figcaption className="text-center text-sm text-muted-foreground">{shot.caption}</figcaption>
              </figure>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
