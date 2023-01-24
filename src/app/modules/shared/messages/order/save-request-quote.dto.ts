import {Order} from "./order";

export interface SaveRequestQuoteDto {
  header: string
  signature: string
  priceReplacements: {
    priceReplacement: number
    newspaperId: number
  }[]
}
