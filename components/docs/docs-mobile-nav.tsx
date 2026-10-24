'use client'

import { useState } from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DocsSidebar, type SidebarSection } from '@/components/docs/docs-sidebar'
import { useI18n } from '@/components/i18n/i18n-provider'
import { localeDir } from '@/i18n/config'

export function DocsMobileNav({ sections }: { sections: SidebarSection[] }) {
  const [open, setOpen] = useState(false)
  const { m, locale } = useI18n()
  const dir = localeDir(locale)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
        <PanelLeftIcon data-icon="inline-start" />
        {m.docs.menu}
      </SheetTrigger>
      <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-80">
        <SheetHeader>
          <SheetTitle>{m.docs.eyebrow}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1 px-4 pb-6">
          <DocsSidebar sections={sections} onNavigate={() => setOpen(false)} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
