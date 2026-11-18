// Stock photos (Unsplash License: free for commercial use, attribution
// appreciated). Files live in /public/photos as `<key>-640.webp` and
// `<key>-1280.webp` (long edge), downloaded once and self-hosted.
//
// Chosen to show East African crowds and venues, and to avoid visible
// brand logos (which could imply a sponsorship we don't have).
// Replace with real photos from partner organizers when available.

export interface PhotoInfo {
  alt: string
  photographer: string
  sourceUrl: string
  orientation: "landscape" | "portrait"
}

export const photos = {
  "crowd-phones": {
    alt: "Concert crowd holding up their phones to film the stage",
    photographer: "Jim Nyamao",
    sourceUrl: "https://unsplash.com/photos/a-crowd-of-people-holding-up-their-cell-phones-qbTfmtdeOvQ",
    orientation: "landscape",
  },
  "house-party": {
    alt: "Friends dancing together at a packed Nairobi party",
    photographer: "Dwayne joe",
    sourceUrl: "https://unsplash.com/photos/crowd-of-people-dancing-in-club-t5h06N3RqVE",
    orientation: "portrait",
  },
  drummers: {
    alt: "Drummer in traditional dress performing outdoors",
    photographer: "Wanyoike Mbugua",
    sourceUrl: "https://unsplash.com/photos/man-playing-percussion-instrument-dsFrAJUrUuU",
    orientation: "portrait",
  },
  "outdoor-concert": {
    alt: "Big crowd at an outdoor night concert with colourful stage lights",
    photographer: "Bemnet Mesfin",
    sourceUrl: "https://unsplash.com/photos/people-enjoying-a-lively-outdoor-concert-at-night-femx2oumQ1U",
    orientation: "landscape",
  },
  "band-crowd": {
    alt: "Performers on stage in front of a cheering crowd",
    photographer: "Bemnet Mesfin",
    sourceUrl: "https://unsplash.com/photos/a-band-performs-for-a-large-crowd-at-a-concert-XqrA7pnJqYA",
    orientation: "landscape",
  },
  "night-crowd": {
    alt: "Crowd gathered at an outdoor concert at night",
    photographer: "Bemnet Mesfin",
    sourceUrl: "https://unsplash.com/photos/crowd-gathered-at-an-outdoor-concert-at-night-K0nyX-coqo8",
    orientation: "landscape",
  },
  "stage-lights": {
    alt: "Crowd watching a concert under bright stage lights",
    photographer: "Bemnet Mesfin",
    sourceUrl: "https://unsplash.com/photos/crowd-watching-a-concert-with-bright-stage-lights-igaFEexKFyE",
    orientation: "landscape",
  },
  "cultural-dancers": {
    alt: "Dancers in traditional attire performing at an outdoor festival",
    photographer: "Luanda Bauma Primo",
    sourceUrl: "https://unsplash.com/photos/dancers-in-traditional-attire-perform-outdoors-Mswr-eAflfo",
    orientation: "landscape",
  },
  "warehouse-party": {
    alt: "People dancing at a dimly lit warehouse party",
    photographer: "Dwayne joe",
    sourceUrl: "https://unsplash.com/photos/people-dancing-at-a-dimly-lit-indoor-party-event-WI4bJbU8wI4",
    orientation: "portrait",
  },
  "dj-red": {
    alt: "DJ mixing on decks under red club lights",
    photographer: "Dwayne joe",
    sourceUrl: "https://unsplash.com/photos/dj-playing-music-at-a-console-with-red-lights-WRwVFAtveDE",
    orientation: "portrait",
  },
  "dancing-friends": {
    alt: "Woman dancing with friends at a party",
    photographer: "Dwayne joe",
    sourceUrl: "https://unsplash.com/photos/woman-dancing-at-party-with-friends-xIcDCEziY38",
    orientation: "portrait",
  },
  "comedy-mic": {
    alt: "Microphone on an empty stage with neon lights",
    photographer: "Chad Stembridge",
    sourceUrl: "https://unsplash.com/photos/uNj9-Ex697U",
    orientation: "landscape",
  },
  "speaker-stage": {
    alt: "Speaker on stage under colourful lights",
    photographer: "ANABEAST",
    sourceUrl: "https://unsplash.com/photos/Acim4wGv3Sg",
    orientation: "landscape",
  },
  "theatre-curtain": {
    alt: "Red theatre curtain on a lit stage",
    photographer: "Rob Laughter",
    sourceUrl: "https://unsplash.com/photos/WW1jsInXgwM",
    orientation: "landscape",
  },
  "football-fans": {
    alt: "Kenyan fans cheering in the stands with flags",
    photographer: "Justin Lagat",
    sourceUrl: "https://unsplash.com/photos/kenyan-fans-cheer-at-a-sporting-event-with-flags-7e16OcueiNs",
    orientation: "landscape",
  },
} satisfies Record<string, PhotoInfo>

export type PhotoKey = keyof typeof photos

export const photoSrc = (key: PhotoKey, size: 640 | 1280 | 1920 = 1280) =>
  `/photos/${key}-${size}.webp`
