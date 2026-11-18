import { useMemo, useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { mockEvents } from "@/data/mock-events"
import { vibes, type Vibe } from "@/data/vibes"
import { useDragScroll } from "@/hooks/useDragScroll"
import { Button } from "@/components/ui/button"
import { Photo } from "@/components/brand/Photo"
import { Sticker } from "@/components/brand/Sticker"
import { TicketCard } from "@/components/events/TicketCard"

interface VibePickerProps {
  /** Search text from the hero; narrows the results further. */
  query: string
  onClearQuery: () => void
}

const glowColors = { magenta: "#ff3d8b", orange: "#ff8a3d" } as const

// Lines the carousel's first card up with the page content (max-w-6xl + padding)
// while letting the row scroll edge to edge.
const gutter = "max(1rem, calc((100% - 72rem) / 2 + 1.5rem))"

export function VibePicker({ query, onClearQuery }: VibePickerProps) {
  const [vibeId, setVibeId] = useState<Vibe["id"]>("all")
  const vibe = vibes.find((v) => v.id === vibeId) ?? vibes[0]
  const scroller = useDragScroll<HTMLUListElement>()

  const events = useMemo(() => {
    const q = query.trim().toLowerCase()
    return mockEvents
      .filter((e) => e.featured)
      .filter((e) => vibeId === "all" || e.vibes.includes(vibeId))
      .filter((e) => !q || [e.title, e.venue, e.city].some((f) => f.toLowerCase().includes(q)))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [query, vibeId])

  const scrollByPage = (direction: 1 | -1) => {
    const el = scroller.ref.current
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    // Always dark (like the hero): the backdrop photo changes with the vibe
    <section id="events" className="relative isolate scroll-mt-16 overflow-hidden bg-ink py-24 text-white">
      {/* Backdrop: crossfading photo, colour glow, grain */}
      <AnimatePresence initial={false}>
        <m.div
          key={vibe.backdrop}
          aria-hidden
          className="absolute inset-0 -z-30"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.28, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Photo photo={vibe.backdrop} alt="" sizes="100vw" className="size-full blur-[2px]" />
        </m.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-b from-ink via-ink/75 to-ink" />
      <m.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-20 h-96 w-[60rem] max-w-full -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
        animate={{ backgroundColor: glowColors[vibe.glow] }}
        transition={{ duration: 0.8 }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grain" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Sticker variant="magenta" tilt={-3} className="text-xs">
          Pick your vibe
        </Sticker>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          What's the move <span className="text-sunset">tonight?</span>
        </h2>
        <div className="mt-3 h-7">
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={vibe.id}
              className="text-lg text-silver"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {vibe.tagline}
            </m.p>
          </AnimatePresence>
        </div>

        {/* Vibe buttons: the magenta highlight slides between them (layoutId) */}
        <div
          role="group"
          aria-label="Filter events by vibe"
          className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {vibes.map((v) => {
            const active = v.id === vibeId
            return (
              <button
                key={v.id}
                type="button"
                aria-pressed={active}
                onClick={() => setVibeId(v.id)}
                className={cn(
                  "group/vibe relative shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-magenta/50",
                  active
                    ? "border-transparent text-ink"
                    : "border-white/15 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10",
                )}
              >
                {active && (
                  <m.span
                    layoutId="active-vibe"
                    className="absolute inset-0 rounded-xl bg-magenta"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span className="inline-block transition-transform duration-300 group-hover/vibe:scale-125 group-hover/vibe:-rotate-12">
                    {v.emoji}
                  </span>
                  {v.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Result count, active search, carousel arrows */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-silver">
            <span aria-live="polite">
              <span className="font-heading text-lg font-bold text-white">{events.length}</span>{" "}
              {events.length === 1 ? "event" : "events"}
            </span>
            {query && (
              <button
                type="button"
                onClick={onClearQuery}
                className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-white/85 hover:bg-white/10"
              >
                Search: “{query}” <X className="size-3.5" aria-label="Clear search" />
              </button>
            )}
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPage(-1)}
              aria-label="Scroll events left"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPage(1)}
              aria-label="Scroll events right"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Ticket carousel: native scroll-snap (swipe on phones, drag or arrows on desktop) */}
      {events.length > 0 ? (
        <ul
          {...scroller}
          className="mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pt-6 pb-12 [scrollbar-width:none] select-none active:cursor-grabbing md:cursor-grab"
          style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {events.map((event, i) => (
              <m.li
                key={event.id}
                layout
                className="shrink-0 snap-start"
                initial={{ opacity: 0, y: 30, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24, delay: Math.min(i, 5) * 0.04 }}
              >
                <TicketCard event={event} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/20 py-16 text-center">
            <span className="text-4xl">🤷🏾</span>
            <p className="font-heading text-xl font-semibold">Hakuna kitu hapa… yet</p>
            <p className="text-sm text-silver">Nothing matches that. Try another vibe or search.</p>
            <Button
              size="sm"
              className="mt-2 bg-magenta text-ink hover:bg-magenta/85"
              onClick={() => {
                setVibeId("all")
                onClearQuery()
              }}
            >
              Show everything
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
