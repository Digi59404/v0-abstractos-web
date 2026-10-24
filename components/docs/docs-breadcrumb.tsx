import { Fragment } from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function DocsBreadcrumb({ items, label }: { items: { label: string; href?: string }[]; label: string }) {
  return (
    <Breadcrumb aria-label={label}>
      <BreadcrumbList>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <BreadcrumbSeparator className="rtl:rotate-180" />}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink render={<Link href={item.href} />}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
