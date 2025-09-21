import { API_CONFIG, getApiUrl } from "../config/api"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function serverHttpClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let url: string
  if (endpoint.startsWith("http")) {
    url = endpoint
  } else {
    url = getApiUrl(endpoint, false)
  }

  if (API_CONFIG.ENVIRONMENT.IS_DEVELOPMENT) {
    console.log("serverHttpClient debug:", {
      originalEndpoint: endpoint,
      finalUrl: url,
      usingDirectAPI: true,
    })
  }

  const config: RequestInit = {
    headers: {
      ...API_CONFIG.REQUEST.DEFAULT_HEADERS,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status, response)
    }

    const data = await response.json()

    if (API_CONFIG.ENVIRONMENT.IS_DEVELOPMENT) {
      console.info(`[Server API] ${config.method || "GET"} ${url}`, data)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    console.error(`[Server API Error] ${config.method || "GET"} ${url}:`, error)
    throw new ApiError("Network error", 0)
  }
}
