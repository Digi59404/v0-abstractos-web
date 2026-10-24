import Link from 'next/link'
import { CpuIcon, DownloadIcon, TriangleAlertIcon } from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/download/copy-button'
import { links, release } from '@/lib/site'

type Build = {
  arch: string
  title: string
  description: string
  file: string
  size: string
  sha256: string
  available: boolean
  recommended?: boolean
}

const builds: Record<'desktop' | 'arm', Build[]> = {
  desktop: [
    {
      arch: 'x86_64',
      title: '64-bit (x64)',
      description: 'For most modern PCs and laptops, and for running in a virtual machine.',
      file: `abstractos-${release.version}-${release.codename.toLowerCase()}-x86_64.img`,
      size: '2.4 GB',
      sha256: '9f2c6e1a4b7d3c8e5a0f1b2d4c6e8a0b3d5f7e9a1c3b5d7f9e0a2c4b6d8f0a1c',
      available: true,
      recommended: true,
    },
    {
      arch: 'i686',
      title: '32-bit (x86)',
      description: 'For older hardware and lightweight virtual machines.',
      file: `abstractos-${release.version}-${release.codename.toLowerCase()}-i686.img`,
      size: '2.1 GB',
      sha256: '4b8e0d2f6a1c3e5b7d9f0a2c4e6b8d0f1a3c5e7b9d1f3a5c7e9b0d2f4a6c8e0b',
      available: true,
    },
  ],
  arm: [
    {
      arch: 'aarch64',
      title: 'ARM64',
      description: 'For phones, tablets and ARM single-board computers. Arriving with Alpha 0.2.',
      file: 'abstractos-0.2-aarch64.img',
      size: '—',
      sha256: '',
      available: false,
    },
  ],
}

function BuildCard({ build }: { build: Build }) {
  return (
    <Card className={cn('h-full', build.recommended && 'ring-2 ring-primary')}>
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <CpuIcon className="size-5" aria-hidden="true" />
          </div>
          {build.recommended && <Badge>Recommended</Badge>}
          {!build.available && <Badge variant="secondary">Coming soon</Badge>}
        </div>
        <CardTitle className="font-heading text-xl">{build.title}</CardTitle>
        <CardDescription className="leading-relaxed">{build.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
          <dt className="text-muted-foreground">Architecture</dt>
          <dd className="font-mono">{build.arch}</dd>
          <dt className="text-muted-foreground">Size</dt>
          <dd>{build.size}</dd>
        </dl>
        {build.sha256 && (
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">SHA256</span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs">{build.sha256}</code>
            <CopyButton value={build.sha256} label={`Copy SHA256 checksum for ${build.title}`} />
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
            Download .img
          </Link>
        ) : (
          <Button size="lg" variant="outline" disabled className="h-11 w-full rounded-full">
            Not yet available
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export function DownloadOptions() {
  return (
    <section aria-label="Download options" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Tabs defaultValue="desktop" className="items-center gap-8">
        <TabsList className="h-10">
          <TabsTrigger value="desktop" className="px-4">
            Desktop &amp; VM
          </TabsTrigger>
          <TabsTrigger value="arm" className="px-4">
            Mobile &amp; ARM
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
          <strong className="font-semibold">AbstractOS is alpha software.</strong> Expect rough edges and missing
          features. We recommend trying it in a virtual machine before installing on hardware you rely on.
        </p>
      </div>
    </section>
  )
}
