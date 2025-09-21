import { z } from "zod"

const urlSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    if (val.startsWith("/")) {
      return `https://cms.test.ksfr.tech${val}`
    }
    return val
  }
  return val
}, z.string().url())

export const AssetSchema = z.object({
  oid: z.string(),
  asset_type: z.string(),
  resize_url: urlSchema,
})

export const GenreSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const ContentLabelSchema = z.object({
  oid: z.string(),
  name: z.string(),
  left_color: z.string().optional(),
  center_color: z.string().optional(),
  right_color: z.string().optional(),
})

export const CountrySchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const StudioSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const RewardSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const JobSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const KindSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const VersionSchema = z.object({
  oid: z.string(),
  age: z.number().optional(),
  playback_url: urlSchema,
  duration: z.string(),
})

export const ViewSchema = z.object({
  oid: z.string(),
  versions: z.array(VersionSchema),
  url: urlSchema,
})

export const TitleSchema = z.object({
  oid: z.string(),
  title: z.string().nullable(),
  synopsis: z.string().nullable(),
  age: z.number().nullable(),
  genres: z.array(z.string()),
  labels: z.array(z.string()),
  assets: z.array(AssetSchema),
  url: urlSchema,
  air_date: z.string().nullable(),
  end_date: z.string().nullable(),
})

export const ContentBannerSchema = z.object({
  oid: z.string(),
  title: TitleSchema,
  trailer: ViewSchema,
  preview: ViewSchema,
  live_banner: ViewSchema.nullable().optional(),
})

export const CollectionSchema = z.object({
  oid: z.string(),
  name: z.string(),
})

export const ShowcaseSchema = z.object({
  oid: z.string(),
  name: z.string(),
  slides: z.array(ContentBannerSchema),
  collections: z.array(CollectionSchema),
})

export type Asset = z.infer<typeof AssetSchema>
export type Genre = z.infer<typeof GenreSchema>
export type ContentLabel = z.infer<typeof ContentLabelSchema>
export type Country = z.infer<typeof CountrySchema>
export type Studio = z.infer<typeof StudioSchema>
export type Reward = z.infer<typeof RewardSchema>
export type Job = z.infer<typeof JobSchema>
export type Kind = z.infer<typeof KindSchema>
export type Version = z.infer<typeof VersionSchema>
export type View = z.infer<typeof ViewSchema>
export type Title = z.infer<typeof TitleSchema>
export type ContentBanner = z.infer<typeof ContentBannerSchema>
export type Collection = z.infer<typeof CollectionSchema>
export type Showcase = z.infer<typeof ShowcaseSchema>
