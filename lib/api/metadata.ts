import { useQuery } from "@tanstack/react-query"
import { httpClient } from "../http"
import { GenreSchema, ContentLabelSchema, type Genre, type ContentLabel } from "../schemas"
import { CACHE_KEYS, REVALIDATION_TIMES } from "../constants"

export async function fetchGenres(): Promise<Genre[]> {
  const data = await httpClient<any[]>("/metadata/genres/")
  return data.map((item) => GenreSchema.parse(item))
}

export async function fetchLabels(): Promise<ContentLabel[]> {
  const data = await httpClient<any[]>("/metadata/labels/")
  return data.map((item) => ContentLabelSchema.parse(item))
}

export function useGenres() {
  return useQuery({
    queryKey: [CACHE_KEYS.GENRES],
    queryFn: fetchGenres,
    staleTime: REVALIDATION_TIMES.METADATA * 1000,
    gcTime: REVALIDATION_TIMES.METADATA * 2 * 1000,
  })
}

export function useLabels() {
  return useQuery({
    queryKey: [CACHE_KEYS.LABELS],
    queryFn: fetchLabels,
    staleTime: REVALIDATION_TIMES.METADATA * 1000,
    gcTime: REVALIDATION_TIMES.METADATA * 2 * 1000,
  })
}
