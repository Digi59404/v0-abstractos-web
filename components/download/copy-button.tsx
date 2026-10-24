'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/components/i18n/i18n-provider'

export function CopyButton({ value, label }: { value: string; label: string }) {
  const { m } = useI18n()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button variant="ghost" size="icon-xs" onClick={copy} aria-label={label}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only" aria-live="polite">
        {copied ? m.common.copied : ''}
      </span>
    </Button>
  )
}
