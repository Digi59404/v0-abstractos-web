import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { futureDevices, type FutureDevice } from '@/lib/devices'

const stageVariant: Record<FutureDevice['stage'], 'default' | 'secondary' | 'outline'> = {
  'Kernel boots': 'default',
  'Bring-up': 'secondary',
  Planned: 'outline',
  'Looking for porter': 'outline',
}

export function FutureTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4">Device</TableHead>
            <TableHead>Form factor</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="pr-4 text-right">Target release</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {futureDevices.map((d) => (
            <TableRow key={d.name}>
              <TableCell className="pl-4">
                <span className="font-medium">{d.name}</span>
                <span className="block text-xs text-muted-foreground">{d.vendor}</span>
              </TableCell>
              <TableCell>{d.formFactor}</TableCell>
              <TableCell>
                <Badge variant={stageVariant[d.stage]}>{d.stage}</Badge>
              </TableCell>
              <TableCell className="pr-4 text-right text-muted-foreground">{d.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
