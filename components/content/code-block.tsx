import { codeToHtml } from 'shiki'
import { FileCodeIcon, TerminalIcon } from 'lucide-react'
import { CopyButton } from '@/components/download/copy-button'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'

const SHELL_LANGS = new Set(['bash', 'sh', 'shell', 'console'])

export async function highlight(code: string, lang: string) {
  try {
    return await codeToHtml(code, { lang, theme: 'github-light' })
  } catch {
    return await codeToHtml(code, { lang: 'text', theme: 'github-light' })
  }
}

export function CodeSurface({ html }: { html: string }) {
  return (
    <div
      className="overflow-x-auto text-[13px] leading-relaxed [&_pre]:bg-transparent! [&_pre]:p-4 [&_code]:font-mono"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export async function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string
  lang: string
  filename?: string
}) {
  const html = await highlight(code, lang)
  const Icon = SHELL_LANGS.has(lang) ? TerminalIcon : FileCodeIcon

  return (
    <figure className="overflow-hidden rounded-xl border bg-card shadow-xs">
      <figcaption className="flex items-center justify-between gap-2 border-b bg-muted/50 py-1.5 pr-1.5 pl-3">
        <span className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate font-mono">{filename ?? lang}</span>
        </span>
        <CopyButton value={code} label={format(getI18n().m.content.copyCode, { name: filename ?? lang })} />
      </figcaption>
      <CodeSurface html={html} />
    </figure>
  )
}
