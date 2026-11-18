import { Clock, MapPin } from "lucide-react"

import type { TicketEvent } from "@/types/event"
import { cn } from "@/lib/utils"
import { formatEventDate, formatEventTime, formatPrice } from "@/utils/format"
import { Button } from "@/components/ui/button"
import { Photo } from "@/components/brand/Photo"
import { Sticker } from "@/components/brand/Sticker"
import { TiltCard } from "@/components/brand/TiltCard"
import { notchMask } from "@/lib/ticket-mask"

const LOW_STOCK_THRESHOLD = 20

interface TicketCardProps {
  event: TicketEvent
  className?: string
}

// An event shown as a physical paper ticket. It's built from two pieces,
// the body and the stub, each with half-notches on the tear line, so on
// hover the stub can peel away like it's being torn off.
export function TicketCard({ event, className }: TicketCardProps) {
  const soldOut = event.ticketsLeft === 0
  const lowStock = !soldOut && event.ticketsLeft <= LOW_STOCK_THRESHOLD

  return (
    <TiltCard className={cn("w-68 sm:w-72", className)}>
      <article
        aria-label={`${event.title}, ${formatEventDate(event.date)}, ${event.city}`}
        className="group relative drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
      >
        {/* Body: notches cut at the bottom corners */}
        <div className="overflow-hidden rounded-t-2xl bg-white text-ink" style={notchMask("100%")}>
          <div className="relative h-48 overflow-hidden">
            <Photo
              photo={event.image}
              sizes="290px"
              alt=""
              className={cn(
                "size-full transition-transform duration-700 ease-out group-hover:scale-110",
                soldOut && "grayscale",
              )}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20" />

            <Sticker variant="ink" tilt={-4} className="absolute top-3 left-3">
              {event.category}
            </Sticker>
            <Sticker variant="white" tilt={5} className="absolute top-3 right-3 font-mono tracking-normal">
              {formatEventDate(event.date)}
            </Sticker>
            {lowStock && (
              <Sticker variant="lime" tilt={-3} className="absolute bottom-3 left-3">
                🎟️ Only {event.ticketsLeft} left
              </Sticker>
            )}
            {soldOut && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Sticker variant="white" tilt={-12} className="px-4 py-2 text-lg">
                  Sold out
                </Sticker>
              </span>
            )}
          </div>

          <div className="space-y-2 px-4 pt-4 pb-5">
            <h3 className="line-clamp-2 min-h-[2.75rem] text-lg leading-tight font-bold">{event.title}</h3>
            <p className="flex items-center gap-1.5 text-sm text-ink/60">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">
                {event.venue}, {event.city}
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-sm text-ink/60">
              <Clock className="size-3.5 shrink-0" />
              {formatEventTime(event.date)}
            </p>
          </div>
        </div>

        {/* Stub: notches at the top corners; peels away on hover */}
        <div
          className="flex origin-top-left items-center justify-between rounded-b-2xl border-t-2 border-dashed border-ink/15 bg-white px-4 py-3 text-ink transition-transform duration-300 ease-out group-hover:translate-y-1.5 group-hover:rotate-2 motion-reduce:transition-none"
          style={notchMask("0")}
        >
          <div>
            <p className="font-mono text-[10px] tracking-widest text-ink/50">FROM</p>
            <p className="font-heading text-xl font-bold">{formatPrice(event.priceFrom)}</p>
          </div>
          {soldOut ? (
            <Button size="sm" variant="outline" className="border-ink/20 bg-white text-ink hover:bg-ink/5">
              Join waitlist
            </Button>
          ) : (
            <Button size="sm" className="bg-magenta text-ink hover:bg-magenta/85">
              Get tickets
            </Button>
          )}
        </div>
      </article>
    </TiltCard>
  )
}
