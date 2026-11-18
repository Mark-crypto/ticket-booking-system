import { useState } from "react"
import { Link } from "react-router-dom"
import { m, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, Ticket } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/brand/Magnetic"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./ThemeToggle"

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
      <span className="flex size-8 -rotate-6 items-center justify-center rounded-lg bg-linear-to-br from-magenta to-orange text-ink">
        <Ticket className="size-4" strokeWidth={2.5} />
      </span>
      <span className="font-heading text-xl font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  )
}

export function Navbar() {
  // Floating pill nav: transparent over the hero, then a glassy bar once you scroll.
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40))

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <m.nav
        initial={false}
        animate={{ maxWidth: scrolled ? 920 : 1152 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border px-3 py-2 transition-colors duration-300",
          scrolled
            ? "border-border bg-background/75 text-foreground shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-transparent bg-transparent text-white", // sits on the always-dark hero
        )}
      >
        <Logo />

        {/* Desktop links */}
        <ul
          className={cn(
            "hidden items-center gap-7 text-sm font-medium md:flex",
            scrolled ? "text-muted-foreground" : "text-white/75",
          )}
        >
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn("transition-colors", scrolled ? "hover:text-foreground" : "hover:text-white")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1.5 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild className={cn(!scrolled && "hover:bg-white/10 hover:text-white")}>
            <Link to="/login">Sign in</Link>
          </Button>
          <Magnetic>
            <Button asChild className="bg-magenta text-ink hover:bg-magenta/85">
              <a href="#events">Get tickets</a>
            </Button>
          </Magnetic>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4 font-medium">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block rounded-md px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button variant="outline" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <SheetClose asChild>
                  <Button asChild className="bg-magenta text-ink hover:bg-magenta/85">
                    <a href="#events">Get tickets</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </m.nav>
    </header>
  )
}
