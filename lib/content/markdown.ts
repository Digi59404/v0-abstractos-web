import { marked, type Token, type Tokens } from 'marked'
import type { Block } from '@/lib/content/types'

/**
 * Converts AbstractOS-flavoured Markdown into content blocks.
 *
 * On top of CommonMark + GFM tables it understands:
 *   ```lang filename="x"            code block with a filename
 *   ```mermaid caption="x"          diagram
 *   ![alt](src "caption"){width=1920 height=1080}
 *   :::note|tip|warning Title       callout
 *   :::code-tabs                    tabbed code (each fence takes title="Label")
 *   :::steps                        numbered steps, one "### Title" per step
 *   :::specs Title                  "- Label: Value" spec sheet
 *   :::shortcuts                    "- `Key` `Key` — Action" keyboard shortcuts
 *   > quote  /  > — cite            pull quote with attribution
 */

type Segment = { kind: 'markdown'; text: string } | { kind: 'directive'; name: string; arg?: string; body: string }

const DIRECTIVE_OPEN = /^:::([\w-]+)(?:[ \t]+(.+))?$/
const FENCE = /^(`{3,}|~{3,})/

function splitDirectives(source: string): Segment[] {
  const segments: Segment[] = []
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  let buffer: string[] = []
  let fence: string | null = null
  let directive: { name: string; arg?: string; body: string[] } | null = null

  const flushMarkdown = () => {
    if (buffer.join('').trim()) segments.push({ kind: 'markdown', text: buffer.join('\n') })
    buffer = []
  }

  for (const line of lines) {
    const fenceMatch = line.match(FENCE)
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1]
      else if (line.trim() === fence) fence = null
    }

    if (!fence && !fenceMatch) {
      if (!directive) {
        const open = line.match(DIRECTIVE_OPEN)
        if (open) {
          flushMarkdown()
          directive = { name: open[1], arg: open[2]?.trim(), body: [] }
          continue
        }
      } else if (line.trim() === ':::') {
        segments.push({ kind: 'directive', name: directive.name, arg: directive.arg, body: directive.body.join('\n') })
        directive = null
        continue
      }
    }

    if (directive) directive.body.push(line)
    else buffer.push(line)
  }

  if (directive) throw new Error(`Unclosed ":::${directive.name}" directive`)
  flushMarkdown()
  return segments
}

function parseInfo(info = '') {
  const [lang = 'text', ...rest] = info.trim().split(/\s+/)
  const attrs: Record<string, string> = {}
  for (const match of rest.join(' ').matchAll(/(\w+)="((?:[^"\\]|\\.)*)"/g)) {
    attrs[match[1]] = JSON.parse(`"${match[2]}"`)
  }
  return { lang, attrs }
}

const IMAGE = /^!\[([^\]]*)\]\((\S+?)(?:\s+"((?:[^"\\]|\\.)*)")?\)(?:\{width=(\d+)\s+height=(\d+)\})?$/

function tokenToBlocks(token: Token): Block[] {
  switch (token.type) {
    case 'heading': {
      const { depth, text } = token as Tokens.Heading
      return [{ type: depth >= 3 ? 'h3' : 'h2', text }]
    }
    case 'paragraph': {
      const text = (token as Tokens.Paragraph).text.trim()
      const image = text.match(IMAGE)
      if (image) {
        return [
          {
            type: 'image',
            alt: image[1],
            src: image[2],
            caption: image[3] ? JSON.parse(`"${image[3]}"`) : undefined,
            width: image[4] ? Number(image[4]) : undefined,
            height: image[5] ? Number(image[5]) : undefined,
          },
        ]
      }
      return [{ type: 'p', text }]
    }
    case 'list': {
      const list = token as Tokens.List
      return [{ type: 'list', ordered: list.ordered || undefined, items: list.items.map((i) => i.text.trim()) }]
    }
    case 'code': {
      const { lang: info, text } = token as Tokens.Code
      const { lang, attrs } = parseInfo(info)
      if (lang === 'mermaid') return [{ type: 'diagram', chart: text, caption: attrs.caption }]
      return [{ type: 'code', lang, code: text, filename: attrs.filename }]
    }
    case 'table': {
      const table = token as Tokens.Table
      return [
        {
          type: 'table',
          headers: table.header.map((c) => c.text),
          rows: table.rows.map((r) => r.map((c) => c.text)),
        },
      ]
    }
    case 'blockquote': {
      const chunks = (token as Tokens.Blockquote).text.trim().split(/\n\s*\n/)
      const last = chunks.at(-1) ?? ''
      const hasCite = chunks.length > 1 && /^[—–-]\s/.test(last)
      return [
        {
          type: 'quote',
          text: (hasCite ? chunks.slice(0, -1) : chunks).join(' ').replace(/\s+/g, ' '),
          cite: hasCite ? last.replace(/^[—–-]\s+/, '') : undefined,
        },
      ]
    }
    default:
      return []
  }
}

const listLines = (body: string) =>
  body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2))

function directiveToBlock({ name, arg, body }: Extract<Segment, { kind: 'directive' }>): Block {
  switch (name) {
    case 'note':
    case 'tip':
    case 'warning':
      return { type: 'callout', tone: name, title: arg, text: body.trim().replace(/\s*\n\s*/g, ' ') }
    case 'code-tabs':
      return {
        type: 'codeTabs',
        tabs: marked
          .lexer(body)
          .filter((t): t is Tokens.Code => t.type === 'code')
          .map((t) => {
            const { lang, attrs } = parseInfo(t.lang)
            return { label: attrs.title ?? lang, lang, code: t.text }
          }),
      }
    case 'steps':
      return {
        type: 'steps',
        items: body
          .split(/^###\s+/m)
          .slice(1)
          .map((chunk) => {
            const [title, ...rest] = chunk.split('\n')
            return { title: title.trim(), text: rest.join(' ').trim().replace(/\s+/g, ' ') }
          }),
      }
    case 'specs':
      return {
        type: 'specs',
        title: arg,
        items: listLines(body).map((line) => {
          const at = line.indexOf(': ')
          return { label: line.slice(0, at), value: line.slice(at + 2) }
        }),
      }
    case 'shortcuts':
      return {
        type: 'shortcuts',
        items: listLines(body).map((line) => {
          const [keys, action] = line.split(/\s+—\s+/)
          return { keys: [...keys.matchAll(/`([^`]+)`/g)].map((m) => m[1]), action: action?.trim() ?? '' }
        }),
      }
    default:
      throw new Error(`Unknown directive ":::${name}"`)
  }
}

export function parseMarkdown(source: string): Block[] {
  return splitDirectives(source).flatMap((segment) =>
    segment.kind === 'directive' ? [directiveToBlock(segment)] : marked.lexer(segment.text).flatMap(tokenToBlocks)
  )
}
