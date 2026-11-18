import { useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { Bot, Dices, ShieldCheck, Zap } from "lucide-react"

import { mockEvents } from "@/data/mock-events"
import { formatEventDate } from "@/utils/format"
import { useNow } from "@/hooks/useNow"
import { Button } from "@/components/ui/button"
import { Photo } from "@/components/brand/Photo"
import { Sticker } from "@/components/brand/Sticker"
import { FlipDigit } from "@/components/brand/FlipDigit"
import { Magnetic } from "@/components/brand/Magnetic"
import { ConfettiBurst } from "@/components/brand/ConfettiBurst"

// Mock "drop": the moment phase-2 tickets for a hot event are released.
// Replace with real data from the API later.
const dropEvent = mockEvents.find((e) => e.id === "evt-002") ?? mockEvents[0]
const DROP_AT = new Date("2026-12-01T12:00:00+03:00").getTime()

const fairPoints = [
  { icon: Dices, text: "Everyone who joins before the drop gets an equal chance" },
  { icon: Bot, text: "Bots and refresh-spamming don't help" },
  { icon: Zap, text: "No queue and no crashed checkout" },
]

function splitTime(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  }
}

export function BigDrop() {
  const now = useNow()
  const [joined, setJoined] = useState(false)
  const remaining = DROP_AT - now
  const live = remaining <= 0
  const t = splitTime(remaining)

  const units = [
    { label: "Days", value: t.days },
    { label: "Hrs", value: t.hours },
    { label: "Min", value: t.mins },
    { label: "Sec", value: t.secs },
  ]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Gig-poster card: always dark */}
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white ring-1 ring-white/10">
          <Photo photo={dropEvent.image} sizes="(min-width: 1152px) 1152px, 100vw" alt="" className="absolute inset-0 -z-20 size-full opacity-40" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grain" />

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Sticker variant="orange" tilt={-4} className="text-xs">
                  ⚡ The big drop
                </Sticker>
                <Sticker variant="lime" tilt={3} className="text-xs">
                  <ShieldCheck className="size-3.5" /> Fair drop
                </Sticker>
              </div>

              <h2 className="mt-5 text-4xl leading-[0.95] font-bold tracking-tight sm:text-6xl">
                {dropEvent.title}
              </h2>
              <p className="mt-3 text-lg text-silver">
                Phase 2 tickets · {formatEventDate(dropEvent.date)} · {dropEvent.venue}
              </p>

              {/* Countdown */}
              <div className="mt-8" aria-live="off">
                <p className="mb-3 font-mono text-xs tracking-widest text-silver uppercase">
                  {live ? "The drop is live" : "Tickets drop in"}
                </p>
                <div className="flex gap-3 sm:gap-4" role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.mins} minutes until the drop`}>
                  {units.map((u) => (
                    <div key={u.label} className="flex flex-col items-center gap-2">
                      <span className="flex gap-1 font-heading text-4xl font-bold tabular-nums sm:text-6xl">
                        {String(u.value)
                          .padStart(2, "0")
                          .split("")
                          .map((digit, i) => (
                            <FlipDigit key={i} value={digit} />
                          ))}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-silver uppercase">{u.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join the drop */}
              <div className="relative mt-10 flex flex-wrap items-center gap-4">
                {joined && <ConfettiBurst seed={7} />}
                <AnimatePresence mode="wait" initial={false}>
                  {joined ? (
                    <m.p
                      key="joined"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 font-heading font-bold text-ink"
                    >
                      <ShieldCheck className="size-5" /> You're in the draw. Good luck!
                    </m.p>
                  ) : (
                    <m.div key="join" exit={{ scale: 0.8, opacity: 0 }}>
                      <Magnetic>
                        <Button
                          size="lg"
                          onClick={() => setJoined(true)}
                          className="h-12 bg-magenta px-6 text-base text-ink hover:bg-magenta/85"
                        >
                          Join the drop
                        </Button>
                      </Magnetic>
                    </m.div>
                  )}
                </AnimatePresence>
                {!joined && <p className="text-sm text-silver">Free to join · We'll text you if you win</p>}
              </div>
            </div>

            {/* How a fair drop works */}
            <div className="self-end rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="font-heading text-xl font-bold">Why a lottery, not a queue?</p>
              <p className="mt-2 text-sm text-silver">
                First-come-first-served rewards bots and fast Wi-Fi. A fair drop gives every real fan the same shot.
              </p>
              <ul className="mt-5 space-y-3">
                {fairPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-magenta/20 text-magenta">
                      <Icon className="size-4" />
                    </span>
                    <span className="pt-1.5">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
