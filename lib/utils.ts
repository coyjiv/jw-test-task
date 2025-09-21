import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_CONFIG } from "./config/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "An unknown error occurred"
}

export function getImageUrl(url: string | undefined, fallback = API_CONFIG.IMAGES.PLACEHOLDER_URL): string {
  if (!url) return fallback

  if (url.startsWith("http")) return url

  const baseUrl = API_CONFIG.CMS_BASE_URL.replace("/api/v1", "")
  return `${baseUrl}${url}`
}

/**
 * Normalizes CMS image url by replacing {w}x{h} placeholders with actual dimensions
 * @param url - The image URL from CMS API
 * @param width - Desired width
 * @param height - Desired height
 * @param fallback - Fallback URL if no URL provided
 * @returns Normalized image url
 */
export function normalizeCmsImageUrl(
  url: string | undefined,
  width = API_CONFIG.IMAGES.DEFAULT_WIDTH,
  height = API_CONFIG.IMAGES.DEFAULT_HEIGHT,
  fallback = API_CONFIG.IMAGES.PLACEHOLDER_URL
): string {
  if (!url) return fallback

  const normalizedUrl = url.replace(/\{w\}x\{h\}/g, `${width}x${height}`)
  
  return normalizedUrl
}

/**
 * Gets the best available image from CMS assets array
 * @param assets - Array of assets from CMS API
 * @param preferredType - Preferred asset type
 * @param width - Desired width for image normalization
 * @param height - Desired height for image normalization
 * @returns Normalized image url
 */
export function getBestImageFromAssets(
  assets: Array<{ asset_type: string; resize_url: string }>,
  preferredType = "poster",
  width = API_CONFIG.IMAGES.DEFAULT_WIDTH,
  height = API_CONFIG.IMAGES.DEFAULT_HEIGHT
): string {
  if (!assets || assets.length === 0) {
    return API_CONFIG.IMAGES.PLACEHOLDER_URL
  }

  // Try to find preferred asset type first
  const preferredAsset = assets.find((asset) => asset.asset_type === preferredType)
  const selectedAsset = preferredAsset || assets[0]

  return normalizeCmsImageUrl(selectedAsset?.resize_url, width, height)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}
