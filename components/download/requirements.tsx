import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SectionHeading } from '@/components/site/section-heading'
import { getI18n } from '@/i18n/server'

export function Requirements() {
  const { m } = getI18n()
  const r = m.download.requirements

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow={r.eyebrow} title={r.title} description={r.description} />
      <div className="mt-12 overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">{r.columns.component}</TableHead>
              <TableHead className="px-4">{r.columns.minimum}</TableHead>
              <TableHead className="px-4">{r.columns.recommended}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {r.rows.map((row) => (
              <TableRow key={row.spec}>
                <TableCell className="px-4 font-medium">{row.spec}</TableCell>
                <TableCell className="px-4 whitespace-normal text-muted-foreground">{row.minimum}</TableCell>
                <TableCell className="px-4 whitespace-normal">{row.recommended}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
