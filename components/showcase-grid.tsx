"use client"

import { useMainpageShowcase } from "@/hooks/use-mainpage-showcase"
import { ContentCard } from "./content-card"
import { ShowcaseLoadingSkeleton } from "./loading-skeleton"
import { ClientErrorState } from "./client-error-state"
import { EmptyState } from "./empty-state"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ShowcaseGridProps {
  showcaseType?: "web" | "mobile" | "tv"
}

export function ShowcaseGrid({ showcaseType = "web" }: ShowcaseGridProps) {
  const { data: showcase, isLoading, error, refetch, isRefetching } = useMainpageShowcase(showcaseType)

  if (isLoading) {
    return <ShowcaseLoadingSkeleton />
  }

  if (error) {
    return (
      <ClientErrorState
        title="Failed to load showcase"
        message={error instanceof Error ? error.message : "Something went wrong while loading the content."}
        onRetry={() => refetch()}
      />
    )
  }

  if (!showcase || !showcase.slides || showcase.slides.length === 0) {
    return <EmptyState title="No content available" message="There are no items in the showcase at the moment." />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance mb-2">{showcase.name || "Content Showcase"}</h1>
          <p className="text-muted-foreground">Discover amazing content from our collection</p>
        </div>

        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {showcase.slides.map((slide, index) => (
                  <ContentCard key={slide.oid} content={slide} index={index} />
                ))}
              </div>

      {/* Footer info */}
      <div className="mt-12 text-center text-sm text-muted-foreground">Showing {showcase.slides.length} items</div>
    </div>
  )
}
