import { useEffect, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingWordProps {
  words: readonly string[]
  /** Milliseconds each word stays visible. */
  interval?: number
  className?: string
  /** Classes for the animated word itself (put gradient text like `text-sunset` here). */
  wordClassName?: string
}

// Cycles through words with a flip-up animation (kinetic typography).
// Decorative: put the full sentence in an `sr-only` element for screen readers.
// With reduced motion enabled it simply shows the first word.
export function RotatingWord({ words, interval = 2200, className, wordClassName }: RotatingWordProps) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [reduceMotion, words.length, interval])

  return (
    <span className={cn("relative inline-block perspective-[600px]", className)} aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          className={cn("inline-block origin-bottom", wordClassName)}
          initial={{ y: "45%", opacity: 0, rotateX: -70 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: "-45%", opacity: 0, rotateX: 70 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
