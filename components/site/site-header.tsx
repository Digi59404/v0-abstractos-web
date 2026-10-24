'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DownloadIcon, MenuIcon } from 'lucide-react'
import { cn } from 'cn'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/site/logo'
import { navItems } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="AbstractOS home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                    isActive(item.href) && 'bg-accent text-accent-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/download" className={cn(buttonVariants({ size: 'lg' }), 'hidden rounded-full px-4 sm:inline-flex')}>
            <DownloadIcon data-icon="inline-start" />
            Get AbstractOS
          </Link>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="md:hidden" />}>
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <SheetClose
                        render={
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? 'page' : undefined}
                            className={cn(
                              'block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted',
                              isActive(item.href) && 'bg-accent text-accent-foreground'
                            )}
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
