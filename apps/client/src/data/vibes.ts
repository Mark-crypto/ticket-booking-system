import type { PhotoKey } from "@/data/photos"
import type { VibeId } from "@/types/event"

export interface Vibe {
  id: VibeId | "all"
  label: string
  emoji: string
  /** Shown under the heading when this vibe is picked. */
  tagline: string
  /** Background photo for the section while this vibe is active. */
  backdrop: PhotoKey
  /** Colour of the glow behind the cards (palette rule: magenta or orange only). */
  glow: "magenta" | "orange"
}

export const vibes: Vibe[] = [
  {
    id: "all",
    label: "Everything",
    emoji: "✨",
    tagline: "Kila kitu: everything happening across Kenya.",
    backdrop: "night-crowd",
    glow: "magenta",
  },
  {
    id: "turn-up",
    label: "Turn up",
    emoji: "🔥",
    tagline: "Sherehe mode: on. Loud music, late nights.",
    backdrop: "house-party",
    glow: "magenta",
  },
  {
    id: "chill",
    label: "Chill",
    emoji: "😌",
    tagline: "Slow jams, sundowners and good company.",
    backdrop: "stage-lights",
    glow: "orange",
  },
  {
    id: "laugh",
    label: "Laugh",
    emoji: "😂",
    tagline: "Laugh until your ribs hurt.",
    backdrop: "comedy-mic",
    glow: "orange",
  },
  {
    id: "game-day",
    label: "Game day",
    emoji: "⚽",
    tagline: "Wear your colours. Bring your voice.",
    backdrop: "football-fans",
    glow: "magenta",
  },
  {
    id: "culture",
    label: "Culture",
    emoji: "🎭",
    tagline: "Utamaduni na sanaa: culture and the arts.",
    backdrop: "cultural-dancers",
    glow: "orange",
  },
  {
    id: "big-ideas",
    label: "Big ideas",
    emoji: "💡",
    tagline: "Learn, network, build what's next.",
    backdrop: "speaker-stage",
    glow: "magenta",
  },
]
