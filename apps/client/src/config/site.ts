// Central place for branding/copy so you can rename things in one spot.
export const siteConfig = {
  name: "KataTicket",
  tagline: "Redefine access to experiences.",
  hero: {
    // Rendered as: "Your next <rotating word> starts here."
    lead: "Your next",
    rotatingWords: ["concert", "sherehe", "derby", "comedy night", "festival", "date night"],
    tail: "starts here.",
    description:
      "Concerts, matches, comedy and culture across Kenya. Pay with M-Pesa in seconds and walk in with a ticket that can't be faked.",
    cta: "Twende!", // Swahili: "Let's go!"
  },
  description:
    "KataTicket is next-generation ticketing. Discover concerts, festivals, sports and comedy, buy in a few taps and walk in with a ticket that lives on your phone.",
  currency: "KES",
  locale: "en-KE",
  cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Diani", "Naivasha", "Thika"],
  vibes: ["Afrobeats", "Amapiano", "Gengetone", "Comedy", "Derby day", "Jazz", "Rugby 7s", "Theatre", "Culture"],
  navLinks: [
    { label: "Events", href: "#events" },
    { label: "How it works", href: "#how-it-works" },
    { label: "For organizers", href: "#organizers" },
  ],
} as const
