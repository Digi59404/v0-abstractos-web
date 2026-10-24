import { CheckIcon, XIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { featureKeys, featureLabels, supportedDevices } from '@/lib/devices'

function SupportMark({ supported, label }: { supported: boolean; label: string }) {
  return supported ? (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-success/15 text-success">
      <CheckIcon className="size-4" strokeWidth={2.75} aria-hidden="true" />
      <span className="sr-only">{label} supported</span>
    </span>
  ) : (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <XIcon className="size-4" strokeWidth={2.75} aria-hidden="true" />
      <span className="sr-only">{label} not supported</span>
    </span>
  )
}

export function SupportTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-56 pl-4">Device</TableHead>
            {featureKeys.map((k) => (
              <TableHead key={k} className="text-center">
                {featureLabels[k]}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {supportedDevices.map((d) => (
            <TableRow key={d.codename}>
              <TableCell className="pl-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{d.name}</span>
                    <Badge variant={d.status === 'Stable' ? 'secondary' : 'outline'}>{d.status}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {d.vendor} · {d.formFactor} · <code className="font-mono">{d.codename}</code>
                  </span>
                </div>
              </TableCell>
              {featureKeys.map((k) => (
                <TableCell key={k} className="text-center">
                  <SupportMark supported={d.features[k]} label={featureLabels[k]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
