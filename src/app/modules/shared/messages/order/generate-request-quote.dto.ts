import {Order} from "../../model/order";

export interface GenerateRequestQuoteDto {
  requestQuoteId: number
  header: string
  priceReplacements: {
    priceReplacement: number
    newspaperId: number
  }[]
  signature: string
  orderId: number
}
