import {Topic} from "./topic";

export interface Newspaper {

  id: number
  name: string
  leftContent: number
  costEach: number
  costSell: number
  email: string
  ip: string
  za: number
  tf: number
  cf: number
  dr: number
  traffic: number
  regionalGeolocalization: string
  note: string
  topics: Array<Topic>
  hidden: boolean
  sensitiveTopics: boolean
  warning: boolean
  nofollow: boolean

}
