import { httpClient } from "./http"
import { 
  GenreSchema, 
  ContentLabelSchema, 
  CountrySchema, 
  StudioSchema, 
  RewardSchema, 
  JobSchema, 
  KindSchema 
} from "./schemas"

const SCHEMA_MAP = {
  genre: GenreSchema,
  label: ContentLabelSchema,
  tag: ContentLabelSchema,
  country: CountrySchema,
  studio: StudioSchema,
  reward: RewardSchema,
  job: JobSchema,
  kind: KindSchema,
} as const

// Reference pattern: "type:id"
export interface Reference {
  type: string
  id: string
}

export function isReference(value: string): boolean {
  return typeof value === "string" && /^[a-zA-Z]+:\d+$/.test(value)
}

export function parseReference(ref: string): Reference | null {
  if (!isReference(ref)) return null

  const [type, id] = ref.split(":")
  return { type, id }
}

import { API_CONFIG } from "./config/api"

const REFERENCE_ENDPOINTS: Record<string, string> = {
  genre: API_CONFIG.ENDPOINTS.METADATA.GENRES,
  label: API_CONFIG.ENDPOINTS.METADATA.LABELS,
  tag: API_CONFIG.ENDPOINTS.METADATA.LABELS,
  country: API_CONFIG.ENDPOINTS.METADATA.COUNTRIES,
  studio: API_CONFIG.ENDPOINTS.METADATA.STUDIOS,
  reward: API_CONFIG.ENDPOINTS.METADATA.REWARDS,
  job: API_CONFIG.ENDPOINTS.METADATA.JOBS,
  kind: API_CONFIG.ENDPOINTS.METADATA.KIND,
  asset: API_CONFIG.ENDPOINTS.ASSETS.ASSETS,
  contentbanner: API_CONFIG.ENDPOINTS.ASSETS.CONTENT_BANNERS,
}

// Cache for resolved references
const referenceCache = new Map<string, any>()

export async function resolveReference(ref: string): Promise<any> {
  if (referenceCache.has(ref)) {
    return referenceCache.get(ref)
  }

  const parsed = parseReference(ref)
  if (!parsed) return ref

  const endpoint = REFERENCE_ENDPOINTS[parsed.type]
  if (!endpoint) {
    console.warn(`[ReferenceResolver] Unknown reference type: ${parsed.type}`)
    return ref
  }

  try {
    
    const data = await httpClient<any[]>(endpoint)
    const item = data.find((item) => item.oid === ref)

    if (item) {
      const schema = SCHEMA_MAP[parsed.type as keyof typeof SCHEMA_MAP]
      const resolved = schema ? schema.parse(item) : item
      
      referenceCache.set(ref, resolved)
      return resolved
    }

    console.warn(`[ReferenceResolver] Reference not found: ${ref}`)
    return ref
  } catch (error) {
    console.error(`[ReferenceResolver] Failed to resolve ${ref}:`, error)
    return ref
  }
}

export async function resolveReferences(input: any): Promise<any> {
  if (typeof input === "string" && isReference(input)) {
    return await resolveReference(input)
  }

  if (Array.isArray(input)) {
    return await Promise.all(input.map((item) => resolveReferences(item)))
  }

  if (input && typeof input === "object") {
    const resolved: any = {}
    for (const [key, value] of Object.entries(input)) {
      resolved[key] = await resolveReferences(value)
    }
    return resolved
  }

  return input
}
