import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/download/copy-button'
import { format } from '@/i18n/format'
import { getI18n } from '@/i18n/server'
import { CodeSurface, highlight } from '@/components/content/code-block'

export async function CodeTabs({ tabs }: { tabs: { label: string; lang: string; code: string }[] }) {
  const rendered = await Promise.all(
    tabs.map(async (tab) => ({ ...tab, html: await highlight(tab.code, tab.lang) }))
  )

  return (
    <Tabs defaultValue={rendered[0]?.label} className="gap-0 overflow-hidden rounded-xl border bg-card shadow-xs">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/50 p-1.5">
        <TabsList>
          {rendered.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label} className="font-mono text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {rendered.map((tab) => (
        <TabsContent key={tab.label} value={tab.label} className="relative">
          <div className="absolute top-2 right-2">
            <CopyButton value={tab.code} label={format(getI18n().m.content.copyCode, { name: tab.label })} />
          </div>
          <CodeSurface html={tab.html} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
