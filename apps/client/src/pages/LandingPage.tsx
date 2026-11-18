import { lazy, Suspense, useState, type ReactNode } from "react"

import { Hero } from "@/components/landing/Hero"
import { VibeMarquee } from "@/components/landing/VibeMarquee"
import { VibePicker } from "@/components/landing/VibePicker"

// Sections below the fold are split into their own files. They start
// downloading right away, but the browser can show the hero without
// waiting for (or parsing) them first.
const BigDrop = lazy(() => import("@/components/landing/BigDrop").then((mod) => ({ default: mod.BigDrop })))
const HowItWorks = lazy(() =>
  import("@/components/landing/HowItWorks").then((mod) => ({ default: mod.HowItWorks })),
)
const SquadMode = lazy(() => import("@/components/landing/SquadMode").then((mod) => ({ default: mod.SquadMode })))
const PhotoWall = lazy(() => import("@/components/landing/PhotoWall").then((mod) => ({ default: mod.PhotoWall })))
const OrganizerCTA = lazy(() =>
  import("@/components/landing/OrganizerCTA").then((mod) => ({ default: mod.OrganizerCTA })),
)

// While a section loads, reserve some space and keep its id, so nav links
// like #how-it-works still have somewhere to jump to.
function Lazy({ id, children }: { id?: string; children: ReactNode }) {
  return <Suspense fallback={<section id={id} className="min-h-[60vh]" />}>{children}</Suspense>
}

// The page tells the story of a night out:
// arrive (hero) → choose (vibes) → the hot ticket (drop) → how it works →
// bring friends (squad) → the night itself (photos) → host your own (organizers)
export function LandingPage() {
  // The search text lives here (the shared parent) because the Hero's search
  // box writes it and the VibePicker's results read it.
  const [query, setQuery] = useState("")

  return (
    <>
      <Hero query={query} onQueryChange={setQuery} />
      <VibeMarquee />
      <VibePicker query={query} onClearQuery={() => setQuery("")} />
      <Lazy>
        <BigDrop />
      </Lazy>
      <Lazy id="how-it-works">
        <HowItWorks />
      </Lazy>
      <Lazy>
        <SquadMode />
      </Lazy>
      <Lazy>
        <PhotoWall />
      </Lazy>
      <Lazy id="organizers">
        <OrganizerCTA />
      </Lazy>
    </>
  )
}
