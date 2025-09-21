import { ServerShowcaseGrid } from "@/src/features/showcase/server-showcase-grid"
import { Suspense } from "react"
import { ShowcaseLoadingSkeleton } from "@/src/shared/ui/loading-skeleton"

export const revalidate = 3600 // 1 hour revalidation

export default function SSGTestPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SSG Test Page</h1>
          <p className="text-muted-foreground">
            This page uses Static Site Generation (SSG) with ISR - data is cached for 1 hour
          </p>
        </div>
        
        <Suspense fallback={<ShowcaseLoadingSkeleton />}>
          <ServerShowcaseGrid showcaseType="web" />
        </Suspense>
      </div>
    </main>
  )
}
