import {User} from "../auth/user";
import {Newspaper} from "../newspaper/newspaper";

export interface NewspaperDiscount {
  id : number
  customer: User
  newspaper: Newspaper
  discountPercentage: number

}
