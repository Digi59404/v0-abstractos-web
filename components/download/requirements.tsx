import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SectionHeading } from '@/components/site/section-heading'

const rows = [
  { spec: 'Processor', minimum: '64-bit or 32-bit x86, 1.6 GHz dual-core', recommended: '64-bit quad-core, 2 GHz+' },
  { spec: 'Memory', minimum: '4 GB RAM', recommended: '8 GB RAM or more' },
  { spec: 'Storage', minimum: '20 GB', recommended: '64 GB SSD' },
  { spec: 'Display', minimum: '1024 × 768', recommended: '1920 × 1080 or touch display' },
  { spec: 'Boot', minimum: 'BIOS or UEFI', recommended: 'UEFI with GPT' },
]

export function Requirements() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Requirements"
        title="System requirements"
        description="AbstractOS is lightweight by design, but more headroom makes everything feel smoother."
      />
      <div className="mt-12 overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Component</TableHead>
              <TableHead className="px-4">Minimum</TableHead>
              <TableHead className="px-4">Recommended</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.spec}>
                <TableCell className="px-4 font-medium">{r.spec}</TableCell>
                <TableCell className="px-4 whitespace-normal text-muted-foreground">{r.minimum}</TableCell>
                <TableCell className="px-4 whitespace-normal">{r.recommended}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
