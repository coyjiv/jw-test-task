"use client"

import { Button } from "./button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ClientErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ClientErrorState({
  title = "Failed to load content",
  message = "Something went wrong while loading the showcase. Please try again.",
  onRetry,
}: ClientErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}
