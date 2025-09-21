import { AlertCircle, RefreshCw } from "lucide-react"

interface ServerErrorStateProps {
  title?: string
  message?: string
}

export function ServerErrorState({
  title = "Failed to load content",
  message = "Something went wrong while loading the showcase. Please try again.",
}: ServerErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <p className="text-sm text-muted-foreground">
        Please refresh the page to try again.
      </p>
    </div>
  )
}
