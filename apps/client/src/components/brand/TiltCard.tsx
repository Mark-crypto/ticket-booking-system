import type { PointerEvent, ReactNode } from "react"
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  /** Maximum tilt in degrees. */
  max?: number
  className?: string
}

// Tilts its children in 3D toward the mouse and adds a soft light "glare"
// that follows the cursor. Mouse only; touch and reduced-motion users get a
// flat card.
export function TiltCard({ children, max = 8, className }: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5) // pointer position inside the card, 0 … 1
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 20 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.18), transparent 55%)`

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <m.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group/tilt relative", className)}
    >
      {children}
      {!reduceMotion && (
        <m.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </m.div>
  )
}
