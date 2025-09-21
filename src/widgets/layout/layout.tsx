import { Header } from "../header/header"

interface LayoutProps {
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
}

export function Layout({ children, title, showBackButton = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} showBackButton={showBackButton} />
      <main>{children}</main>
    </div>
  )
}
