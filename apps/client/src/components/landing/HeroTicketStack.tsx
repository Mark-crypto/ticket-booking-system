import { m, useReducedMotion, useTransform, type MotionValue } from "framer-motion"
import { CalendarDays, MapPin, ShieldCheck } from "lucide-react"

import type { TicketEvent } from "@/types/event"
import { formatEventDate, formatPrice } from "@/utils/format"
import { Photo } from "@/components/brand/Photo"
import { Sticker } from "@/components/brand/Sticker"
import { Barcode, TicketShape } from "@/components/brand/TicketShape"

interface HeroTicketStackProps {
  events: TicketEvent[] // exactly 3: [back-left, front, back-right]
  /** Mouse position across the hero, -0.5 … 0.5 (springs, from Hero). */
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

// Where each ticket sits in the fan, and how strongly it reacts to the mouse
// ("depth": bigger = moves more = feels closer).
const fan = [
  { rotate: -12, x: -120, y: 30, depth: 0.6, z: 0 },
  { rotate: 2, x: 0, y: 0, depth: 1, z: 20 },
  { rotate: 13, x: 120, y: 40, depth: 0.4, z: 10 },
]

export function HeroTicketStack({ events, mouseX, mouseY }: HeroTicketStackProps) {
  return (
    <div className="relative mx-auto h-90 w-full max-w-md origin-top scale-[0.78] perspective-distant min-[400px]:h-100 min-[400px]:scale-90 sm:h-115 sm:scale-100">
      {events.slice(0, 3).map((event, i) => (
        <FanTicket key={event.id} event={event} slot={fan[i]} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Floating stickers */}
      <m.div
        className="absolute top-4 right-2 z-30 sm:right-0"
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 14 }}
      >
        <Sticker variant="orange" tilt={8} className="text-xs">
          🔥 Selling fast
        </Sticker>
      </m.div>
    </div>
  )
}

interface FanTicketProps {
  event: TicketEvent
  slot: (typeof fan)[number]
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

function FanTicket({ event, slot, index, mouseX, mouseY }: FanTicketProps) {
  const reduceMotion = useReducedMotion()
  const isFront = index === 1

  // Parallax: each ticket shifts and tilts with the mouse by its own depth
  const x = useTransform(mouseX, (v) => slot.x + v * 50 * slot.depth)
  const y = useTransform(mouseY, (v) => slot.y + v * 40 * slot.depth)
  const rotateY = useTransform(mouseX, (v) => v * 18 * slot.depth)
  const rotateX = useTransform(mouseY, (v) => -v * 14 * slot.depth)

  return (
    // Outer layer: mouse parallax (x/y/tilt follow the cursor)
    <m.div
      className="absolute top-1/2 left-1/2 -mt-50 -ml-29.5 w-59 sm:-mt-53.75 sm:-ml-32.5 sm:w-65"
      style={{ x, y, rotateX, rotateY, zIndex: slot.z }}
      whileHover={{ zIndex: 40 }}
    >
    {/* Inner layer: entrance animation (fly up and fan out), kept separate so
        it never fights the parallax for the same x/y values */}
    <m.div
      className="drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
      initial={reduceMotion ? false : { opacity: 0, y: 220, rotate: 0, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotate: slot.rotate, scale: 1 }}
      transition={{ delay: 0.25 + index * 0.12, type: "spring", stiffness: 90, damping: 16 }}
      whileHover={{ scale: 1.04 }}
    >
      <TicketShape
        className="bg-white text-ink"
        stubHeight={68}
        stub={
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-ink/50">ADMIT ONE</p>
              <p className="font-heading text-lg font-bold">{formatPrice(event.priceFrom)}</p>
            </div>
            <Barcode />
          </div>
        }
      >
        <div className="relative h-36 sm:h-40">
          <Photo photo={event.image} sizes="260px" priority className="size-full" alt="" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <Sticker variant="ink" tilt={-3} className="absolute top-3 left-3">
            {event.category}
          </Sticker>
        </div>
        <div className="space-y-1.5 p-4">
          <h3 className="line-clamp-2 text-base leading-tight font-bold">{event.title}</h3>
          <p className="flex items-center gap-1.5 text-xs text-ink/60">
            <CalendarDays className="size-3.5" /> {formatEventDate(event.date)}
            <MapPin className="ml-1 size-3.5" /> {event.city}
          </p>
        </div>
      </TicketShape>

      {/* "Verified" stamp on the front ticket: lime = trust */}
      {isFront && (
        <m.div
          className="absolute -right-4 bottom-20 z-10"
          initial={reduceMotion ? false : { scale: 2.2, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: -12 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 15 }}
        >
          <Sticker variant="lime" tilt={0} className="px-3 py-1.5 text-xs">
            <ShieldCheck className="size-3.5" /> Verified
          </Sticker>
        </m.div>
      )}
    </m.div>
    </m.div>
  )
}
