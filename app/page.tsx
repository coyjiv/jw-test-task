import { ServerShowcaseGrid } from "@/components/server-showcase-grid"
import { Suspense } from "react"
import { ShowcaseLoadingSkeleton } from "@/components/loading-skeleton"
import { Layout } from "@/components/layout"

// ISR 5 minute revalidation
export const revalidate = 300

export default function HomePage() {
  return (
    <Layout title="Главная Витрина">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-muted-foreground">Discover amazing content from our collection</p>
        </div>

        <Suspense fallback={<ShowcaseLoadingSkeleton />}>
          <ServerShowcaseGrid showcaseType="web" />
        </Suspense>
      </div>
    </Layout>
  )
}
