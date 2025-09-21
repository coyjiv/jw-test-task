import Link from "next/link"
import { Button } from "@/src/shared/ui/button"
import { ArrowLeft, Home } from "lucide-react"

interface HeaderProps {
  title?: string
  showBackButton?: boolean
}

export function Header({ title = "Content Showcase", showBackButton = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-1 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Link>
              </Button>
            )}
            <h1 className="text-lg sm:text-xl font-semibold truncate">{title}</h1>
          </div>
          
          <nav className="flex justify-between items-center gap-1 sm:gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="sm:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/rendering-modes">
                <span className="hidden sm:inline">Rendering Modes</span>
                <span className="sm:hidden">Modes</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
