/**
 * Structured content blocks shared by the blog and documentation.
 * Inline strings support **bold**, `code` and [links](/href).
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; lang: string; code: string; filename?: string }
  | { type: 'codeTabs'; tabs: { label: string; lang: string; code: string }[] }
  | { type: 'diagram'; chart: string; caption?: string }
  | { type: 'image'; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: 'callout'; tone: 'note' | 'tip' | 'warning'; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'specs'; title?: string; items: { label: string; value: string }[] }
  | { type: 'shortcuts'; items: { keys: string[]; action: string }[] }
  | { type: 'quote'; text: string; cite?: string }

export type TocItem = { id: string; text: string; level: 2 | 3 }

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*[\]()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getToc(blocks: Block[]): TocItem[] {
  return blocks.flatMap((block) =>
    block.type === 'h2' || block.type === 'h3'
      ? [{ id: slugify(block.text), text: block.text.replace(/[`*]/g, ''), level: block.type === 'h2' ? 2 : 3 }]
      : []
  )
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
    case 'quote':
    case 'callout':
      return block.text
    case 'list':
      return block.items.join(' ')
    case 'steps':
      return block.items.map((s) => `${s.title} ${s.text}`).join(' ')
    case 'table':
      return block.rows.flat().join(' ')
    default:
      return ''
  }
}

export function getPlainText(blocks: Block[]) {
  return blocks.map(blockText).join(' ')
}

export function getReadingTime(blocks: Block[]) {
  const words = getPlainText(blocks).split(/\s+/).filter(Boolean).length
  const codeLines = blocks.reduce(
    (n, b) => n + (b.type === 'code' ? b.code.split('\n').length : 0),
    0
  )
  return Math.max(1, Math.round(words / 220 + codeLines / 40))
}
