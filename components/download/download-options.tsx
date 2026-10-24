import Link from 'next/link'
import { CpuIcon, DownloadIcon, TriangleAlertIcon } from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/download/copy-button'
import { format, rich } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { links, release } from '@/lib/site'

type Build = {
  key: 'x64' | 'x86' | 'arm64'
  arch: string
  file: string
  size: string
  sha256: string
  available: boolean
  recommended?: boolean
}

const builds: Record<'desktop' | 'arm', Build[]> = {
  desktop: [
    {
      key: 'x64',
      arch: 'x86_64',
      file: `abstractos-${release.version}-${release.codename.toLowerCase()}-x86_64.img`,
      size: '2.4 GB',
      sha256: '9f2c6e1a4b7d3c8e5a0f1b2d4c6e8a0b3d5f7e9a1c3b5d7f9e0a2c4b6d8f0a1c',
      available: true,
      recommended: true,
    },
    {
      key: 'x86',
      arch: 'i686',
      file: `abstractos-${release.version}-${release.codename.toLowerCase()}-i686.img`,
      size: '2.1 GB',
      sha256: '4b8e0d2f6a1c3e5b7d9f0a2c4e6b8d0f1a3c5e7b9d1f3a5c7e9b0d2f4a6c8e0b',
      available: true,
    },
  ],
  arm: [
    {
      key: 'arm64',
      arch: 'aarch64',
      file: 'abstractos-0.2-aarch64.img',
      size: '—',
      sha256: '',
      available: false,
    },
  ],
}

function BuildCard({ build }: { build: Build }) {
  const { m } = getI18n()
  const d = m.download.options
  const copy = d.builds[build.key]

  return (
    <Card className={cn('h-full', build.recommended && 'ring-2 ring-primary')}>
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <CpuIcon className="size-5" aria-hidden="true" />
          </div>
          {build.recommended && <Badge>{d.recommended}</Badge>}
          {!build.available && <Badge variant="secondary">{d.comingSoon}</Badge>}
        </div>
        <CardTitle className="font-heading text-xl">{copy.title}</CardTitle>
        <CardDescription className="leading-relaxed">{copy.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
          <dt className="text-muted-foreground">{d.architecture}</dt>
          <dd className="font-mono">{build.arch}</dd>
          <dt className="text-muted-foreground">{d.size}</dt>
          <dd>{build.size}</dd>
        </dl>
        {build.sha256 && (
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">SHA256</span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs">{build.sha256}</code>
            <CopyButton value={build.sha256} label={format(d.copyChecksum, { title: copy.title })} />
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        {build.available ? (
          <Link
            href={links.releases}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'h-11 w-full rounded-full')}
          >
            <DownloadIcon data-icon="inline-start" />
            {d.downloadImg}
          </Link>
        ) : (
          <Button size="lg" variant="outline" disabled className="h-11 w-full rounded-full">
            {d.notAvailable}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export function DownloadOptions() {
  const { m } = getI18n()
  const d = m.download.options

  return (
    <section aria-label={d.label} className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Tabs defaultValue="desktop" className="items-center gap-8">
        <TabsList className="h-10">
          <TabsTrigger value="desktop" className="px-4">
            {d.tabs.desktop}
          </TabsTrigger>
          <TabsTrigger value="arm" className="px-4">
            {d.tabs.arm}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="desktop" className="w-full">
          <ul className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
            {builds.desktop.map((b) => (
              <li key={b.arch}>
                <BuildCard build={b} />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="arm" className="w-full">
          <ul className="mx-auto grid max-w-md gap-5">
            {builds.arm.map((b) => (
              <li key={b.arch}>
                <BuildCard build={b} />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      <div
        role="note"
        className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border border-brand-sun/60 bg-brand-sun/15 p-5 text-sm"
      >
        <TriangleAlertIcon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <p className="leading-relaxed">
          {rich(d.alphaWarning, { strong: (chunk) => <strong className="font-semibold">{chunk}</strong> })}
        </p>
      </div>
    </section>
  )
}
