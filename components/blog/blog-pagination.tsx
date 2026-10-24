'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useI18n } from '@/components/i18n/i18n-provider'

const pageHref = (n: number) => (n === 1 ? '/blog' : `/blog/page/${n}`)

export function BlogPagination({ page, totalPages }: { page: number; totalPages: number }) {
  const { m } = useI18n()
  const p = m.common.pagination
  if (totalPages <= 1) return null

  return (
    <Pagination aria-label={p.label} className="mt-12">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={pageHref(page - 1)} text={p.previous} aria-label={p.previousLabel} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <PaginationItem key={n}>
            <PaginationLink href={pageHref(n)} isActive={n === page}>
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={pageHref(page + 1)} text={p.next} aria-label={p.nextLabel} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
