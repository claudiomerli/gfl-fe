export interface FindOrderDto {
  customerId?: number | null
  status?: string | null
  newspaperIds?: Array<number>
  name?: string | null,
  excludeOrderPack?: boolean | null
}
