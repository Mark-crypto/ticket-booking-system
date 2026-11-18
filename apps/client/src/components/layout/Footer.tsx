import { useRef, type CSSProperties } from "react"
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion"

import { siteConfig } from "@/config/site"
import { photos } from "@/data/photos"
import { Logo } from "./Navbar"

// One entry per photographer (several took more than one of our photos)
const photographers = [...new Set(Object.values(photos).map((p) => p.photographer))]

const footerColumns = [
  {
    title: "Explore",
    links: ["Concerts", "Sports", "Comedy", "Festivals"],
  },
  {
    title: "Organizers",
    links: ["Sell tickets", "Pricing", "Check-in app", "Resources"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Terms", "Privacy"],
  },
]

// Row of half-circle "bites" along the top edge, like a torn-off ticket
const tornEdge: CSSProperties = {
  maskImage: "radial-gradient(circle 9px at 50% 0, #0000 98%, #000)",
  WebkitMaskImage: "radial-gradient(circle 9px at 50% 0, #0000 98%, #000)",
  maskSize: "26px 100%",
  WebkitMaskSize: "26px 100%",
  maskRepeat: "repeat-x",
  WebkitMaskRepeat: "repeat-x",
}

const wordmarkSize = "text-[clamp(3rem,14.5vw,11rem)]"

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // 0 when the footer starts entering the screen, 1 when you hit the bottom
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const fill = useTransform(scrollYProgress, (p) => `inset(0 ${reduceMotion ? 0 : 100 - p * 100}% 0 0)`)

  return (
    // Always dark, to close the night out
    <footer ref={ref} className="text-white">
      <div aria-hidden className="h-4 bg-ink" style={tornEdge} />

      <div className="bg-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-10 sm:px-6 md:grid-cols-[2fr_repeat(3,1fr)]">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-silver">{siteConfig.tagline}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-sm font-semibold">{column.title}</h3>
              <ul className="space-y-2 text-sm text-silver">
                {column.links.map((link) => (
                  <li key={link}>
                    {/* Placeholder links: point these at real routes later */}
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant wordmark: outlined, filling with the sunset gradient as you scroll */}
        <div aria-hidden className="relative mx-auto max-w-6xl overflow-hidden px-4 select-none sm:px-6">
          <p
            className={`${wordmarkSize} font-heading leading-[0.85] font-bold tracking-tighter whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1.5px_rgb(255_255_255/0.22)]`}
          >
            {siteConfig.name}
          </p>
          <m.p
            style={{ clipPath: fill }}
            className={`${wordmarkSize} text-sunset absolute inset-x-4 top-0 font-heading leading-[0.85] font-bold tracking-tighter whitespace-nowrap uppercase sm:inset-x-6`}
          >
            {siteConfig.name}
          </m.p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-silver sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Made in Nairobi 🇰🇪
          </p>
          {/* Unsplash doesn't require credit, but crediting photographers is good practice */}
          <details className="sm:max-w-md sm:text-right">
            <summary className="cursor-pointer select-none hover:text-white">Photo credits (Unsplash)</summary>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
              {photographers.map((name) => (
                <li key={name}>
                  <a
                    href={Object.values(photos).find((p) => p.photographer === name)?.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-2 hover:text-white hover:underline"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}
