import Image from "next/image"
import { Badge } from "@/src/shared/ui/badge"
import { Card, CardContent } from "@/src/shared/ui/card"
import type { ContentBanner, Genre, ContentLabel } from "@/src/entities/content/schemas"
import { getBestImageFromAssets } from "@/src/shared/lib/utils"

interface ContentCardProps {
  content: ContentBanner
  index?: number
}

export function ContentCard({ content, index = 0 }: ContentCardProps) {
  const { title } = content
  
  const imageUrl = getBestImageFromAssets(title.assets, "poster")
  
  if (process.env.NODE_ENV === 'development') {
    console.log('ContentCard debug:', {
      title: title.title,
      assetsCount: title.assets.length,
      assets: title.assets.map(a => ({ type: a.asset_type, url: a.resize_url })),
      finalImageUrl: imageUrl
    })
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title.title || "Content poster"}
          fill
          priority={index < 4}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg"
          }}
        />
        {title.age && (
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{title.age}+</div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-1">{title.title || "Untitled"}</h3>

          {title.synopsis && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{title.synopsis}</p>
          )}
        </div>

        {/* Genres */}
        {title.genres && title.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {title.genres.slice(0, 3).map((genre, index) => (
              <Badge
                key={typeof genre === "string" ? genre : (genre as Genre).oid}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {typeof genre === "string" ? genre : (genre as Genre).name}
              </Badge>
            ))}
            {title.genres.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{title.genres.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Labels */}
        {title.labels && title.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {title.labels.slice(0, 2).map((label, index) => {
              const labelObj = typeof label === "string" ? null : (label as ContentLabel)
              const gradientStyle =
                labelObj?.left_color && labelObj?.right_color
                  ? {
                      background: `linear-gradient(90deg, ${labelObj.left_color}, ${labelObj.center_color || labelObj.right_color}, ${labelObj.right_color})`,
                      color: "white",
                    }
                  : {}

              return (
                <Badge
                  key={typeof label === "string" ? label : labelObj?.oid}
                  variant="default"
                  className="text-xs px-2 py-0.5"
                  style={gradientStyle}
                >
                  {typeof label === "string" ? label : labelObj?.name}
                </Badge>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
