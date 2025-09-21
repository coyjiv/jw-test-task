import { ServerShowcaseGrid } from "@/src/features/showcase/server-showcase-grid"
import { Suspense } from "react"
import { ShowcaseLoadingSkeleton } from "@/src/shared/ui/loading-skeleton"
import { Layout } from "@/src/widgets/layout/layout"

export default function SSRTestPage() {
  return (
    <Layout title="SSR Test Page" showBackButton>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-muted-foreground">
            This page uses Server-Side Rendering (SSR) - data is fetched on each request
          </p>
        </div>
        
        <Suspense fallback={<ShowcaseLoadingSkeleton />}>
          <ServerShowcaseGrid showcaseType="web" />
        </Suspense>
      </div>
    </Layout>
  )
}
