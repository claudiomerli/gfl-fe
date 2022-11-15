import {Topic} from "./topic";

export interface Newspaper {

  id: number
  name: string
  purchasedContent: number
  leftContent: number
  costEach: number
  costSell: number
  email: string
  ip: string
  za: number
  regionalGeolocalization: string
  note: string
  topics: Array<Topic>
  hidden: boolean

}
