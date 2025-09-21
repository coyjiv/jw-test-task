import { FileX } from "lucide-react"

interface EmptyStateProps {
  title?: string
  message?: string
}

export function EmptyState({
  title = "No content available",
  message = "There are no items to display at the moment.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <FileX className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  )
}
