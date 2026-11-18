import { useMemo } from "react"
import { m, useReducedMotion } from "framer-motion"

const COLORS = ["#ff3d8b", "#ff8a3d", "#d6ff3f", "#ffffff"]

// Pure "random" number in [0, 1) for a given input. Rendering must be pure in
// React (no Math.random during render), so each burst is reproducible instead.
const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// Lightweight confetti: a handful of paper bits flying out from the centre of
// the parent. Re-trigger by changing the `key` prop; pass a different `seed`
// for a different pattern. Nothing renders for reduced-motion users.
export function ConfettiBurst({ count = 28, seed = 1 }: { count?: number; seed?: number }) {
  const reduceMotion = useReducedMotion()

  // Random flight path per piece, decided once per burst
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + rand(seed + i) * 0.5
        const distance = 90 + rand(seed + i + 100) * 110
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          rotate: rand(seed + i + 200) * 540 - 270,
          color: COLORS[i % COLORS.length],
          size: 6 + rand(seed + i + 300) * 6,
          round: i % 3 === 0,
        }
      }),
    [count, seed],
  )

  if (reduceMotion) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {pieces.map((p, i) => (
        <m.span
          key={i}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "1px",
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 140], opacity: [1, 1, 0], rotate: p.rotate, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut", times: [0, 0.45, 1] }}
        />
      ))}
    </div>
  )
}
