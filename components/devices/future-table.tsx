import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getI18n } from '@/i18n/server'
import { futureDevices, type FutureDevice } from '@/lib/devices'

const stageVariant: Record<FutureDevice['stage'], 'default' | 'secondary' | 'outline'> = {
  kernelBoots: 'default',
  bringUp: 'secondary',
  planned: 'outline',
  lookingForPorter: 'outline',
}

export function FutureTable() {
  const { m } = getI18n()
  const d = m.devices

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4">{d.columns.device}</TableHead>
            <TableHead>{d.columns.formFactor}</TableHead>
            <TableHead>{d.columns.stage}</TableHead>
            <TableHead className="pr-4 text-right">{d.columns.target}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {futureDevices.map((device) => (
            <TableRow key={device.name}>
              <TableCell className="pl-4">
                <span className="font-medium">{device.name}</span>
                <span className="block text-xs text-muted-foreground">{device.vendor}</span>
              </TableCell>
              <TableCell>{d.formFactors[device.formFactor]}</TableCell>
              <TableCell>
                <Badge variant={stageVariant[device.stage]}>{d.stages[device.stage]}</Badge>
              </TableCell>
              <TableCell className="pr-4 text-right text-muted-foreground">{device.target ?? d.tbd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
