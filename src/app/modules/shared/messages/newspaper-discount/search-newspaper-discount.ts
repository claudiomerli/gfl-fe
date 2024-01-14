import {User} from "../auth/user";
import {Newspaper} from "../newspaper/newspaper";

export interface SearchNewspaperDiscount {
  customerId?: number | string
  newspaperId?: number | string

}
