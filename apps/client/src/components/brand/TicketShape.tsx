import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { notchMask } from "@/lib/ticket-mask"

interface TicketShapeProps extends ComponentProps<"div"> {
  /** Content of the tear-off stub at the bottom (barcode, price…). */
  stub?: ReactNode
  /** Height of the stub in px. The notches sit exactly on the tear line. */
  stubHeight?: number
  /** Radius of the half-circle notches cut into each side, in px. */
  notchRadius?: number
  stubClassName?: string
}

// A one-piece physical-ticket shape: notches on both sides and a dashed
// perforation above the stub. For a stub that can tear away, see TicketCard.
export function TicketShape({
  stub,
  stubHeight = 64,
  notchRadius = 11,
  className,
  stubClassName,
  children,
  style,
  ...props
}: TicketShapeProps) {
  const notchY = stub ? `calc(100% - ${stubHeight}px)` : "50%"

  return (
    <div
      className={cn("relative flex flex-col overflow-hidden rounded-2xl", className)}
      style={{ ...notchMask(notchY, notchRadius), ...style }}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {stub && (
        <div
          className={cn(
            "flex shrink-0 items-center border-t-2 border-dashed border-current/15 px-4",
            stubClassName,
          )}
          style={{ height: stubHeight }}
        >
          {stub}
        </div>
      )}
    </div>
  )
}

/** Decorative fake barcode for ticket stubs. */
export function Barcode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-8 w-20 opacity-80", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px, currentColor 4px 5px, transparent 5px 8px, currentColor 8px 11px, transparent 11px 12px)",
      }}
    />
  )
}
