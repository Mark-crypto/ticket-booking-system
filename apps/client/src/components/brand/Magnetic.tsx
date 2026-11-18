import { useRef, type PointerEvent, type ReactNode } from "react"
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: ReactNode
  /** 0–1: how far the element follows the cursor. */
  strength?: number
  className?: string
}

// Wrap a button to make it drift toward the mouse cursor ("magnetic" CTA).
// Mouse only: touch and reduced-motion users get a normal button.
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const spring = { stiffness: 200, damping: 15, mass: 0.3 }
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  )
}
