export interface WordpressPublishDto {
  publishDate: string,
  categories: number[],
  featuredMediaBase64?: string | null,
  removeFeaturedMedia? : boolean
}
