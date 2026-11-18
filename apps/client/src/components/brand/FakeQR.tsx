import { useMemo } from "react"

const SIZE = 21 // modules per side (a version-1 QR code is 21×21)

// Small deterministic random generator, so the same seed draws the same code
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Is (x, y) inside one of the three big corner "finder" squares?
const inFinder = (x: number, y: number) =>
  (x < 8 && y < 8) || (x >= SIZE - 8 && y < 8) || (x < 8 && y >= SIZE - 8)

/**
 * A QR-looking pattern for illustrations. NOT a real, scannable code.
 * Changing `seed` redraws it, which is how the "rotating ticket" demo works.
 * Real tickets will use a proper QR library with a signed, time-based payload.
 */
export function FakeQR({ seed, className }: { seed: number; className?: string }) {
  const modules = useMemo(() => {
    const rand = mulberry32(seed)
    const cells: [number, number][] = []
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (!inFinder(x, y) && rand() > 0.5) cells.push([x, y])
      }
    }
    return cells
  }, [seed])

  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </g>
  )

  return (
    <svg
      viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Ticket QR code (illustration)"
    >
      <rect x={-1} y={-1} width={SIZE + 2} height={SIZE + 2} fill="white" />
      {finder(0, 0)}
      {finder(SIZE - 7, 0)}
      {finder(0, SIZE - 7)}
      {modules.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  )
}
