import { useState, type MouseEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { m, useReducedMotion } from "framer-motion"
import { ArrowRight, BarChart3, ScanLine, ShieldCheck, Wallet } from "lucide-react"

import { notchMask } from "@/lib/ticket-mask"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/brand/Magnetic"
import { ConfettiBurst } from "@/components/brand/ConfettiBurst"
import { Barcode } from "@/components/brand/TicketShape"

const perks = [
  { icon: ShieldCheck, label: "Fake-proof tickets" },
  { icon: ScanLine, label: "Offline gate scanning" },
  { icon: Wallet, label: "Fast M-Pesa payouts" },
  { icon: BarChart3, label: "Live sales dashboard" },
]

const SIGNUP_PATH = "/register?role=organizer"

// A giant gig-poster ticket for organizers. Neon surface = ink text (contrast rule).
export function OrganizerCTA() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [burst, setBurst] = useState(0)

  // Celebrate first, then go. (Plain navigation for reduced-motion users.)
  const handleStart = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.metaKey || e.ctrlKey) return // let new-tab clicks behave normally
    e.preventDefault()
    setBurst((b) => b + 1)
    setTimeout(() => navigate(SIGNUP_PATH), 650)
  }

  return (
    <section id="organizers" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <m.div
          className="drop-shadow-[0_30px_40px_rgba(255,61,139,0.25)]"
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          {/* Main part of the ticket */}
          <div
            className="relative overflow-hidden rounded-t-[2rem] bg-linear-to-br from-magenta to-orange px-6 pt-12 pb-10 text-ink sm:px-12 sm:pt-16"
            style={notchMask("100%", 16)}
          >
            {/* Oversized background type */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-10 font-heading text-[9rem] leading-none font-bold tracking-tighter text-ink/10 select-none sm:text-[14rem]"
            >
              SHEREHE
            </span>

            <p className="font-mono text-xs font-medium tracking-widest uppercase opacity-70">For organizers</p>
            <h2 className="relative mt-3 max-w-3xl text-5xl leading-[0.92] font-bold tracking-tight sm:text-7xl">
              Throwing a sherehe?
            </h2>
            <p className="relative mt-4 max-w-xl text-xl font-medium sm:text-2xl">
              Sell tickets that can't be faked, and run gates that never go down.
            </p>

            <div className="relative mt-8 flex flex-wrap items-center gap-4">
              {burst > 0 && <ConfettiBurst key={burst} seed={burst * 13} />}
              <Magnetic>
                <Button size="lg" asChild className="h-12 bg-ink px-6 text-base text-white hover:bg-ink/85">
                  <Link to={SIGNUP_PATH} onClick={handleStart}>
                    Start selling <ArrowRight />
                  </Link>
                </Button>
              </Magnetic>
              <p className="text-sm font-medium opacity-75">Set up your first event in minutes</p>
            </div>
          </div>

          {/* Stub: perks, separated by the perforation */}
          <div
            className="flex flex-col gap-6 rounded-b-[2rem] border-t-2 border-dashed border-ink/25 bg-orange px-6 py-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:px-12"
            style={notchMask("0", 16)}
          >
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:flex lg:gap-8">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="size-4 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] leading-tight tracking-widest">
                ADMIT
                <br />
                YOUR CROWD
              </span>
              <Barcode className="h-9 w-24" />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
