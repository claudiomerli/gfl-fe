export interface SaveProjectDto {
  name: string
  customerId?: number
  billingAmount?: number
  billingDescription?: string
  expiration?: string
  hintBody?: string
}
