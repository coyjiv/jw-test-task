import { ServerContentCard } from "./server-content-card"
import { ShowcaseLoadingSkeleton } from "./loading-skeleton"
import { ServerErrorState } from "./server-error-state"
import { EmptyState } from "./empty-state"
import { fetchMainpageShowcaseServer } from "@/lib/api/server-showcase"

interface ServerShowcaseGridProps {
  showcaseType?: "web" | "mobile" | "tv"
}

export async function ServerShowcaseGrid({ showcaseType = "web" }: ServerShowcaseGridProps) {
  try {
    const showcase = await fetchMainpageShowcaseServer(showcaseType)

    if (!showcase || !showcase.slides || showcase.slides.length === 0) {
      return <EmptyState title="No content available" message="There are no items in the showcase at the moment." />
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">{showcase.name || "Content Showcase"}</h1>
          <p className="text-muted-foreground">Discover amazing content from our collection</p>
        </div>

        {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {showcase.slides.map((slide, index) => (
                  <ServerContentCard key={slide.oid} content={slide} index={index} />
                ))}
              </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">Showing {showcase.slides.length} items</div>
      </div>
    )
  } catch (error) {
    console.error("[ServerShowcaseGrid] Error:", error)
    return (
      <ServerErrorState
        title="Failed to load showcase"
        message={error instanceof Error ? error.message : "Something went wrong while loading the content."}
      />
    )
  }
}
