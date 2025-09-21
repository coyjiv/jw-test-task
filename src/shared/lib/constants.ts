export const SHOWCASE_TYPES = {
  WEB: "web",
  MOBILE: "mobile",
  TV: "tv",
} as const

export const CACHE_KEYS = {
  SHOWCASE: "showcase",
  MAINPAGE: "mainpage",
  GENRES: "genres",
  LABELS: "labels",
} as const

export const REVALIDATION_TIMES = {
  SHOWCASE: 5 * 60,
  METADATA: 30 * 60, 
} as const

export const IMAGE_SIZES = {
  CARD: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
  POSTER: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
} as const
