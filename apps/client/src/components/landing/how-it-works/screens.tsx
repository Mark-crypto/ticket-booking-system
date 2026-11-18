import { useEffect, useState } from "react"
import { m, useReducedMotion } from "framer-motion"
import { Check, Lock, ShieldCheck } from "lucide-react"

import { mockEvents } from "@/data/mock-events"
import { formatEventDate, formatPrice } from "@/utils/format"
import { Photo } from "@/components/brand/Photo"
import { FakeQR } from "@/components/brand/FakeQR"

// The four phone screens used in "How it works". Each one is a tiny,
// self-contained animated scene. They're illustrations, not real UI.

const demoEvent = mockEvents.find((e) => e.id === "evt-002") ?? mockEvents[0]
const ticketPrice = 2500

/** 1. Browse: a mini event feed. */
export function BrowseScreen() {
  const list = mockEvents.filter((e) => e.ticketsLeft > 0).slice(0, 4)
  return (
    <div className="flex h-full flex-col bg-ink p-4 pt-10 text-white">
      <p className="text-[11px] text-silver">Tonight in</p>
      <p className="font-heading text-lg font-bold">Nairobi 📍</p>
      <div className="mt-3 space-y-2.5">
        {list.map((event, i) => (
          <m.div
            key={event.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2"
          >
            <Photo photo={event.image} sizes="48px" alt="" className="size-11 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{event.title}</p>
              <p className="text-[10px] text-silver">{formatEventDate(event.date)}</p>
            </div>
            <p className="text-[10px] font-semibold text-magenta">{formatPrice(event.priceFrom)}</p>
          </m.div>
        ))}
      </div>
    </div>
  )
}

/** 2. Pay: a mobile-money payment prompt that completes itself. */
export function PayScreen() {
  const [paid, setPaid] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setPaid(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center bg-ink p-5 text-white">
      {!paid ? (
        <m.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full rounded-2xl bg-white p-4 text-ink shadow-xl"
        >
          <p className="text-[11px] font-semibold tracking-wide text-ink/50 uppercase">M-Pesa payment request</p>
          <p className="mt-2 text-sm">
            Pay <b>{formatPrice(ticketPrice)}</b> to <b>KataTicket</b> for {demoEvent.title}?
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-ink/15 px-3 py-2">
            <Lock className="size-3.5 text-ink/40" />
            <m.span
              className="font-mono tracking-[0.4em]"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              ••••
            </m.span>
          </div>
          <p className="mt-3 text-right text-xs font-bold text-magenta-deep">SEND</p>
        </m.div>
      ) : (
        <m.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
          className="flex flex-col items-center text-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-lime text-ink">
            <Check className="size-8" strokeWidth={3} />
          </span>
          <p className="mt-4 font-heading text-lg font-bold">Payment received</p>
          <p className="text-xs text-silver">Your ticket is ready 🎉</p>
        </m.div>
      )}
    </div>
  )
}

/** 3. Ticket: the QR code changes every 2 seconds, so screenshots are useless. */
export function TicketScreen() {
  const reduceMotion = useReducedMotion()
  const [seed, setSeed] = useState(1)

  useEffect(() => {
    if (reduceMotion) return
    const t = setInterval(() => setSeed((s) => s + 1), 2000)
    return () => clearInterval(t)
  }, [reduceMotion])

  return (
    <div className="flex h-full flex-col bg-linear-to-b from-magenta to-orange p-4 pt-10 text-ink">
      <p className="text-[11px] font-semibold tracking-wide uppercase opacity-70">Your ticket</p>
      <p className="font-heading text-base leading-tight font-bold">{demoEvent.title}</p>
      <p className="text-[11px] opacity-70">
        {formatEventDate(demoEvent.date)} · {demoEvent.venue}
      </p>

      <div className="mt-4 rounded-2xl bg-white p-3 shadow-lg">
        <m.div key={seed} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <FakeQR seed={seed} className="w-full text-ink" />
        </m.div>
        {/* Countdown bar until the code refreshes */}
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/10">
          <m.div
            key={seed}
            className="h-full bg-ink"
            initial={{ width: "100%" }}
            animate={{ width: reduceMotion ? "100%" : "0%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
        <ShieldCheck className="size-3.5" /> Live code: screenshots won't work
      </p>
      <p className="mt-auto font-mono text-[10px] opacity-60">KT-7Q4M-2X9D</p>
    </div>
  )
}

/** 4. Scan: the gate scanner says yes. */
export function ScanScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-lime p-5 text-center text-ink">
      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          aria-hidden
          className="absolute size-24 rounded-full border-4 border-ink/20"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1.8, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <m.span
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="relative flex size-20 items-center justify-center rounded-full bg-ink text-lime"
      >
        <Check className="size-10" strokeWidth={3} />
      </m.span>
      <p className="relative mt-5 font-heading text-2xl font-bold">VERIFIED</p>
      <p className="relative text-xs font-medium">Admit 1 · Gate B · Works offline</p>
      <p className="relative mt-6 font-mono text-[10px] opacity-60">Checked in 19:42:07</p>
    </div>
  )
}
