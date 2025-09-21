const CMS_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cms.test.ksfr.tech/api/v1"
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://i.test.ksfr.tech"

const PROXY_BASE_URL = "/api/proxy"
const DEFAULT_IMAGE_WIDTH = 400
const DEFAULT_IMAGE_HEIGHT = 600
const PLACEHOLDER_IMAGE_URL = "/placeholder.svg"

const CMS_HOSTNAME = new URL(CMS_BASE_URL).hostname
const IMAGE_HOSTNAME = new URL(IMAGE_BASE_URL).hostname

export const API_CONFIG = {
  CMS_BASE_URL,
  IMAGE_BASE_URL,
  
  PROXY_BASE_URL,
  
  ENDPOINTS: {
    SHOWCASES: {
      MAINPAGE: (type: "web" | "mobile" | "tv" = "web") => `showcases/showcases/mainpage/${type}/`,
    },
    METADATA: {
      GENRES: "metadata/genres/",
      LABELS: "metadata/labels/",
      COUNTRIES: "metadata/countries/",
      STUDIOS: "metadata/studios/",
      REWARDS: "metadata/rewards/",
      JOBS: "metadata/jobs/",
      KIND: "metadata/kind/",
    },
    ASSETS: {
      ASSETS: "assets/",
      CONTENT_BANNERS: "content/banners/",
    },
  },
  
  IMAGES: {
    DEFAULT_WIDTH: DEFAULT_IMAGE_WIDTH,
    DEFAULT_HEIGHT: DEFAULT_IMAGE_HEIGHT,
    PLACEHOLDER_URL: PLACEHOLDER_IMAGE_URL,
    REMOTE_PATTERNS: [
      {
        protocol: 'https' as const,
        hostname: CMS_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: IMAGE_HOSTNAME,
        pathname: '/media/cms/**',
      },
    ],
  },
  
  REQUEST: {
    DEFAULT_HEADERS: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    TIMEOUT: 10000,
  },
  
  ENVIRONMENT: {
    IS_DEVELOPMENT: process.env.NODE_ENV === "development",
    IS_PRODUCTION: process.env.NODE_ENV === "production",
  },
} as const

export type ApiConfig = typeof API_CONFIG
export type ShowcaseType = "web" | "mobile" | "tv"
export type MetadataEndpoint = keyof typeof API_CONFIG.ENDPOINTS.METADATA

export function getApiUrl(endpoint: string, useProxy = false): string {
  const baseUrl = useProxy ? API_CONFIG.PROXY_BASE_URL : API_CONFIG.CMS_BASE_URL
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
  
  return `${cleanBaseUrl}/${cleanEndpoint}`
}

export function getImageUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${API_CONFIG.IMAGE_BASE_URL}${cleanPath}`
}

export function normalizeImageUrl(url: string | undefined, width = API_CONFIG.IMAGES.DEFAULT_WIDTH, height = API_CONFIG.IMAGES.DEFAULT_HEIGHT): string {
  if (!url) return API_CONFIG.IMAGES.PLACEHOLDER_URL
  
  if (url.includes("{w}") && url.includes("{h}")) {
    return url.replace("{w}", width.toString()).replace("{h}", height.toString())
  }
  
  return url
}
