import { AnimatePresence, m } from "framer-motion"
import { cn } from "@/lib/utils"

// One digit of a departures-board style counter: when the value changes,
// the old digit flips away and the new one flips in.
export function FlipDigit({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-[1.15em] w-[0.72em] items-center justify-center overflow-hidden rounded-md bg-ink-soft perspective-[400px] ring-1 ring-white/10",
        className,
      )}
    >
      {/* Split line across the middle, like a real flip clock */}
      <span aria-hidden className="absolute inset-x-0 top-1/2 z-10 h-px bg-black/50" />
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          className="inline-block"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
