import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const stickerVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-heading text-[11px] font-bold tracking-wider whitespace-nowrap uppercase shadow-lg shadow-black/25",
  {
    variants: {
      variant: {
        magenta: "bg-magenta text-ink",
        orange: "bg-orange text-ink",
        lime: "bg-lime text-ink", // reserve for trust signals: verified / live / tickets left
        white: "bg-white text-ink",
        ink: "bg-ink text-white ring-1 ring-white/15",
      },
    },
    defaultVariants: { variant: "magenta" },
  },
)

interface StickerProps extends ComponentProps<"span">, VariantProps<typeof stickerVariants> {
  /** Tilt in degrees. Stickers look slapped-on when slightly rotated. */
  tilt?: number
}

// Small rotated label, like a sticker slapped on a poster or ticket.
export function Sticker({ variant, tilt = -4, className, style, ...props }: StickerProps) {
  return (
    <span
      className={cn(stickerVariants({ variant }), className)}
      style={{ rotate: `${tilt}deg`, ...style }}
      {...props}
    />
  )
}
