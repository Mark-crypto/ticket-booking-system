import { useEffect, useRef } from "react"
import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion"

interface CountUpProps {
  to: number
  /** Digits after the decimal point. */
  decimals?: number
  duration?: number
  className?: string
}

// Counts from 0 up to `to` the first time it scrolls into view.
export function CountUp({ to, decimals = 0, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => v.toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      value.set(to)
      return
    }
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, reduceMotion, to, duration, value])

  return (
    <m.span ref={ref} className={className}>
      {text}
    </m.span>
  )
}
