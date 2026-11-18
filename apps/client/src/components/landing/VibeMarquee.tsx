import { siteConfig } from "@/config/site"
import { Marquee } from "@/components/brand/Marquee"

// Two tilted bands scrolling in opposite directions, overlapping the bottom
// of the hero like tape across a poster.
export function VibeMarquee() {
  return (
    <section
      aria-label="Cities and vibes on KataTicket"
      className="relative z-10 -mt-14 overflow-hidden bg-ink py-10"
    >
      <div className="-mx-[5%] w-[110%] -rotate-2 bg-magenta py-3 text-ink shadow-2xl shadow-magenta/20">
        <Marquee
          items={[...siteConfig.cities]}
          duration={40}
          itemClassName="font-heading text-2xl font-bold uppercase tracking-tight sm:text-4xl"
        />
      </div>
      <div className="-mx-[5%] -mt-3 w-[110%] rotate-1 border-y border-white/10 bg-ink-soft py-3 text-white">
        <Marquee
          items={[...siteConfig.vibes]}
          reverse
          duration={45}
          separator={<span className="text-lime">✦</span>}
          itemClassName="font-heading text-2xl font-bold uppercase tracking-tight sm:text-4xl"
        />
      </div>
    </section>
  )
}
