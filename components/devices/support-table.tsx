import { CheckIcon, XIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { featureKeys, supportedDevices } from '@/lib/devices'

function SupportMark({ supported, label }: { supported: boolean; label: string }) {
  return supported ? (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-success/15 text-success">
      <CheckIcon className="size-4" strokeWidth={2.75} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  ) : (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <XIcon className="size-4" strokeWidth={2.75} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export function SupportTable() {
  const { m } = getI18n()
  const d = m.devices

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-56 pl-4">{d.columns.device}</TableHead>
            {featureKeys.map((k) => (
              <TableHead key={k} className="text-center">
                {d.features[k]}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {supportedDevices.map((device) => (
            <TableRow key={device.codename}>
              <TableCell className="pl-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{device.name}</span>
                    <Badge variant={device.status === 'stable' ? 'secondary' : 'outline'}>{d.status[device.status]}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {device.vendor} · {d.formFactors[device.formFactor]} · <code className="font-mono">{device.codename}</code>
                  </span>
                </div>
              </TableCell>
              {featureKeys.map((k) => (
                <TableCell key={k} className="text-center">
                  <SupportMark
                    supported={device.features[k]}
                    label={format(device.features[k] ? d.featureSupported : d.featureNotSupported, { feature: d.features[k] })}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
