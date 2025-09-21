import { useQuery } from "@tanstack/react-query"
import { httpClient } from "../http"
import { ShowcaseSchema, type Showcase } from "../schemas"
import { resolveReferences } from "../reference-resolver"
import { API_CONFIG, type ShowcaseType } from "../config/api"

export async function fetchMainpageShowcase(showcaseType: ShowcaseType = "web"): Promise<Showcase> {
  const endpoint = API_CONFIG.ENDPOINTS.SHOWCASES.MAINPAGE(showcaseType)
  const data = await httpClient<any>(endpoint)

  const validatedData = ShowcaseSchema.parse(data)

  const resolvedData = await resolveReferences(validatedData)

  return resolvedData
}

export function useMainpageShowcase(showcaseType: ShowcaseType = "web") {
  return useQuery({
    queryKey: ["showcase", "mainpage", showcaseType],
    queryFn: () => fetchMainpageShowcase(showcaseType),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export async function getMainpageShowcaseData(showcaseType: ShowcaseType = "web"): Promise<Showcase> {
  try {
    return await fetchMainpageShowcase(showcaseType)
  } catch (error) {
    console.error("[SSG] Failed to fetch mainpage showcase:", error)
    throw error
  }
}
