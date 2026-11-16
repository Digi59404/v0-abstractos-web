'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DownloadIcon, ExternalLinkIcon, MenuIcon } from 'lucide-react'
import { cn } from 'cn'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/site/logo'
import { useI18n } from '@/components/i18n/i18n-provider'
import { stripLocale } from '@/i18n/config'
import { isNavGroup, navItems, type NavLink } from '@/lib/site'

const desktopItemClass =
  'rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'

export function SiteHeader() {
  const { m } = useI18n()
  const pathname = stripLocale(usePathname())
  const isActive = (link: NavLink) =>
    !link.external && (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={m.nav.homeLabel} className="rounded-md">
          <Logo />
        </Link>

        <NavigationMenu aria-label={m.nav.mainLabel} className="hidden lg:flex" align="center">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => {
              if (isNavGroup(item)) {
                const groupActive = item.children.some(isActive)
                return (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger
                      className={cn(
                        desktopItemClass,
                        'h-auto bg-transparent',
                        groupActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      {m.nav[item.key]}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex w-72 flex-col gap-1 p-1">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            {child.external ? (
                              <NavigationMenuLink
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-col items-start gap-0.5 p-3"
                              >
                                <span className="flex items-center gap-1.5 font-medium text-foreground">
                                  {m.nav[child.key]}
                                  <ExternalLinkIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                                  <span className="sr-only">{m.nav.opensInNewTab}</span>
                                </span>
                                {child.descriptionKey && (
                                  <span className="text-muted-foreground">{m.nav[child.descriptionKey]}</span>
                                )}
                              </NavigationMenuLink>
                            ) : (
                              <NavigationMenuLink
                                render={<Link href={child.href} />}
                                active={isActive(child)}
                                aria-current={isActive(child) ? 'page' : undefined}
                                className="flex-col items-start gap-0.5 p-3"
                              >
                                <span className="font-medium text-foreground">{m.nav[child.key]}</span>
                                {child.descriptionKey && (
                                  <span className="text-muted-foreground">{m.nav[child.descriptionKey]}</span>
                                )}
                              </NavigationMenuLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? 'page' : undefined}
                    className={cn(desktopItemClass, 'inline-flex', isActive(item) && 'bg-accent text-accent-foreground')}
                  >
                    {m.nav[item.key]}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Link href="/download" className={cn(buttonVariants({ size: 'lg' }), 'hidden rounded-full px-4 sm:inline-flex')}>
            <DownloadIcon data-icon="inline-start" />
            {m.nav.cta}
          </Link>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="lg:hidden" />}>
              <MenuIcon />
              <span className="sr-only">{m.nav.openMenu}</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label={m.nav.mobileLabel} className="px-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) =>
                    isNavGroup(item) ? (
                      <li key={item.key} className="py-1">
                        <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                          {m.nav[item.key]}
                        </p>
                        <ul className="flex flex-col gap-1">
                          {item.children.map((child) => (
                            <li key={child.key}>
                              <MobileLink link={child} active={isActive(child)} label={m.nav[child.key]} newTabLabel={m.nav.opensInNewTab} />
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={item.key}>
                        <MobileLink link={item} active={isActive(item)} label={m.nav[item.key]} newTabLabel={m.nav.opensInNewTab} />
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileLink({
  link,
  active,
  label,
  newTabLabel,
}: {
  link: NavLink
  active: boolean
  label: string
  newTabLabel: string
}) {
  const className = cn(
    'flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted',
    active && 'bg-accent text-accent-foreground'
  )

  if (link.external) {
    return (
      <SheetClose render={<a href={link.href} target="_blank" rel="noopener noreferrer" className={className} />}>
        {label}
        <ExternalLinkIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">{newTabLabel}</span>
      </SheetClose>
    )
  }

  return (
    <SheetClose
      render={<Link href={link.href} aria-current={active ? 'page' : undefined} className={className} />}
    >
      {label}
    </SheetClose>
  )
}
