import {Topic} from "./topic";

export class Newspaper {

  id: number | undefined
  name: string | undefined
  purchasedContent: number | undefined
  leftContent: number | undefined
  costEach: number | undefined
  costSell: number | undefined
  email: string | undefined
  regionalGeolocalization: string | undefined
  note: string | undefined
  topics: Array<Topic> | undefined
  numberOfEditors: number = 10

}
