import Link from "next/link"
import { Button } from "@/src/shared/ui/button"
import { Layout } from "@/src/widgets/layout/layout"

export default function RenderingModesPage() {
  return (
    <Layout title="Rendering Modes Test" showBackButton>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-muted-foreground mb-8">
            Test different rendering modes to verify SSR/SSG/SPA support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SSR */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">SSR Mode</h2>
            <p className="text-sm text-muted-foreground">
              Server-Side Rendering - data fetched on each request
            </p>
            <ul className="text-sm space-y-1">
              <li>Fresh data on every request</li>
              <li>Good for dynamic content</li>
              <li>Higher server load</li>
              <li>✅ Uses ServerShowcaseGrid</li>
            </ul>
            <Link href="/ssr-test">
              <Button className="w-full">Test SSR</Button>
            </Link>
          </div>

          {/* SSG */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">SSG Mode</h2>
            <p className="text-sm text-muted-foreground">
              Static Site Generation with ISR - cached data with revalidation
            </p>
            <ul className="text-sm space-y-1">
              <li>Fast loading (pre-built)</li>
              <li>Data cached for 1 hour</li>
              <li>Good for SEO</li>
              <li>✅ Uses ServerShowcaseGrid</li>
            </ul>
            <Link href="/ssg-test">
              <Button className="w-full">Test SSG</Button>
            </Link>
          </div>

          {/* SPA */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">SPA Mode</h2>
            <p className="text-sm text-muted-foreground">
              Single Page Application - client-side rendering
            </p>
            <ul className="text-sm space-y-1">
              <li>Client-side only</li>
              <li>React Query caching</li>
              <li>Interactive experience</li>
              <li>✅ Uses ShowcaseGrid (client)</li>
            </ul>
            <Link href="/spa-test">
              <Button className="w-full">Test SPA</Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser DevTools → Network tab</li>
            <li>Visit each test page</li>
            <li><strong>SSR:</strong> Data fetched on server, no client API calls</li>
            <li><strong>SSG:</strong> Pre-built page, data cached for 1 hour</li>
            <li><strong>SPA:</strong> Client-side API calls with React Query</li>
            <li>Check page source to verify server-side rendering</li>
            <li>Refresh pages to see different caching behaviors</li>
          </ol>
        </div>
      </div>
    </Layout>
  )
}
