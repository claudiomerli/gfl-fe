import {User} from "../auth/user";
import {Newspaper} from "../newspaper/newspaper";

export interface SaveNewspaperDiscount {
  customerId: number
  newspaperId: number
  discountPercentage: number
  allNewspaper: boolean

}
