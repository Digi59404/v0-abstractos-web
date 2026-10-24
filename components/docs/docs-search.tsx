'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileTextIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useI18n } from '@/components/i18n/i18n-provider'
import { format } from '@/i18n/format'
import type { DocSearchEntry } from '@/lib/docs'

export function DocsSearch({ entries }: { entries: DocSearchEntry[] }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { m } = useI18n()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const groups = entries.reduce<Record<string, DocSearchEntry[]>>((acc, e) => {
    const key = format(m.docs.search.groupHeading, { section: e.section, group: e.group })
    ;(acc[key] ??= []).push(e)
    return acc
  }, {})

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full justify-start text-muted-foreground sm:w-64"
      >
        <SearchIcon data-icon="inline-start" />
        {m.docs.search.trigger}
        <KbdGroup className="ms-auto hidden sm:inline-flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title={m.docs.search.title} description={m.docs.search.description}>
        <Command>
          <CommandInput placeholder={m.docs.search.placeholder} />
          <CommandList>
            <CommandEmpty>{m.docs.search.empty}</CommandEmpty>
            {Object.entries(groups).map(([heading, items]) => (
              <CommandGroup key={heading} heading={heading}>
                {items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.description} ${item.group}`}
                    onSelect={() => {
                      setOpen(false)
                      router.push(item.href)
                    }}
                  >
                    <FileTextIcon />
                    <div className="flex min-w-0 flex-col">
                      <span>{item.title}</span>
                      <span className="truncate text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
