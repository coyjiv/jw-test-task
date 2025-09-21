"use client"

import { ShowcaseGrid } from "@/components/showcase-grid"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"
import { ShowcaseLoadingSkeleton } from "@/components/loading-skeleton"

export default function SPATestPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SPA Test Page</h1>
          <p className="text-muted-foreground">
            This page uses Single Page Application (SPA) mode - all rendering happens on the client
          </p>
        </div>
        
        <ErrorBoundary>
          <Suspense fallback={<ShowcaseLoadingSkeleton />}>
            <ShowcaseGrid showcaseType="web" />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  )
}
