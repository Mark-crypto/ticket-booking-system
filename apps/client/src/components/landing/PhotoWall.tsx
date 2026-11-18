import { m } from "framer-motion"

import type { PhotoKey } from "@/data/photos"
import { Photo } from "@/components/brand/Photo"
import { Sticker } from "@/components/brand/Sticker"
import { CountUp } from "@/components/brand/CountUp"

// Polaroid wall. Captions are mood lines, not claims about real KataTicket
// events: these are stock photos until organizers share their own.
const polaroids: { photo: PhotoKey; caption: string; tilt: number }[] = [
  { photo: "house-party", caption: "Saturday, sorted 🔥", tilt: -4 },
  { photo: "football-fans", caption: "Derby day energy ⚽", tilt: 3 },
  { photo: "drummers", caption: "Feel the rhythm 🥁", tilt: -2 },
  { photo: "band-crowd", caption: "Front row or nothing", tilt: 5 },
  { photo: "dancing-friends", caption: "The squad made it 💃🏾", tilt: -5 },
  { photo: "cultural-dancers", caption: "Utamaduni 🎭", tilt: 2 },
  { photo: "dj-red", caption: "One more song…", tilt: -3 },
  { photo: "night-crowd", caption: "Under the lights ✨", tilt: 4 },
]

// Product facts (features described on this page), not invented traction.
// Swap in real numbers (tickets scanned, events run) once you have them.
const stats = [
  { prefix: "<", value: 1, suffix: "s", label: "to scan a ticket at the gate" },
  { prefix: "", value: 2, suffix: "s", label: "QR refresh, so screenshots die" },
  { prefix: "", value: 0, suffix: "", label: "bars of signal needed at the gate" },
  { prefix: "", value: 15, suffix: " min", label: "seat hold while your squad pays" },
]

export function PhotoWall() {
  return (
    <section className="relative overflow-hidden border-y bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Sticker variant="magenta" tilt={2} className="text-xs">
            Nights worth remembering
          </Sticker>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            This is what a good weekend looks like.
          </h2>
        </div>

        {/* Polaroids: masonry columns, each scatters in and straightens on hover */}
        <div className="mt-12 columns-2 gap-4 sm:gap-6 md:columns-4">
          {polaroids.map((p, i) => (
            <m.figure
              key={p.photo}
              className="relative mb-6 break-inside-avoid bg-white p-2.5 pb-3 text-ink shadow-xl shadow-black/15 ring-1 ring-black/5"
              initial={{ opacity: 0, y: 60, rotate: p.tilt * 3, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.tilt, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 4) * 0.08 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10, transition: { duration: 0.25 } }}
            >
              {/* A strip of "tape" holding the photo up */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-orange/70 mix-blend-multiply"
              />
              <Photo photo={p.photo} sizes="(min-width: 768px) 260px, 50vw" className="w-full" alt={p.caption} />
              <figcaption className="mt-2.5 text-center font-heading text-sm font-semibold">{p.caption}</figcaption>
            </m.figure>
          ))}
        </div>

        {/* Stats */}
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t pt-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading text-5xl font-bold tracking-tight">
                {s.prefix}
                <CountUp to={s.value} />
                <span className="text-sunset">{s.suffix}</span>
              </dd>
              <dd aria-hidden className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
