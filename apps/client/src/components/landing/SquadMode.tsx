import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion"
import { Check, Clock3, Link2, RotateCcw, Smartphone, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatPrice } from "@/utils/format"
import { Button } from "@/components/ui/button"
import { Sticker } from "@/components/brand/Sticker"
import { ConfettiBurst } from "@/components/brand/ConfettiBurst"

const squad = [
  { name: "Wanjiku", initials: "WK", color: "bg-magenta text-ink" },
  { name: "Otieno", initials: "OT", color: "bg-orange text-ink" },
  { name: "Brian", initials: "BR", color: "bg-white text-ink" },
  { name: "Achieng", initials: "AC", color: "bg-ink-soft text-white ring-1 ring-white/20" },
]
const share = 4000
const STEP_MS = 1100

const perks = [
  { icon: Link2, text: "One person reserves and shares a link with the squad" },
  { icon: Smartphone, text: "Everyone pays their own share with M-Pesa" },
  { icon: Clock3, text: "Seats are held for 15 minutes while the squad pays" },
  { icon: Users, text: "No more chasing friends for money after the event" },
]

// Split-payment teaser: friends "pay" one by one when the card scrolls into
// view; when the last one pays, confetti.
export function SquadMode() {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { amount: 0.5, once: true })
  const reduceMotion = useReducedMotion()
  const [paidCount, setPaidCount] = useState(0)
  const [run, setRun] = useState(0) // bump to replay the demo

  // Reduced motion: show the finished state straight away
  const shown = reduceMotion ? squad.length : paidCount
  const complete = shown === squad.length

  useEffect(() => {
    if (!inView || reduceMotion) return
    const timers = squad.map((_, i) => setTimeout(() => setPaidCount(i + 1), 600 + i * STEP_MS))
    return () => timers.forEach(clearTimeout)
  }, [inView, reduceMotion, run])

  const replay = () => {
    setPaidCount(0)
    setRun((r) => r + 1)
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <div className="flex items-center gap-2">
            <Sticker variant="magenta" tilt={-3} className="text-xs">
              Squad mode
            </Sticker>
            <Sticker variant="white" tilt={4} className="text-xs ring-1 ring-ink/10">
              Coming soon
            </Sticker>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Squad imeingia? <span className="text-sunset">Kila mtu alipe.</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground italic">“Is the squad in? Everyone pays their share.”</p>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Book for the whole group without fronting the money. Each friend gets their own M-Pesa prompt, and the
            tickets are issued the moment the last person pays.
          </p>
          <ul className="mt-6 space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-magenta/15 text-magenta-deep dark:text-magenta">
                  <Icon className="size-4" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Live demo card (always dark) */}
        <div className="relative">
          <div aria-hidden className="absolute inset-8 -z-10 rounded-full bg-orange/25 blur-3xl" />
          <m.div
            ref={cardRef}
            initial={{ rotate: 0 }}
            whileInView={{ rotate: -2 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-md rounded-3xl bg-ink p-6 text-white shadow-2xl ring-1 ring-white/10"
          >
            {complete && <ConfettiBurst key={run} seed={run + 1} />}

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-silver uppercase">Squad booking</p>
                <p className="mt-1 font-heading text-xl font-bold">Coastal Sounds Festival × 4</p>
              </div>
              <p className="font-mono text-xs text-silver">#SQD-41</p>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-silver">
                <span>
                  {formatPrice(shown * share)} of {formatPrice(squad.length * share)}
                </span>
                <span>
                  {shown}/{squad.length} paid
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <m.div
                  className="h-full rounded-full bg-linear-to-r from-magenta to-orange"
                  animate={{ width: `${(shown / squad.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            {/* Members */}
            <ul className="mt-5 space-y-2">
              {squad.map((member, i) => {
                const paid = i < shown
                return (
                  <li key={member.name} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full font-heading text-xs font-bold",
                        member.color,
                      )}
                    >
                      {member.initials}
                    </span>
                    <span className="flex-1 font-medium">{member.name}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      {paid ? (
                        <m.span
                          key="paid"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="inline-flex items-center gap-1 rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-ink"
                        >
                          <Check className="size-3.5" strokeWidth={3} /> {formatPrice(share)}
                        </m.span>
                      ) : (
                        <m.span key="waiting" exit={{ opacity: 0 }} className="flex gap-1" aria-label="Waiting">
                          {[0, 1, 2].map((d) => (
                            <m.span
                              key={d}
                              className="size-1.5 rounded-full bg-silver"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                            />
                          ))}
                        </m.span>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            {/* Result */}
            <div className="mt-5 flex h-11 items-center justify-between">
              <AnimatePresence mode="wait">
                {complete ? (
                  <m.p
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading font-bold text-lime"
                  >
                    Squad complete. 4 tickets issued 🎉
                  </m.p>
                ) : (
                  <m.p key="wait" exit={{ opacity: 0 }} className="text-sm text-silver">
                    Waiting for the squad…
                  </m.p>
                )}
              </AnimatePresence>
              {complete && !reduceMotion && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={replay}
                  className="text-silver hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw /> Replay
                </Button>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
