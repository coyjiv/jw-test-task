import { serverHttpClient } from "../lib/server-http"
import { ShowcaseSchema, type Showcase } from "../../entities/content/schemas"
import { resolveReferencesServer } from "../../entities/content/server-reference-resolver"
import { API_CONFIG, type ShowcaseType } from "../config/api"

export async function fetchMainpageShowcaseServer(showcaseType: ShowcaseType = "web"): Promise<Showcase> {
  const endpoint = API_CONFIG.ENDPOINTS.SHOWCASES.MAINPAGE(showcaseType)
  const data = await serverHttpClient<any>(endpoint)

  const validatedData = ShowcaseSchema.parse(data)

  const resolvedData = await resolveReferencesServer(validatedData)

  return resolvedData
}
