import { serverHttpClient } from "../server-http"
import { ShowcaseSchema, type Showcase } from "../schemas"
import { resolveReferencesServer } from "../server-reference-resolver"
import { API_CONFIG, type ShowcaseType } from "../config/api"

export async function fetchMainpageShowcaseServer(showcaseType: ShowcaseType = "web"): Promise<Showcase> {
  const endpoint = API_CONFIG.ENDPOINTS.SHOWCASES.MAINPAGE(showcaseType)
  const data = await serverHttpClient<any>(endpoint)

  const validatedData = ShowcaseSchema.parse(data)

  const resolvedData = await resolveReferencesServer(validatedData)

  return resolvedData
}
