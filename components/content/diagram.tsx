'use client'

import { useEffect, useId, useState } from 'react'
import { WorkflowIcon } from 'lucide-react'

export function Diagram({ chart, caption }: { chart: string; caption?: string }) {
  const id = useId().replace(/:/g, '')
  const [svg, setSvg] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: 'var(--font-roboto), ui-sans-serif, system-ui',
        themeVariables: {
          primaryColor: '#e8efff',
          primaryBorderColor: '#4f7bf0',
          primaryTextColor: '#252b3b',
          secondaryColor: '#ffe9ec',
          secondaryBorderColor: '#ea5a72',
          tertiaryColor: '#fff4dc',
          tertiaryBorderColor: '#e6b341',
          lineColor: '#7b8396',
          clusterBkg: '#f7f9fd',
          clusterBorder: '#dfe4ee',
          noteBkgColor: '#fff4dc',
          noteBorderColor: '#e6b341',
          actorBkg: '#e8efff',
          actorBorder: '#4f7bf0',
          signalColor: '#4b5263',
          fontSize: '14px',
        },
      })
      try {
        const result = await mermaid.render(`diagram-${id}`, chart)
        if (!cancelled) setSvg(result.svg)
      } catch {
        if (!cancelled) setFailed(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [chart, id])

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative overflow-x-auto rounded-xl border bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-card [background-size:16px_16px] p-6">
        {svg ? (
          <div
            className="flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
            role="img"
            aria-label={caption ?? 'Diagram'}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : failed ? (
          <pre className="font-mono text-xs text-muted-foreground">{chart}</pre>
        ) : (
          <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
            <WorkflowIcon className="size-4 animate-pulse" aria-hidden="true" />
            Rendering diagram
          </div>
        )}
      </div>
      {caption && <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
