import { useRef, type FormEvent, type PointerEvent } from "react"
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight, Search, ShieldCheck, Smartphone, WifiOff } from "lucide-react"

import { siteConfig } from "@/config/site"
import { mockEvents } from "@/data/mock-events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Photo } from "@/components/brand/Photo"
import { Magnetic } from "@/components/brand/Magnetic"
import { RotatingWord } from "@/components/brand/RotatingWord"
import { HeroTicketStack } from "./HeroTicketStack"

interface HeroProps {
  query: string
  onQueryChange: (value: string) => void
}

const trustPoints = [
  { icon: ShieldCheck, label: "Tickets that can't be faked" },
  { icon: Smartphone, label: "Pay with M-Pesa" },
  { icon: WifiOff, label: "Gates work offline" },
]

// Tickets shown in the fan: [back-left, front, back-right]
const heroEventIds = ["evt-002", "evt-001", "evt-004"]
const heroEvents = heroEventIds
  .map((id) => mockEvents.find((e) => e.id === id))
  .filter((e) => e !== undefined)

// Staggered entrance for the text column
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero({ query, onQueryChange }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Mouse position across the hero (-0.5 … 0.5), smoothed with springs
  const spring = { stiffness: 80, damping: 20, mass: 0.5 }
  const mouseX = useSpring(useMotionValue(0), spring)
  const mouseY = useSpring(useMotionValue(0), spring)

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  // Background photo drifts slower than the page while scrolling (parallax)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "20%"])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // The grid already filters as you type; submitting jumps to the results.
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
  }

  const { hero } = siteConfig

  return (
    // Always dark, in light mode too: the hero is a "night out" photo scene
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink text-white"
    >
      {/* Background: photo + ink fade + warm stage glow + film grain */}
      <m.div aria-hidden className="absolute inset-0 -z-30" style={{ y: bgY }}>
        <Photo
          photo="crowd-phones"
          widths={[640, 1280, 1920]}
          priority
          alt=""
          className="size-full scale-110 opacity-45"
        />
      </m.div>
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-b from-ink/70 via-ink/60 to-ink" />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 -z-20 size-[40rem] rounded-full bg-magenta/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -top-20 right-0 -z-20 size-[28rem] rounded-full bg-orange/15 blur-[120px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grain" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-28 pb-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
        {/* Text column */}
        <m.div variants={container} initial={reduceMotion ? false : "hidden"} animate="show">
          <m.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            Live in Nairobi, Mombasa & Kisumu
          </m.p>

          <m.h1
            variants={item}
            className="text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl"
          >
            <span className="sr-only">
              {hero.lead} night out {hero.tail}
            </span>
            <span aria-hidden className="block">
              {hero.lead}
            </span>
            <RotatingWord words={hero.rotatingWords} className="block pb-2" wordClassName="text-sunset" />
            <span aria-hidden className="block">
              {hero.tail}
            </span>
          </m.h1>

          <m.p variants={item} className="mt-6 max-w-xl text-lg text-pretty text-silver">
            {hero.description}
          </m.p>

          <m.form
            variants={item}
            onSubmit={handleSubmit}
            role="search"
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md focus-within:border-magenta/60"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/60" />
              <Input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search events, artists or cities"
                aria-label="Search events"
                className="h-11 border-0 bg-transparent pl-9 text-white shadow-none placeholder:text-white/50 focus-visible:ring-0 dark:bg-transparent"
              />
            </div>
            <Magnetic strength={0.25}>
              <Button type="submit" size="lg" className="h-11 bg-magenta px-5 text-ink hover:bg-magenta/85">
                {hero.cta} <ArrowRight />
              </Button>
            </Magnetic>
          </m.form>

          <m.ul variants={item} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="size-4 text-lime" />
                {label}
              </li>
            ))}
          </m.ul>
        </m.div>

        {/* Ticket fan */}
        <HeroTicketStack events={heroEvents} mouseX={mouseX} mouseY={mouseY} />
      </div>
    </section>
  )
}
