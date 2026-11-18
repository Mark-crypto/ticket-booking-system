import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// A simple phone frame for product illustrations. Children fill the screen.
export function PhoneMockup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-64 rounded-[2.75rem] border-[10px] border-ink-soft bg-ink shadow-2xl shadow-black/40 ring-1 ring-white/10",
        className,
      )}
    >
      {/* Camera notch */}
      <div aria-hidden className="absolute top-2 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-soft" />
      <div className="absolute inset-0 overflow-hidden rounded-[2.1rem] bg-white text-ink">{children}</div>
    </div>
  )
}
