import {User} from "../auth/user";
import {Newspaper} from "../newspaper/newspaper";

export interface OrderPack {
  id: number;
  name: string;
  description: string;
  price: number;
  orderElements: OrderPackElement[]

}

export interface OrderPackElement {
  id: number;
  contentNumber: number;
  newspaper: Newspaper;
}
