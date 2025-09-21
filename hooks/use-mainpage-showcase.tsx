import { useQuery } from "@tanstack/react-query"
import { httpClient } from "../lib/http"
import { ShowcaseSchema, type Showcase } from "../lib/schemas"
import { resolveReferences } from "../lib/reference-resolver"

export type ShowcaseType = "web" | "mobile" | "tv"

export async function fetchMainpageShowcase(showcaseType: ShowcaseType = "web"): Promise<Showcase> {
  const data = await httpClient<any>(`/showcases/showcases/mainpage/${showcaseType}/`)

  const validatedData = ShowcaseSchema.parse(data)

  const resolvedData = await resolveReferences(validatedData)

  return resolvedData
}

export function useMainpageShowcase(showcaseType: ShowcaseType = "web") {
  return useQuery({
    queryKey: ["showcase", "mainpage", showcaseType],
    queryFn: () => fetchMainpageShowcase(showcaseType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
