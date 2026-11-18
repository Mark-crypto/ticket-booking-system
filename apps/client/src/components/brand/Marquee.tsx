import { Fragment, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  items: string[]
  /** Scroll right-to-left (default) or left-to-right. */
  reverse?: boolean
  /** Seconds for one full loop. Bigger = slower. */
  duration?: number
  separator?: ReactNode
  className?: string
  itemClassName?: string
}

// Infinite scrolling text band. The list is rendered twice side by side and
// the track slides by exactly -50%, so the loop is seamless. Pauses on hover.
// The CSS animation is switched off for users who prefer reduced motion
// (see the media query at the bottom of index.css).
export function Marquee({
  items,
  reverse,
  duration = 30,
  separator = "✦",
  className,
  itemClassName,
}: MarqueeProps) {
  const renderSet = (hidden: boolean) =>
    items.map((item) => (
      <Fragment key={`${hidden}-${item}`}>
        <span className={cn("px-5", itemClassName)} aria-hidden={hidden || undefined}>
          {item}
        </span>
        <span aria-hidden className="opacity-60">
          {separator}
        </span>
      </Fragment>
    ))

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center whitespace-nowrap group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  )
}
