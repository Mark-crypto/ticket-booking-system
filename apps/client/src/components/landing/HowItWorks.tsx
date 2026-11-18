import { useEffect, useRef, useState, type ComponentType } from "react"
import { AnimatePresence, m, useInView } from "framer-motion"

import { cn } from "@/lib/utils"
import { Sticker } from "@/components/brand/Sticker"
import { PhoneMockup } from "@/components/brand/PhoneMockup"
import { BrowseScreen, PayScreen, ScanScreen, TicketScreen } from "./how-it-works/screens"

const steps: { title: string; body: string; Screen: ComponentType }[] = [
  {
    title: "Find your vibe",
    body: "Browse concerts, derbies, comedy and culture near you. Filter by mood, city or date.",
    Screen: BrowseScreen,
  },
  {
    title: "Pay with M-Pesa",
    body: "Approve the M-Pesa prompt on your phone. No card needed and no long forms. Done in seconds.",
    Screen: PayScreen,
  },
  {
    title: "Your ticket comes alive",
    body: "Your ticket's QR code refreshes every few seconds. A screenshot is useless, so fakes and touts lose.",
    Screen: TicketScreen,
  },
  {
    title: "Scan and walk in",
    body: "Gate scanners verify tickets instantly, even when the venue's network is down.",
    Screen: ScanScreen,
  },
]

// Scroll story: on desktop the phone stays pinned while the steps scroll
// past, and its screen switches to whichever step is in the middle of the view.
export function HowItWorks() {
  const [active, setActive] = useState(0)
  const ActiveScreen = steps[active].Screen

  return (
    <section id="how-it-works" className="relative scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Sticker variant="orange" tilt={3} className="text-xs">
            How it works
          </Sticker>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            From “twende” to the front row in four taps.
          </h2>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-0 lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <ol>
            {steps.map((step, i) => (
              <Step key={step.title} index={i} active={active === i} onActive={setActive} {...step} />
            ))}
          </ol>

          {/* Pinned phone (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-svh items-center justify-center">
              <div className="relative">
                <div aria-hidden className="absolute inset-0 -z-10 scale-125 rounded-full bg-magenta/25 blur-3xl" />
                <PhoneMockup>
                  <AnimatePresence mode="wait">
                    <m.div
                      key={active}
                      className="h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActiveScreen />
                    </m.div>
                  </AnimatePresence>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepProps {
  index: number
  title: string
  body: string
  Screen: ComponentType
  active: boolean
  onActive: (index: number) => void
}

function Step({ index, title, body, Screen, active, onActive }: StepProps) {
  const ref = useRef<HTMLLIElement>(null)
  // Desktop: the step is "active" while it crosses the middle band of the screen
  const inMiddle = useInView(ref, { margin: "-45% 0px -45% 0px" })
  // Mobile: only start the inline phone's animation once it's actually visible
  const visible = useInView(ref, { amount: 0.35 })

  useEffect(() => {
    if (inMiddle) onActive(index)
  }, [inMiddle, onActive, index])

  return (
    <li ref={ref} className="py-8 lg:flex lg:min-h-[75svh] lg:items-center lg:py-0">
      <div className={cn("transition-opacity duration-500", active ? "lg:opacity-100" : "lg:opacity-35")}>
        <span className="font-mono text-sm font-medium text-magenta-deep dark:text-magenta">
          0{index + 1} / 0{steps.length}
        </span>
        <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-md text-lg text-muted-foreground">{body}</p>

        {/* Inline phone on mobile/tablet */}
        <div className="mt-8 flex justify-center lg:hidden">
          <PhoneMockup className="w-56">{visible ? <Screen /> : <div className="h-full bg-ink" />}</PhoneMockup>
        </div>
      </div>
    </li>
  )
}
