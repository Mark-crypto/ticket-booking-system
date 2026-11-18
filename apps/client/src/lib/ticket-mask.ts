import type { CSSProperties } from "react"

/**
 * CSS mask that cuts two half-circle "notches" into the left and right edges
 * at height `y` (any CSS length: "50%", "100%", "calc(100% - 64px)", "0").
 * Tip: masks also clip box-shadows, so put `drop-shadow-*` on a parent.
 */
export function notchMask(y: string, radius = 11): CSSProperties {
  const cut = (x: string) => `radial-gradient(circle ${radius}px at ${x} ${y}, #0000 98%, #000)`
  const mask = `${cut("0")}, ${cut("100%")}`
  return {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: "intersect",
    WebkitMaskComposite: "source-in",
  }
}
