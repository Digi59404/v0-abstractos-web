import Image from 'next/image'
import { AlertTriangleIcon, InfoIcon, LightbulbIcon, LinkIcon } from 'lucide-react'
import { cn } from 'cn'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CodeBlock } from '@/components/content/code-block'
import { CodeTabs } from '@/components/content/code-tabs'
import { Diagram } from '@/components/content/diagram'
import { Inline } from '@/components/content/inline'
import { getI18n } from '@/i18n/server'
import { slugify, type Block } from '@/lib/content/types'

const calloutStyles = {
  note: { icon: InfoIcon, className: 'border-brand-blue/30 bg-brand-blue/5 *:[svg]:text-brand-blue' },
  tip: { icon: LightbulbIcon, className: 'border-brand-teal/40 bg-brand-teal/10 *:[svg]:text-brand-teal' },
  warning: { icon: AlertTriangleIcon, className: 'border-brand-sun/60 bg-brand-sun/15 *:[svg]:text-foreground' },
} as const

function Heading({ level, text }: { level: 2 | 3; text: string }) {
  const id = slugify(text)
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag
      id={id}
      className={cn(
        'group scroll-mt-24 font-bold tracking-tight',
        level === 2 ? 'mt-6 text-2xl' : 'mt-2 text-xl'
      )}
    >
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        <Inline text={text} />
        <LinkIcon
          className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </a>
    </Tag>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-pretty leading-7 text-foreground/85">
          <Inline text={block.text} />
        </p>
      )
    case 'h2':
      return <Heading level={2} text={block.text} />
    case 'h3':
      return <Heading level={3} text={block.text} />
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List
          className={cn(
            'flex flex-col gap-2 pl-6 leading-7 text-foreground/85 marker:text-primary',
            block.ordered ? 'list-decimal' : 'list-disc'
          )}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} filename={block.filename} />
    case 'codeTabs':
      return <CodeTabs tabs={block.tabs} />
    case 'diagram':
      return <Diagram chart={block.chart} caption={block.caption} />
    case 'image':
      return (
        <figure className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl border bg-muted shadow-sm">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width ?? 1600}
              height={block.height ?? 1000}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-muted-foreground">
              <Inline text={block.caption} />
            </figcaption>
          )}
        </figure>
      )
    case 'callout': {
      const style = calloutStyles[block.tone]
      const Icon = style.icon
      return (
        <Alert className={cn('px-4 py-3', style.className)}>
          <Icon />
          <AlertTitle>{block.title ?? getI18n().m.content.callout[block.tone]}</AlertTitle>
          <AlertDescription className="text-foreground/80">
            <Inline text={block.text} />
          </AlertDescription>
        </Alert>
      )
    }
    case 'table':
      return (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {block.headers.map((h) => (
                  <TableHead key={h}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row) => (
                <TableRow key={row.join('|')}>
                  {row.map((cell, i) => (
                    <TableCell key={i} className="whitespace-normal">
                      <Inline text={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    case 'steps':
      return (
        <ol className="flex flex-col">
          {block.items.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
              {i < block.items.length - 1 && (
                <span aria-hidden="true" className="absolute top-9 bottom-1 left-4 w-px bg-border" />
              )}
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <p className="font-semibold">{step.title}</p>
                <p className="leading-7 text-foreground/80">
                  <Inline text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'specs':
      return (
        <section className="overflow-hidden rounded-xl border bg-card">
          {block.title && (
            <h4 className="border-b bg-muted/50 px-4 py-2.5 text-sm font-semibold">{block.title}</h4>
          )}
          <dl className="grid sm:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 border-b px-4 py-3 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0 sm:odd:border-r">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</dt>
                <dd className="font-mono text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )
    case 'shortcuts':
      return (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>{getI18n().m.content.shortcut}</TableHead>
                <TableHead>{getI18n().m.content.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.items.map((item) => (
                <TableRow key={item.action}>
                  <TableCell>
                    <KbdGroup>
                      {item.keys.map((key) => (
                        <Kbd key={key}>{key}</Kbd>
                      ))}
                    </KbdGroup>
                  </TableCell>
                  <TableCell className="whitespace-normal">{item.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="flex flex-col gap-2 border-l-4 border-brand-coral py-1 pl-5">
          <p className="font-heading text-xl leading-relaxed text-pretty">
            <Inline text={block.text} />
          </p>
          {block.cite && <cite className="text-sm not-italic text-muted-foreground">{block.cite}</cite>}
        </blockquote>
      )
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}
