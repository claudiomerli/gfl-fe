export interface FindOrderDto {
  customerId?: number | null
  status?: string | null
  newspaperIds?: Array<number>
}
