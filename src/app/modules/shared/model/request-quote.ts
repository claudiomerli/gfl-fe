import {Newspaper} from "./newspaper";
import {Order} from "./order";

export interface RequestQuote {
  id: number
  header: string
  signature: string
  createdDate: string
  lastModifiedDate: string
  total: number
  order: Order
  requestQuotePriceReplacements: {
    id: number,
    priceReplacement: number,
    newspaper: Newspaper
  }[]
}
