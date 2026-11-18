import type { PhotoKey } from "@/data/photos"

export const EVENT_CATEGORIES = [
  "Music",
  "Sports",
  "Comedy",
  "Festival",
  "Tech",
  "Theatre",
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

// Moods fans browse by on the landing page ("Pick your vibe").
// An event can have several, e.g. a beach festival is both "turn-up" and "chill".
export const VIBE_IDS = ["turn-up", "chill", "laugh", "game-day", "culture", "big-ideas"] as const

export type VibeId = (typeof VIBE_IDS)[number]

export interface TicketEvent {
  id: string
  title: string
  category: EventCategory
  vibes: VibeId[]
  date: string // ISO string, e.g. "2026-12-13T18:00:00+03:00"
  venue: string
  city: string
  priceFrom: number // lowest ticket price, in siteConfig.currency
  ticketsLeft: number
  image: PhotoKey // key from src/data/photos.ts
  featured?: boolean
}
